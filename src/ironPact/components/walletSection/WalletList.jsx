import { DataGrid } from "@mui/x-data-grid"
import { useEffect, useState } from "react"
import { balancePactForId, pactDetails, readId } from "../../../utils/BlockchainOperation/IronPactOp"
import { BigNumConv, calculateExpired, srcTokenData } from "../../../utils/helper/helper"
import { PactCard } from "../../../utils/components/PactCard/PactCard"
import { useAccount } from "wagmi"
import { DebtorInformation } from "./DebtorInformation"
import { tableStyle } from "../../../utils/Information/constantPage"
import { Link } from "react-router-dom"



export const WalletList = () => {
    const [showPactCard, setShowPactCard] = useState(false)
    const [rows, setRows] = useState([])
    const [rowIssued, setRowsIssued] = useState([])
    const [searchValue, setSearchValue] = useState("");
    const account = useAccount()

    const columns = [
        { field: "id", headerName: "ID", width: 75 },
        { field: "amount", headerName: "Pact Amount", width: 150 },
        {
            field: "sizePact",
            headerName: "Principal Amount",
            renderCell: (params) => (
                <span>{params.row.sizePact.amount} {params.row.sizePact.ticker}</span>
            ),
            width: 170,
            sortable: true,
            valueGetter: (params) => params.amount,
        },
        {
            field: "balanceRepay",
            headerName: "Repayable Balance",
            renderCell: (params) => (
                <span>{params.row.balanceRepay.amount} {params.row.balanceRepay.ticker}</span>
            ),
            width: 170,
            sortable: true,
            valueGetter: (params) => params.amount,
        },
        {
            field: "balanceCollateral",
            headerName: "Collateral Balance",
            renderCell: (params) => (
                <span>{params.row.balanceCollateral.amount} {params.row.balanceCollateral.ticker}</span>
            ),
            width: 170,
            sortable: true,
            valueGetter: (params) => params.amount,
        },
        { field: "expired", headerName: "Maturity Date", width: 150 },
    ];


    const fetchData = async () => {
        if (!account) {
            setRows({})
            return
        } else {
            try {
                const actualId = await readId()
                let rowsArray = []
                let _PactsList = []
                let _rowIssued = []
                for (let index = 0; index < actualId; index++) {
                    const _pactDetails = await pactDetails(index);
                    const amountInWallet = await balancePactForId(account.address, index)
                    if (+amountInWallet.toString() > 0) {
                        _PactsList.push(_pactDetails)
                        const tokenLoanData = await srcTokenData(_pactDetails.tokenLoan)
                        const tokenCollateralData = await srcTokenData(_pactDetails.tokenLoan)
                        const row = {
                            id: index,
                            amount: amountInWallet.toString(),
                            sizePact: {
                                amount: +BigNumConv(_pactDetails.sizeLoan),
                                ticker: tokenLoanData.ticker
                            },
                            balanceRepay: {
                                amount: +BigNumConv(_pactDetails.balancLoanRepay),
                                ticker: tokenLoanData.ticker
                            },
                            balanceCollateral: {
                                amount: +BigNumConv(_pactDetails.collateral),
                                ticker: tokenCollateralData.ticker,
                            },
                            expired: calculateExpired(+(_pactDetails.expiredPact.toString()))
                        }
                        rowsArray.push(row)
                    }
                    if (account.address == _pactDetails.debtor) {
                        const tokenLoanData = await srcTokenData(_pactDetails.tokenLoan)
                        const tokenCollateralData = await srcTokenData(_pactDetails.tokenLoan)
                        const row = {
                            id: index,
                            amount: amountInWallet.toString(),
                            sizePact: {
                                amount: +BigNumConv(_pactDetails.sizeLoan),
                                ticker: tokenLoanData.ticker
                            },
                            balanceRepay: {
                                amount: +BigNumConv(_pactDetails.balancLoanRepay),
                                ticker: tokenLoanData.ticker
                            },
                            balanceCollateral: {
                                amount: +BigNumConv(_pactDetails.collateral),
                                ticker: tokenCollateralData.ticker,
                            },
                            expired: calculateExpired(+(_pactDetails.expiredPact.toString()))
                        }
                        _rowIssued.push(row)
                    }

                }
                setRows(rowsArray)
                setRowsIssued(_rowIssued)
            } catch (e) {
                console.error(e)
            }
        }
    }

    useEffect(() => {
        if (account.address) {
            fetchData();
        }
    }, [account]);

    const handleRowClick = (params) => {
        setShowPactCard(true)
        setSearchValue(params.row.id)
    };

    const RenderTable = () => {
        return (
            <div className="w-2/3 overflow-x-auto">
                <div className="w-full max-w-7xl overflow-x-auto">
                    <h1 className="text-3xl text-yellow-400 font-bold p-4 ">Pact in Wallet</h1>
                    <DataGrid
                        columns={columns}
                        rows={rows}
                        pageSizeOptions={5}
                        onRowClick={handleRowClick}
                        sx={tableStyle}
                    />
                </div>
            </div>
        )
    }

    const RenderTableIssued = () => {
        return (
            <div className="w-2/3 overflow-x-auto">
                <div className="w-full max-w-7xl overflow-x-auto">
                    <h1 className="text-3xl text-yellow-400 font-bold p-4 ">Pact Issued</h1>
                    <DataGrid
                        columns={columns}
                        rows={[...rowIssued].reverse()}
                        pageSizeOptions={5}
                        onRowClick={handleRowClick}
                        sx={tableStyle}
                    />
                </div>
            </div>
        )
    }

    return (
        <div className="p-4 sm:p-6 min-h-screen">
            {/* Titolo e Descrizione */}
            <div className="text-gray-100 mt-5 space-y-4 text-center">
                <h1 className="font-bold text-2xl sm:text-3xl">
                    Wallet section Iron Pacts
                </h1>
                <p className="text-sm sm:text-base">
                    Managment of your Iron Pacts and sell in
                </p>
            </div>
            {/* Sezione Principale */}
            <div className="flex flex-col items-center justify-start py-6 space-y-6">
                {/* Box di Ricerca / Pact Card */}
                <div className="flex flex-col md:flex-row gap-5 w-full max-w-4xl px-4">
                    {/* Show Pact Card */}
                    <div className="w-full p-6 bg-slate-800 rounded-lg shadow-md flex flex-col items-start space-y-4">
                        <DebtorInformation />
                    </div>
                </div>
                <div className="bg-slate-800 text-white p-4 rounded-lg shadow w-full max-w-3xl text-sm">
                    <h3 className="text-lg font-semibold text-yellow-300 mb-2">📘 Wallet Table Guide</h3>
                    <p className="text-gray-200 mb-2">
                        This table lists all your active and newly minted Pacts. New Pacts can be sold on the{' '}
                        <Link to="/app.ironForge/board" className="underline text-blue-400 hover:text-blue-300 font-medium">
                            Iron Forge
                        </Link>{' '}
                        marketplace.
                    </p>
                    <p className="text-gray-200 mb-2">
                        Use the table to open Pact Cards and perform actions like claiming rewards or repaying tokens. Rewards are only claimable if you owned the Pact during the valid period.
                    </p>
                    <p className="text-gray-400">
                        Need details? Check the{' '}
                        <Link to="/documentation" className="underline text-blue-400 hover:text-blue-300 font-medium">
                            docs
                        </Link>.
                    </p>
                </div>

                {/* Tabella o Messaggio di Portafoglio Vuoto */}
                {rows.length > 0 ? (
                    <RenderTable />
                ) : (
                    <p className="text-white text-xl sm:text-2xl font-semibold py-4 text-center">
                        Wallet is empty or wallet disconnected
                    </p>
                )}
                <div className="bg-slate-800 text-white p-4 rounded-lg shadow w-full max-w-3xl text-sm">
                    <h3 className="text-lg font-semibold text-yellow-300 mb-2">📘 Minted table helper</h3>
                    <p className="text-gray-200 mb-2">
                        This table shows your minted Pacts. Click a row to open the Pact Card, where you can manage:
                    </p>
                    <ul className="list-disc list-inside text-gray-300 mb-2 space-y-1">
                        <li>Deposits for rewards or repayments</li>
                        <li>Claiming points after expiry</li>
                        <li>Collateral withdrawal after lock-in</li>
                    </ul>
                    <p className="text-gray-400">
                        Need more info? Check the{' '}
                        <Link to="/documentation" className="underline text-blue-400 hover:text-blue-300 font-medium">
                            docs
                        </Link>.
                    </p>
                </div>


                {rowIssued.length > 0 ? (
                    <RenderTableIssued />
                ) : (
                    <p className="text-white text-xl sm:text-2xl font-semibold py-4 text-center">
                        Nothing Pact minted
                    </p>
                )}
            </div>
            {/* Pact Card Modal */}
            {showPactCard && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70">
                    <PactCard id={searchValue} onChange={() => setShowPactCard(false)} />
                </div>
            )}
        </div>
    )
}
