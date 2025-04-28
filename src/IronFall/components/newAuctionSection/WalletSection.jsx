import { DataGrid } from "@mui/x-data-grid"
import { balancePactForId, pactDetails, isApprovalForAll, readId, setApprovalPact } from "../../../utils/BlockchainOperation/IronPactOp";
import { useEffect, useState } from "react";
import { BigNumConv, calculateExpired, calculateSecondToDay, NumConvBig, srcTokenData } from "../../../utils/helper/helper";
import { AuthorizePact } from "../../../utils/components/window/AuthorizePact";
import { ironFallAddress, newDownAuctionPact } from "../../../utils/BlockchainOperation/IronFall";
import { PactCard } from "../../../utils/components/PactCard/PactCard";
import { useAccount } from "wagmi";
import { useEthersSigner } from "../../../utils/helper/ClientToSigner";
import { NewAuctionInformationFall } from "./NewAuctionInformationFall";
import { tableStyle } from "../../../utils/Information/constantPage";


export const WalletSection = () => {
    const [showPactCard, setShowPactCard] = useState(false)
    const [, setPactsList] = useState(null)
    const [rows, setRows] = useState([])
    //const [selectRow, setSelectedRow] = useState(null)
    const [sellId, setSellId] = useState("");
    const [sellValueAmount, setSellValueAmount] = useState("");
    const [sellValueStartPrice, setSellValueStartPrice] = useState("");
    const [sellValueToleranceDiscount, setSellValueToleranceDiscount] = useState("");

    //const [sellValueTolerance, setSellValueTolerance] = useState("");
    const [sellValueExpired, setSellValueExpired] = useState("");
    const [openAuthWindow, setOpenAuthWindow] = useState(false)
    const [authPact, setAuthPact] = useState({})
    const account = useAccount()
    const signer = useEthersSigner()


    const columns = [
        { field: "id", headerName: "Id", width: 50 },
        { field: "amount", headerName: "Amount Pacts", width: 150 },
        {
            field: "sizePact", headerName: "Size Pact",
            renderCell: (params) => (
                <span>{params.row.sizePact.amount} {params.row.sizePact.ticker}</span>
            ),
            width: 170,
            sortable: true,
            valueGetter: (params) => params.amount
        },
        {
            field: "balanceRepay", headerName: "Balance",
            renderCell: (params) => (
                <span>{params.row.balanceRepay.amount} {params.row.balanceRepay.ticker}</span>
            ),
            width: 170,
            sortable: true,
            valueGetter: (params) => params.amount,
        },
        {
            field: "balanceCollateral", headerName: "Collateral Balance", renderCell: (params) => (
                <span>{params.row.balanceCollateral.amount} {params.row.balanceCollateral.ticker}</span>
            ),
            width: 170,
            sortable: true,
            valueGetter: (params) => params.amount
        },
        { field: "expired", headerName: "Maturity Date", width: 150 },
    ];


    const fetchData = async () => {
        try {
            const actualId = await readId()
            let rowsArray = []
            let _PactsList = []
            for (let index = 0; index < actualId; index++) {
                const _pactDetails = await pactDetails(index);
                const amountInWallet = await balancePactForId(account.address, index)
                if (amountInWallet != '0') {
                    _PactsList.push(_pactDetails)
                    const tokenLoan = await srcTokenData(_pactDetails.tokenLoan)
                    const tokenColl = await srcTokenData(_pactDetails.tokenCollateral)
                    const row = {
                        id: _pactDetails.id.toString(),
                        amount: amountInWallet.toString(),
                        sizePact: {
                            amount: (+BigNumConv(_pactDetails.sizeLoan)).toFixed(4),
                            ticker: tokenLoan.ticker
                        },
                        balanceRepay: {
                            amount: (+BigNumConv(_pactDetails.balancLoanRepay)).toFixed(4),
                            ticker: tokenLoan.ticker
                        },
                        balanceCollateral: {
                            amount: (+BigNumConv(_pactDetails.collateral)).toFixed(4),
                            ticker: tokenColl.ticker
                        },
                        expired: calculateExpired(+(_pactDetails.expiredPact.toString()))
                    }
                    rowsArray.push(row)
                }

                if (!account) {
                    return
                }

            }
            setPactsList(_PactsList)
            setRows(rowsArray)
        } catch (e) {
            console.error(e)

        }
    }
    const fetchAuthPact = async () => {
        try {
            if (!account) {
                return
            }
            const _ironRiseAuth = await isApprovalForAll(account.address, ironFallAddress)
            setAuthPact(_ironRiseAuth)
        } catch (error) {
            console.error(error)
        }
    }

    const newUpwardAuctionOp = async () => {
        if (account.address) {
            try {
                if (!authPact) {
                    const tx = await setApprovalPact(ironFallAddress, true, signer)
                    fetchAuthPact()
                    await tx.wait()
                    alert(`Tx submitted -> ${await tx}`);
                }
                const tx = await newDownAuctionPact(sellId, sellValueAmount, NumConvBig((+sellValueStartPrice)), calculateSecondToDay(sellValueExpired), (sellValueToleranceDiscount * 100).toString(), signer)
                await tx.wait()
                alert(`Tx submit ->${await tx}`)
            } catch (error) {
                console.error(error)
            }
        }
    }


    useEffect(() => {
        if (account.address) {
            fetchData()
            fetchAuthPact()
        }
    }, [account])


    const handleRowClick = (params) => {
        setSellId(params.row.id)
        setSellValueAmount(params.row.amount)
    };
    const handleInputChangeSellId = (e) => {
        setSellId(e.target.value);
    };
    const handleInputChangeAmount = (e) => {
        setSellValueAmount(e.target.value);
    };
    const handleInputChangeStartPrice = (e) => {
        setSellValueStartPrice(e.target.value);
    };
    const handleInputChangeExpired = (e) => {
        setSellValueExpired(e.target.value);
    };
    const handleInputChangeDropTolerance = (e) => {
        setSellValueToleranceDiscount(e.target.value);
    };
    const authSpending = async (e) => {
        e.preventDefault();
        await newUpwardAuctionOp()
    };
    const closeAuthWindow = (e) => {
        e.preventDefault();
        fetchAuthPact()
        setOpenAuthWindow(false)
    };

    const RenderWindoAuthPact = () => {
        return (
            <div className="w-2/3 overflow-x-auto">
                <div className="w-full max-w-7xl overflow-x-auto">
                    {/* Componente Autorizzazione */}
                    <AuthorizePact contractAddress={ironFallAddress} setChange={closeAuthWindow} />
                </div>
            </div>
        );

    }
    const RenderTable = () => {
        return (
            <div className="w-3/4 h-max">
                <DataGrid
                    columns={columns}
                    rows={[...rows].reverse()}
                    pageSizeOptions={5}
                    onRowClick={handleRowClick}
                    sx={tableStyle}
                />
            </div>
        )
    }

    return (
        <div className="flex flex-col p-4 sm:p-6 lg:p-8  text-gray-100 rounded-lg shadow-lg space-y-8 min-h-screen">
            {/* Titolo principale */}
            <div className="text-center">
                <h1 className="font-bold text-3xl">Create a New Auction</h1>
                <p className="mt-2 text-gray-300">
                    Launch new auctions and manage your sales seamlessly.
                </p>
            </div>

            <NewAuctionInformationFall />
            {/* Sezione Centrale */}
            <div className="flex flex-col items-center justify-center space-y-6">
                {/* Secondary Market Section */}
                <div className="w-full sm:w-3/4 lg:w-2/3 bg-slate-800 rounded-lg shadow-md p-6 sm:p-8 space-y-6">
                    <h2 className="text-white font-semibold text-2xl text-center">Set New Pact Auction</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Pact ID */}
                        <div>
                            <label className="block text-gray-300 font-bold mb-2">Pact Id:</label>
                            <input
                                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100 placeholder-gray-500"
                                type="number"
                                placeholder="Enter Pact ID"
                                min={0}
                                value={sellId}
                                onChange={handleInputChangeSellId}
                            />
                        </div>
                        {/* Amount */}
                        <div>
                            <label className="block text-gray-300 font-bold mb-2">Amount:</label>
                            <input
                                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100 placeholder-gray-500"
                                type="number"
                                value={sellValueAmount}
                                onChange={handleInputChangeAmount}
                                placeholder="Amount"
                            />
                        </div>
                        {/* Price Start */}
                        <div>
                            <label className="block text-gray-300 font-bold mb-2">Starting Price:</label>
                            <input
                                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100 placeholder-gray-500"
                                type="number"
                                min={0}
                                value={sellValueStartPrice}
                                onChange={handleInputChangeStartPrice}
                                placeholder="0 mdai"
                            />
                        </div>
                        {/* Auction Duration */}
                        <div>
                            <label className="block text-gray-300 font-bold mb-2">Auction Duration (days):</label>
                            <input
                                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100 placeholder-gray-500"
                                type="number"
                                min={0}
                                value={sellValueExpired}
                                onChange={handleInputChangeExpired}
                                placeholder="Enter maturity in days"
                            />
                        </div>
                        {/* Drop Tolerance Range */}
                        <div>
                            <label className="block text-gray-300 font-bold mb-2">Drop Tolerance:</label>
                            <input
                                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100 placeholder-gray-500"
                                type="number"
                                min={0}
                                step={0.01}
                                value={sellValueToleranceDiscount}
                                onChange={handleInputChangeDropTolerance}
                                placeholder="Enter Drop Tolerance"
                            />
                        </div>
                    </div>
                    {/* Bottoni "New" e "Show Pact Card" */}
                    <div className="flex flex-col sm:flex-row justify-center sm:space-x-5 space-y-4 sm:space-y-0">
                        <button
                            className="overflow-hidden relative w-full sm:w-48 p-2 h-12 bg-black text-white border-none rounded-md text-xl font-bold cursor-pointer z-10 group"
                            onClick={(e) => {
                                //setAuthContract(ironFallAddress)
                                authSpending(e);
                            }}
                        >
                            New
                            <span
                                className="absolute w-52 h-36 -top-10 -left-4 bg-orange-200 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-bottom"
                            ></span>
                            <span
                                className="absolute w-52 h-36 -top-10 -left-4 bg-orange-400 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-bottom"
                            ></span>
                            <span
                                className="absolute w-52 h-36 -top-10 -left-4 bg-orange-600 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-1000 duration-500 origin-bottom"
                            ></span>
                            <span
                                className="group-hover:opacity-100 group-hover:duration-1000 duration-100 opacity-0 absolute top-2.5 left-6 z-10"
                            >
                                Auction!
                            </span>
                        </button>
                        {openAuthWindow && <RenderWindoAuthPact />}
                        <button
                            onClick={() => {
                                if (sellId) {
                                    setShowPactCard(true);
                                }
                            }}
                            className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-transform hover:scale-105"
                        >
                            Show Pact Card
                        </button>
                    </div>
                </div>

                {/* Pact's in Wallet Heading */}
                <h3 className="text-white text-3xl font-semibold py-4 text-center">Pacts in wallet</h3>

                {/* Table Section */}
                {rows[0] ? (
                    <RenderTable />
                ) : (
                    <p className="text-white text-3xl font-semibold py-4 text-center">
                        Wallet is empty or wallet disconnect
                    </p>
                )}
            </div>

            {/* Modal Pact Card */}
            {showPactCard && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70">
                    <PactCard id={sellId} onChange={() => setShowPactCard(false)} />
                </div>
            )}
        </div>
    );

}
