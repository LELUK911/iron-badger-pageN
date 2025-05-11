import { DataGrid } from "@mui/x-data-grid"
import { balancePactForId, pactDetails, isApprovalForAll, readId, setApprovalPact } from "../../../utils/BlockchainOperation/IronPactOp";
import { useEffect, useState } from "react";
import { BigNumConv, calculateExpired, calculateSecondToDay, NumConvBig, srcTokenData } from "../../../utils/helper/helper";
import { ironFallAddress, newDownAuctionPact } from "../../../utils/BlockchainOperation/IronFall";
import { PactCard } from "../../../utils/components/PactCard/PactCard";
import { useAccount } from "wagmi";
import { useEthersSigner } from "../../../utils/helper/ClientToSigner";
import { NewAuctionInformationFall } from "./NewAuctionInformationFall";
import { tableStyle } from "../../../utils/Information/constantPage";
import { NewDownwardAuctionWizardModal } from "./NewDownwardAuctionWizardModal";


export const WalletSection = () => {
    const [showPactCard, setShowPactCard] = useState(false)
    const [, setPactsList] = useState(null)
    const [rows, setRows] = useState([])
    const [sellId, setSellId] = useState("");
    const [sellValueAmount, setSellValueAmount] = useState("");
    const [sellValueStartPrice, setSellValueStartPrice] = useState("");
    const [sellValueToleranceDiscount, setSellValueToleranceDiscount] = useState("");
    const [showWizard, setShowWizard] = useState(false);
    const [sellValueExpired, setSellValueExpired] = useState("");
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
                    await setApprovalPact(ironFallAddress, true, signer)
                    alert(`Approval tx submited`);
                }
                await newDownAuctionPact(sellId, sellValueAmount, NumConvBig((+sellValueStartPrice)), calculateSecondToDay(sellValueExpired), (sellValueToleranceDiscount * 100).toString(), signer)
                alert(`New Downward Auction tx submited`);
            } catch (error) {
                console.error(error)
                alert("Transaction failed! Check console for details.");
            }finally{
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
        setSellId(e.target.value);
    };
    const authSpending = async (e) => {
        e.preventDefault();
        await newUpwardAuctionOp()
    };



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
                <div className="w-full sm:w-3/4 lg:w-2/3 bg-slate-800 rounded-lg shadow-md p-6 sm:p-8 space-y-8">
                <h2 className="text-white font-semibold text-2xl text-center">Set New Pact Auction</h2>
                <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
                        {/* Pact ID */}
                        <div className="flex-1">
                        <label className="block text-lg font-semibold text-orange-400 mb-1">Pact ID</label>
            <p className="text-sm text-gray-400 italic mb-2">
                This is the ID of the pact you want to auction. It uniquely identifies your tokenized agreement.
            </p>
            <input
                className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-white placeholder-gray-500"
                type="number"
                placeholder="Enter Pact ID"
                min={0}
                value={sellId}
                onChange={handleInputChangeSellId}
            />
                        </div>
                    </div>
                    
                    {/* Bottoni "New" e "Show Pact Card" */}
                    <div className="flex flex-col sm:flex-row justify-center sm:space-x-5 space-y-4 sm:space-y-0">
                    <button onClick={() => setShowWizard(true)}  className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg shadow-md transition">
                            New Auction
                        </button>
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


            {showWizard && (
                <NewDownwardAuctionWizardModal
                    id={sellId}
                    amount={sellValueAmount}
                    onClose={() => setShowWizard(false)}
                    onSubmit={(data) => {
                        setSellId(data.sellId);
                        setSellValueAmount(data.amount);
                        setSellValueStartPrice(data.startPrice);
                        setSellValueExpired(data.duration);
                        setSellValueToleranceDiscount(data.dropTolerance);
                        authSpending(new Event("submit"));
                    }}
                />
            )}
        </div>
    );

}
