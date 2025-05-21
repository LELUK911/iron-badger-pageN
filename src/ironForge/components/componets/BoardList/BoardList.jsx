import { DataGrid } from '@mui/x-data-grid'
import { useEffect, useState } from "react"
import { balancePactForId, pactDetails, readId, isApprovalForAll, setApprovalPact } from '../../../../utils/BlockchainOperation/IronPactOp'
import { BigNumConv, calculateExpired, srcTokenData } from '../../../../utils/helper/helper'
import { ironForgeAddress, launchNewPactTX } from '../../../../utils/BlockchainOperation/IronForgeOp.js'
import { PactCard } from '../../../../utils/components/PactCard/PactCard.jsx'
import { Tooltips } from '../../../../utils/components/tooltips/Tooltips.jsx'
import { amountToForgeTooltip, pactIDTooltip } from '../../../../utils/components/tooltips/tooltipsInformation/helperTips.js'
import { useAccount } from 'wagmi'
import { useEthersSigner } from '../../../../utils/helper/ClientToSigner.jsx'
import { tableStyle } from '../../../../utils/Information/constantPage.js'
import { toast } from 'react-toastify'




export const BoardList = () => {
    const [showPactCard, setShowPactCard] = useState(false)
    const [, setPactsList] = useState(null)
    const [rows, setRows] = useState([])
    //const [selectRow, setSelectedRow] = useState(null)
    const [sellId, setSellId] = useState("");
    const [sellValueAmount, setSellValueAmount] = useState("");
    const account = useAccount()
    const signer = useEthersSigner()
    const [isLoading, setIsLoading] = useState(false);


    const columns = [
        { field: "id", headerName: "Id", width: 100 },
        { field: "amountPacts", headerName: "Amount Pacts", width: 150 },
        { field: "sizePact", headerName: "Price Pact", width: 150 },
        { field: "numberOfReward", headerName: "N. Rewards", width: 170 },
        { field: "tokenTicker", headerName: "Token", width: 170 },
        { field: "expired", headerName: "Maturity Date", width: 200 },
    ];


    const fetchData = async () => {
        try {
            const actualId = await readId()
            let rowsArray = []
            let _PactsList = []
            for (let index = 0; index < actualId; index++) {
                const _pactDetails = await pactDetails(index);
                if (_pactDetails.debtor == account.address) {
                    const amountInWallet = await balancePactForId(_pactDetails.debtor, index)
                    if (amountInWallet.toString() != '0') {
                        _PactsList.push(_pactDetails)
                        const tokenInfo = await srcTokenData(_pactDetails.tokenLoan)
                        const row = {
                            id: index,
                            amountPacts: +amountInWallet.toString(),
                            sizePact: (+BigNumConv(_pactDetails.sizeLoan)).toFixed(4),
                            numberOfReward: _pactDetails.rewardMaturity.length,
                            sizeReward: (+BigNumConv(_pactDetails.interest)).toFixed(4),
                            tokenTicker: tokenInfo.ticker,
                            expired: calculateExpired(+(_pactDetails.expiredPact.toString()))
                        }
                        rowsArray.push(row)
                    }
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
            await isApprovalForAll(account.address, ironForgeAddress)
        } catch (error) {
            console.error(error)
            toast.error("Problem with auth spending Pact")
        }
    }

    const newForge = async () => {
        if (!account.address){
            toast.error("Not wallet connect");
            return        
        }
        try {
            setIsLoading(true)
            const _ironForgeAuth = await isApprovalForAll(account.address, ironForgeAddress)
            if (!_ironForgeAuth) {
                const response = await setApprovalPact(ironForgeAddress, true, signer)
                if(response != false){
                    toast.success("Approval tx submitted");
                }else{
                    toast.error("Approval Transaction failed");
                }
            }
            const response = await launchNewPactTX(sellId.toString(), sellValueAmount.toString(), signer)
            if(response != false){
                toast.success(`Launch new Pact tx submitted!`);
            }else{
                toast.error("Transaction failed");
            }
        } catch (error) {
            console.error("Transaction failed:", error);
            toast.error("Transaction failed, ",error);
        }finally{
            setIsLoading(false)
        } 
    }
    useEffect(() => {
        if (account) {
            fetchData();
            fetchAuthPact()
        }
    }, [account])

    const handleRowClick = (params) => {
        setSellId(params.row.id)
        setSellValueAmount(params.row.amountPacts)
    };

    const handleInputChangeSellId = (e) => {
        setSellId(e.target.value);
    };

    const handleInputChangeAmount = (e) => {
        setSellValueAmount(e.target.value);
    };



    return (
        <div className=" p-6  text-gray-100 rounded-lg shadow-lg">
            {/* Campo interattivo */}
            <div className="w-full p-6 mb-6 rounded-xl bg-slate-800 text-gray-100 shadow-lg">
                <h3 className="font-bold text-start text-2xl mb-6">Options :</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Campo Id Pact */}
                    <div>
                        <div className='flex items-center space-x-2'>
                            <label className="block text-sm font-semibold text-gray-300 mb-2">
                                Id Pact
                            </label>
                            <Tooltips information={pactIDTooltip} />
                        </div>
                        <input
                            type="number"
                            min={0}
                            value={sellId}
                            onChange={handleInputChangeSellId}
                            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100 placeholder-gray-500"
                            placeholder="Enter Pact ID"
                        />
                    </div>

                    {/* Campo Amount */}
                    <div>
                        <div className='flex items-center space-x-2'>

                            <label className="block text-sm font-semibold text-gray-300 mb-2">
                                Amount
                            </label>
                            <Tooltips information={amountToForgeTooltip} />
                        </div>
                        <input
                            type="number"
                            min={0}
                            value={sellValueAmount}
                            onChange={handleInputChangeAmount}

                            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100 placeholder-gray-500"
                            placeholder="Enter Amount"
                        />
                    </div>
                </div>

                {/* Pulsanti */}
                <div className="flex justify-around mt-6">
                    <button
                        onClick={() => setShowPactCard(true)}
                        className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform transition-all duration-500 ease-in-out hover:scale-105 hover:brightness-110 active:scale-95"
                    >
                        Show Card
                    </button>
                    <button
                        onClick={newForge}
                        disabled={isLoading}
                        className={`bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform transition-all duration-500 ease-in-out hover:scale-105 hover:brightness-110 active:scale-95 ${isLoading
                            ? "bg-gray-500 cursor-not-allowed"
                            : "bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 hover:scale-105 hover:brightness-110 active:scale-95"
                            }`}
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v8z"
                                    ></path>
                                </svg>
                                Processing...
                            </>
                        ) : (
                            "Forge"
                        )}
                    </button>

                </div>
            </div>

            {/* Tabella */}
            <div className=" bg-slate-800 p-6 rounded-xl">
                {/* Titolo */}
                <h2 className="text-white text-start font-semibold text-2xl py-4">
                    Wallet Forge List
                    <button
                        onClick={() => { fetchData(); fetchAuthPact() }}
                        className='ms-4 py-1 px-2 rounded-lg text-sm bg-yellow-500 hover:bg-yellow-700'
                    >
                        Refresh
                    </button>
                </h2>
                <DataGrid
                    rows={[...rows].reverse()}
                    columns={columns}
                    pageSize={4}
                    onRowClick={handleRowClick}
                    sx={tableStyle}
                />
            </div>
            {showPactCard && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70">
                    <PactCard id={sellId} onChange={() => setShowPactCard(false)} />
                </div>
            )}
        </div>

    )
}
