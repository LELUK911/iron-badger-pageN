import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from "react"
import { pactDetails, pointDebtor } from '../../../../utils/BlockchainOperation/IronPactOp'
import { BigNumConv, calculateExpired, NumConvBig, srcTokenData } from '../../../../utils/helper/helper'
import { buyPactTX, ironForgeAddress, showAmountInSell, showPactLaunchListTX, withDrawPactBuy } from '../../../../utils/BlockchainOperation/IronForgeOp.js'
import { approveERC20, getBalance, getSymbol, readAllowance } from '../../../../utils/BlockchainOperation/ERC20op.js';
import { PactCard } from "../../../../utils/components/PactCard/PactCard";
import { Tooltips } from '../../../../utils/components/tooltips/Tooltips.jsx';
import { amountPactBuyInForgeTooltip, pactIDTooltip, forgeIDTooltip } from '../../../../utils/components/tooltips/tooltipsInformation/helperTips.js';
import { useAccount } from 'wagmi';
import { useEthersSigner } from '../../../../utils/helper/ClientToSigner.jsx';
import { tableStyle } from '../../../../utils/Information/constantPage.js';




export const MarketList = () => {
    const [showPactCard, setShowPactCard] = useState(false)
    const [rows, setRows] = useState([])
    const [_forgeId, setForgeId] = useState("");
    const [buyId, setBuyId] = useState("");
    const [buyAmount, setBuyAmount] = useState("");
    const [amountToken, setAmountToken] = useState("");
    const [sizeAmount, setSizeAmount] = useState("");
    const [tokenAddress, setTokenAddress] = useState("");
    const [tokenTicker, setTokenTicker] = useState("");
    const account = useAccount()
    const signer = useEthersSigner()
    const [isLoadingBuy, setIsLoadingBuy] = useState(false);
    const [, setTxHashBuy] = useState(null);
    const [isLoadingWith, setIsLoadingWith] = useState(false);
    const [, setTxHashWith] = useState(null);
    const [buyTokenBalance, setBuyTokenBalance] = useState(0);



    const columns = [
        { field: "forgeId", headerName: "#", width: 75 },
        { field: "id", headerName: "Id", width: 75 },
        { field: "amount", headerName: "Amount", width: 100 },
        { field: "sizePact", headerName: "Pact Price", width: 125 }, // Pact → Pact
        { field: "numberReward", headerName: "N. Rewards", width: 130 }, // Rewards → Payouts (terminologia più chiara)
        { field: "sizeReward", headerName: "Rewards Size", width: 140 }, // Reward Size → Payout Size
        { field: "tokenTicker", headerName: "Token", width: 175 },
        { field: "expired", headerName: "Expired", width: 130 }, // Expired Data → Maturity Date (più preciso)
    ];

    const fetchData = async () => {
        try {
            let rowsArray = []
            let _PactsList = []
            const launchList = await showPactLaunchListTX()
            for (let index = 0; index < launchList.length; index++) {
                const _pactDetails = await pactDetails(+launchList[index].toString());
                _PactsList.push(_pactDetails)
                const ScorePoint = await pointDebtor(_pactDetails.debtor)
                const _showAmountInSel = await showAmountInSell((_pactDetails.id).toString())
                //if (+(_showAmountInSel.toString()) >0) {

                const tokenInfo = await srcTokenData(_pactDetails.tokenLoan)
                const row = {
                    forgeId: index,
                    id: (_pactDetails.id).toString(),
                    amount: +_showAmountInSel.toString(),
                    sizePact: (+BigNumConv(_pactDetails.sizeLoan)).toFixed(4),
                    numberReward: +_pactDetails.rewardMaturity.length,
                    sizeReward: (+BigNumConv(_pactDetails.interest)).toFixed(4),
                    tokenTicker: tokenInfo.ticker,
                    tokenaddress: tokenInfo.address,
                    expired: calculateExpired(+(_pactDetails.expiredPact.toString())),
                    debtorScore: +(ScorePoint.score).toString(),
                }
                rowsArray.push(row)
                //}

            }
            setRows(rowsArray)
        } catch (e) {
            console.error(e)

        }
    }
    const buyPactOp = async () => {
        setIsLoadingBuy(true);
        try {
            const allowance = await readAllowance(tokenAddress, account.address, ironForgeAddress)
            const powerOfSpend = allowance.toString() || "0";
            console.log("allowance", powerOfSpend)
            if (powerOfSpend < NumConvBig(amountToken.toString())) {
                const tx = await approveERC20(ironForgeAddress, NumConvBig(amountToken), signer, tokenAddress);
                alert(`Spending token Approve  tx -> ${tx}`);
            }

            await buyPactTX(buyId, _forgeId, buyAmount, signer)
        } catch (error) {
            console.error("Transaction failed:", error);
            alert("Transaction failed! Check console for details.");
        } finally {
            setIsLoadingBuy(false);
        }
    }
    const withDrawPactOp = async () => {
        setIsLoadingWith(true);
        try {
            const tx = await withDrawPactBuy(buyId, signer
            )
            setTxHashWith(tx); // Salva l'hash della transazione
            alert(`Tx submitted -> ${tx}`);
        } catch (error) {
            console.error("Transaction failed:", error);
            alert("Transaction failed! Check console for details.");
        } finally {
            setIsLoadingWith(false);
        }
    }





    useEffect(() => {
        fetchData();
    }, [])


    const _getbalance = async (_tokenAddress) => {
        const _balance = await getBalance(_tokenAddress, account.address)
        const _ticker = await srcTokenData(_tokenAddress)
        setBuyTokenBalance({
            balance: BigNumConv(_balance),
            ticker: _ticker.ticker
        })
    }

    const _tokenInfo = async (_tokenAddress) => {
        const tokenInfo_ = await getSymbol(_tokenAddress)
        setTokenTicker(tokenInfo_)
    }


    const handleRowClick = (params) => {
        setForgeId(params.row.forgeId)
        setBuyId(params.row.id)
        setBuyAmount(params.row.amount)
        setSizeAmount(+params.row.sizePact)
        setAmountToken(+params.row.amount * (+params.row.sizePact))
        setTokenAddress(params.row.tokenaddress)
        _getbalance(params.row.tokenaddress)
        _tokenInfo(params.row.tokenaddress)
    };

    const handleInputChangeBuyId = (e) => {
        setBuyId(e.target.value);
    };

    const handleInputChangeAmount = (e) => {
        setBuyAmount(e.target.value);
        setAmountToken(+e.target.value * (+sizeAmount))

    };

    const handleInputChangeForgeID = (e) => {
        setForgeId(e.target.value);
    };

    return (
        <div className="p-4 sm:p-6 rounded-xl m-5 flex flex-col md:flex-row items-center justify-center min-h-screen ">
            {/* Sezione Opzioni */}
            <div className="w-full md:w-1/4 p-6 mx-4 rounded-xl bg-slate-800 text-gray-100 shadow-lg mb-6 md:mb-0">
                <h3 className="font-bold text-center text-2xl mb-6">Options</h3>

                <div className="space-y-6">
                    {/* Campo # */}
                    <div>
                        <div className='flex items-center space-x-2'>
                            <label className="block text-sm font-semibold text-gray-300 mb-2">#</label>
                            <Tooltips information={forgeIDTooltip} />
                        </div>
                        <input
                            type="number"
                            value={_forgeId}
                            min={0}
                            onChange={handleInputChangeForgeID}
                            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100 placeholder-gray-500"
                            placeholder="Enter #"
                        />
                    </div>

                    {/* Campo Pact ID */}
                    <div>
                        <div className='flex items-center space-x-2'>
                            <label className="block text-sm font-semibold text-gray-300 mb-2">Pact ID</label>
                            <Tooltips information={pactIDTooltip} />
                        </div>
                        <input
                            type="number"
                            value={buyId}
                            min={0}
                            onChange={handleInputChangeBuyId}
                            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100 placeholder-gray-500"
                            placeholder="Enter Pact ID"
                        />
                    </div>

                    {/* Campo Amount */}
                    <div>
                        <div className='flex items-center space-x-2'>
                            <label className="block text-sm font-semibold text-gray-300 mb-2">Amount</label>
                            <Tooltips information={amountPactBuyInForgeTooltip} />
                        </div>
                        <input
                            type="number"
                            value={buyAmount}
                            min={0}
                            onChange={handleInputChangeAmount}
                            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100 placeholder-gray-500"
                            placeholder="Enter Amount"
                        />
                    </div>




                    <div className="bg-gray-900 border border-gray-700 rounded-lg p-3">
                        <div className="flex justify-between text-sm font-semibold text-blue-300">
                            <span>Cost:</span>
                            <span>
                                {amountToken ? Number(amountToken).toFixed(4) : "0"}
                                {tokenTicker ? ` ${tokenTicker}` : ""}  
                            </span>
                        </div>
                        <div className="flex justify-between text-sm font-semibold text-yellow-300 mt-1">
                            <span>Balance:</span>
                            <span>
                                {buyTokenBalance ? Number(buyTokenBalance.balance).toFixed(4) : "0"}{" "}
                                {buyTokenBalance ? buyTokenBalance.ticker : ""}
                            </span>
                        </div>
                    </div>



                    {/* Pulsanti */}
                    <div className="flex flex-col space-y-4">
                        <button
                            onClick={() => setShowPactCard(true)}
                            className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform transition-all duration-500 ease-in-out hover:scale-105 hover:brightness-110 active:scale-95"
                        >
                            Show Card
                        </button>
                        {/* Buy Button */}
                        <button
                            onClick={buyPactOp}
                            disabled={isLoadingBuy}
                            className={`flex items-center justify-center w-full py-3 px-6 font-bold rounded-lg shadow-lg transform transition-all duration-500 ease-in-out ${isLoadingBuy
                                ? "bg-gray-500 cursor-not-allowed"
                                : "bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 hover:scale-105 hover:brightness-110 active:scale-95"
                                }`}
                        >
                            {isLoadingBuy ? (
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
                                "Buy"
                            )}
                        </button>

                        {/* Withdraw Pact Button */}
                        <button
                            onClick={withDrawPactOp}
                            disabled={isLoadingWith}
                            className={`flex items-center justify-center w-full py-3 px-6 font-bold rounded-lg shadow-lg transform transition-all duration-500 ease-in-out ${isLoadingWith
                                ? "bg-gray-500 cursor-not-allowed"
                                : "bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 hover:scale-105 hover:brightness-110 active:scale-95"
                                }`}
                        >
                            {isLoadingWith ? (
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
                                "Withdraw Pact"
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Sezione Forge List */}
            <div className="w-full md:w-3/4 p-6">
                <h2 className="text-white font-semibold text-2xl py-4 text-center">Forge List
                    <button
                        onClick={fetchData}
                        className="text-sm ms-2  bg-yellow-500  hover:bg-yellow-700  text-white font-bold py-1 px-2 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105"
                    >
                        Refresh
                    </button>
                </h2>
                <div>
                    <DataGrid
                        rows={[...rows].reverse()}
                        columns={columns}
                        pageSize={4}
                        onRowClick={handleRowClick}
                        className="bg-slate-800 rounded-lg shadow-lg"
                        sx={tableStyle}
                    />
                </div>
            </div>
            {/* Pact Card Modal */}
            {showPactCard && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70">
                    <PactCard id={buyId} onChange={() => setShowPactCard(false)} />
                </div>
            )}
        </div>
    );
}
