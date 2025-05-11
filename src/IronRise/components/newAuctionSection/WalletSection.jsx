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
import { NewAuctionWizardModal } from "./NewAuctionWizardModal";


export const WalletSection = () => {
    const [showPactCard, setShowPactCard] = useState(false)
    const [rows, setRows] = useState([])
    const [sellId, setSellId] = useState("");
    const [sellValueAmount, setSellValueAmount] = useState("");
    const [sellValueStartPrice, setSellValueStartPrice] = useState("");
    const [sellValueExpired, setSellValueExpired] = useState("");
    const [authPact, setAuthPact] = useState({})
    const [showWizard, setShowWizard] = useState(false);
    const account = useAccount()
    const signer = useEthersSigner()



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
            try {
                if (!authPact) {
                    await setApprovalPact(ironRiseAddress, true, signer)
                    alert(`Approval tx submitted`);
                }
                await newAuctionPact(sellId, sellValueAmount, NumConvBig((+sellValueStartPrice)), calculateSecondToDay(sellValueExpired), signer)
                alert(`New Auction tx submitted`);
            } catch (error) {
                console.error(error)
                alert("Transaction failed! Check console for details.");
            } finally {
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
                <div className="w-full sm:w-3/4 bg-slate-800 rounded-xl border border-gray-700 shadow-lg p-6 sm:p-8 space-y-8">
                    <h2 className="text-2xl font-semibold text-white text-center">Set New Pact Auction</h2>

                    <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
    {/* Input + label */}
    <div className="flex-1">
        <label className="block text-lg font-semibold text-orange-400 mb-1">Pact ID</label>
        <p className="text-sm text-gray-400 italic mb-2">
            This is the ID of the pact you want to auction.
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

    {/* Pulsanti in riga */}
    <div className="flex gap-4 md:mt-6 font-bold">
        <button
            onClick={() => setShowWizard(true)}
            className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg shadow-md transition"
        >
            New Auction
        </button>
        <button
            onClick={() => sellId && setShowPactCard(true)}
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white rounded-lg shadow-md transition-transform transform hover:scale-105"
        >
            Show Pact Card
        </button>
    </div>
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

            {showWizard && (
                <NewAuctionWizardModal
                    id={sellId}
                    amount={sellValueAmount}
                    onClose={() => setShowWizard(false)}
                    onSubmit={(data) => {
                        setSellId(data.sellId);
                        setSellValueAmount(data.amount);
                        setSellValueStartPrice(data.startPrice);
                        setSellValueExpired(data.duration);
                        authSpending(new Event("submit"));
                    }}
                />
            )}
        </div>
    )
}
