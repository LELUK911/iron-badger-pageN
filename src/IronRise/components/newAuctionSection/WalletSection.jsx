import { DataGrid } from "@mui/x-data-grid"
import { balancePactForId, pactDetails, isApprovalForAll, readId, setApprovalPact } from "../../../utils/BlockchainOperation/IronPactOp";
import { useEffect, useState } from "react";
import { BigNumConv, calculateExpired, calculateSecondToDay, NumConvBig, srcTokenData } from "../../../utils/helper/helper";
import { ironRiseAddress, newAuctionPact } from "../../../utils/BlockchainOperation/IronRiseOp";
import { PactCard } from "../../../utils/components/PactCard/PactCard";
import { useAccount } from "wagmi";
import { useEthersSigner } from "../../../utils/helper/ClientToSigner";
import { NewAuctionInformation } from "./NewAuctionInformation";
import { tableStyle } from "../../../utils/Information/constantPage";

export const WalletSection = () => {
    const [showPactCard, setShowPactCard] = useState(false)
    const [rows, setRows] = useState([])
    const [sellId, setSellId] = useState("");
    const [sellValueAmount, setSellValueAmount] = useState("");
    const [sellValueStartPrice, setSellValueStartPrice] = useState("");
    const [sellValueExpired, setSellValueExpired] = useState("");
    const [authPact, setAuthPact] = useState({})
    const account = useAccount()
    const signer = useEthersSigner()

    const [isLoading, setIsLoading] = useState(false);
    const [, setTxHash] = useState(null);



    const columns = [
        { field: "id", headerName: "Pact ID", width: 75 },
        { field: "amount", headerName: "Amount Pacts", width: 150 },
        {
            field: "sizePact", headerName: "Pact Price",
            renderCell: (params) => (
                <span>{params.row.sizePact.amount} {params.row.sizePact.ticker}</span>
            ),
            width: 170,
            sortable: true,
            valueGetter: (params) => params.amount
        },
        {
            field: "balanceRepay", headerName: "Reserve",
            renderCell: (params) => (
                <span>{params.row.balanceRepay.amount} {params.row.balanceRepay.ticker}</span>
            ),
            width: 170,
            sortable: true,
            valueGetter: (params) => params.amount,
        },
        {
            field: "balanceCollateral", headerName: "Collateral Balance",
            renderCell: (params) => (
                <span>{params.row.balanceCollateral.amount} {params.row.balanceCollateral.ticker}</span>
            ),
            width: 170,
            sortable: true,
            valueGetter: (params) => params.amount
        },
        { field: "expired", headerName: "Expired", width: 150 },
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
            const _ironRiseAuth = await isApprovalForAll(account.address, ironRiseAddress, signer)
            setAuthPact(_ironRiseAuth)
        } catch (error) {
            console.error(error)
        }
    }

    const newUpwardAuctionOp = async () => {
        if (account.address) {
            setIsLoading(true)
            try {
                if (!authPact) {
                    const authTx = await setApprovalPact(ironRiseAddress, true, signer)
                    await authTx.wait()
                    alert(`Tx submitted -> ${authTx}`);
                }
                const tx = await newAuctionPact(sellId, sellValueAmount, NumConvBig((+sellValueStartPrice )), calculateSecondToDay(sellValueExpired), signer)
                await tx.wait()
                setTxHash(tx);
                alert(`Tx submitted -> ${tx}`);
            } catch (error) {
                console.error("Transaction failed:", error);
                alert("Transaction failed! Check console for details.");
            } finally {
                setIsLoading(false)
                fetchAuthPact()
            }
        } else {
            alert("Connect wallet and select Pact for new Auction")
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
        setSellId(e.target.value); // Aggiorna solo il valore dell'input
    };
    const handleInputChangeAmount = (e) => {
        setSellValueAmount(e.target.value); // Aggiorna solo il valore dell'input
    };
    const handleInputChangeStartPrice = (e) => {
        setSellValueStartPrice(e.target.value); // Aggiorna solo il valore dell'input
    };
    const handleInputChangeExpired = (e) => {
        setSellValueExpired(e.target.value); // Aggiorna solo il valore dell'input
    };

    const authSpending = async (e) => {
        e.preventDefault();
        await newUpwardAuctionOp()
    };

    const RenderTable = () => {
        return (
            <div className="w-2/3 overflow-x-auto">
                <div className="w-full max-w-7xl overflow-x-auto">
                    <DataGrid
                        columns={columns}
                        rows={[...rows].reverse()}
                        pageSizeOptions={5}
                        onRowClick={handleRowClick}
                        sx={tableStyle}
                    />
                </div></div>
        )
    }

    return (
        <div className=" flex flex-col p-4 rounded-lg shadow-lg grid ">
            <div className="text-gray-100 mt-8 space-y-3 text-center">
                <h1 className="text-3xl font-bold">Create a New Auction</h1>
                <p className="text-gray-300">Launch a new auction and close exciting deals.</p>
            </div>

            <NewAuctionInformation />
            <div className="flex flex-col items-center justify-center p-6 space-y-6">
                {/* Secondary Market Section */}
                <div className="w-3/4 bg-slate-800 rounded-lg shadow-md p-8 space-y-6">
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
                                placeholder="Enter duration in days"
                            />
                        </div>
                    </div>
                    <div className="flex justify-center mt-6 space-x-5">
                        <button
                            onClick={(e) => {
                                authSpending(e);
                            }}
                            disabled={isLoading}
                            className={`overflow-hidden relative w-48 p-2 h-12 text-white border-none rounded-md text-xl font-bold cursor-pointer z-10 group transition-all duration-500 ease-in-out ${isLoading ? "bg-gray-500 cursor-not-allowed" : "bg-black"
                                }`}
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                                    </svg>
                                    Processing...
                                </>
                            ) : (
                                <>
                                    New
                                    <span className="absolute w-52 h-36 -top-10 -left-4 bg-orange-200 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-bottom"></span>
                                    <span className="absolute w-52 h-36 -top-10 -left-4 bg-orange-400 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-bottom"></span>
                                    <span className="absolute w-52 h-36 -top-10 -left-4 bg-orange-600 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-bottom"></span>
                                    <span className="opacity-0 absolute top-2.5 left-6 z-10 group-hover:opacity-100 group-hover:duration-1000 duration-100">
                                        Start Auction!
                                    </span>
                                </>
                            )}
                        </button>
                        <button
                            onClick={() => {
                                if (sellId) {
                                    setShowPactCard(true);
                                }
                            }}
                            className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:brightness-110 active:scale-95"
                        >
                            Show Pact Card
                        </button>

                    </div>

                </div>
                <h3 className="text-white text-3xl font-semibold py-4 ">Pact&apos;s in wallet</h3>
                {/* Table Section */}

                {rows[0] ? <RenderTable /> : (<>
                    <p className="text-white text-3xl font-semibold py-4 ">Wallet is empty or wallet disconnect</p>
                </>)}
            </div>
            {showPactCard && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70">
                    <PactCard id={sellId} onChange={() => setShowPactCard(false)} />
                </div>
            )}
        </div>
    )
}
