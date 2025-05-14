import { useEffect, useState } from 'react';
import pactAuctionImg from '../../../assets/pactAuctionImg.png'
import {closeDownAuction, downInstalmentPot, ironFallAddress, showDownAuction, showDownFeesSystem, withDrawPactDownAuction } from '../../../utils/BlockchainOperation/IronFall';
import { BigNumConv, calcPercFromBasisPoints, NumConvBig, renderAddress, srcTokenData } from '../../../utils/helper/helper';
import { pactDetails } from '../../../utils/BlockchainOperation/IronPactOp';
import { Countdown } from '../../../utils/helper/CountDown';
import { useEthersSigner } from '../../../utils/helper/ClientToSigner';
import { auctionMoneyToken } from '../../../utils/Information/constantPage';
import { approveERC20, getBalance, readAllowance } from '../../../utils/BlockchainOperation/ERC20op';
import { useAccount } from 'wagmi';
import { requestNewInstalmentDown } from '../../../API/api';
import { Link } from 'react-router-dom';



// eslint-disable-next-line react/prop-types
export const DownwardCard = ({ id }) => {
    const [auctionInfo, setAuctionInfo] = useState(null)
    const [pactInfo, setPactInfo] = useState(null)
    const [financInfo, setFinanceInfo] = useState(null)
    const [amountBet, setAmountBet] = useState(0)
    const [sizeLot, setSizeLot] = useState('loading')
    const [infoFee, setInfoFee] = useState(false)
    const [tokenData, setTokenData] = useState({ name: '', ticker: '', address: '' })
    const [valTolerance, setValTolerance] = useState(0)
    const [netAmountBet, setNetAmountBet] = useState(0)
    const [feeAmount, setFeeAmount] = useState(0)
    const [feeSystem, setFeeSystem] = useState('')
    const [events, setEvents] = useState([])
    const [usdBalance, setUSDBalance] = useState(0)

    const [isLoadingBid, setIsLoadingBid] = useState(false);
    const [isLoadingCls, setIsLoadingCls] = useState(false);
    const [isLoadingWit, setIsLoadingWit] = useState(false);

    const account = useAccount()
    const signer = useEthersSigner()

    const calcData = () => {
        const priceThreshold = BigNumConv(feeSystem[1])
        const fixedFee = BigNumConv(feeSystem[0])
        const dinamicFee = feeSystem[2].toString()
        if (+priceThreshold >= amountBet) {
            setFeeAmount(fixedFee)
            setNetAmountBet(+amountBet - fixedFee)
        } else {
            const _amountFee = (+amountBet * (+dinamicFee / 100)) / 100;
            const _netAmount = +amountBet - _amountFee;
            setFeeAmount(_amountFee)
            setNetAmountBet(_netAmount)
        }
    }


    const instalmentInPot = async () => {
        setIsLoadingBid(true);
        try {
            const allowance = await readAllowance(auctionMoneyToken, account.address, ironFallAddress)
            const powerOfSpend = allowance.toString() || "0";
            if (+powerOfSpend < +NumConvBig(amountBet).toString()) {
                await approveERC20(ironFallAddress, NumConvBig(amountBet), signer, auctionMoneyToken)
                alert("Approve transaction submitted");

            }
            await downInstalmentPot(id, NumConvBig(amountBet), signer)
            alert(`Pot updated successfully!`);
        } catch (error) {
            console.error("Transaction failed:", error);
            alert("Transaction failed! Check console for details.");
        } finally {
            setIsLoadingBid(false);
        }
    }


    const getUSDbalance = async () => {
        const balance = await getBalance(auctionMoneyToken, account.address)
        setUSDBalance(BigNumConv(balance))
    }

    
    const pactFinancialInformation = () => {
        let rewardInterest = 0;
        let rewards = 0;
        const currentTimestamp = Date.now() / 1000;
        // Calcola l'interesse sui reward non scaduti
        for (let i = 0; i < pactInfo.rewardMaturity.length; i++) {
            if (pactInfo.rewardMaturity[i] > currentTimestamp) {
                rewards++;
                rewardInterest += (+BigNumConv(pactInfo.interest));
            }
        }
        // Moltiplicatore per la quantità di pact
        const moltiplicator = +auctionInfo.amount.toString();
        // Moltiplica il rewardInterest e la sizeLoan per la quantità di pact
        rewardInterest = rewardInterest * moltiplicator;
        const totalRepay = rewardInterest + (+BigNumConv(pactInfo.sizeLoan) * moltiplicator);
        // Calcola l'APR
        const apr = ((totalRepay - (+BigNumConv(pactInfo.sizeLoan) * moltiplicator)) / (+BigNumConv(pactInfo.sizeLoan) * moltiplicator)) * 100;
        // Imposta le informazioni finali
        const info = {
            totalRepay: totalRepay,
            apr: apr,
            rewards: rewards
        };
        setFinanceInfo(info);
    }

    const pactFinancialInformationOnAuction = () => {
        //totale di rimborso
        financInfo.totalRepay
        // ppuntata
        BigNumConv(auctionInfo.pot)

        const diffAtExpired = financInfo.totalRepay - (+BigNumConv(auctionInfo.pot))

        const apr = (diffAtExpired / financInfo.totalRepay) * 100;
        let sign = ''
        let color = ''
        if (apr < 0) {
            sign = '-'
            color = 'text-red-500 font-semibold'
        } else {
            sign = '+'
            color = 'text-green-500 font-semibold'
        }

        // Imposta le informazioni finali
        //const info = {
        //    diffAtExpired: diffAtExpired,
        //    apr: apr,
        //    sign: sign,
        //    color: color,
        //};
        //setFinanceInfoFinal(info);
    }

    const fetchData = async () => {
        try {
            const _auctionInfo = await showDownAuction(id)
            setAuctionInfo(_auctionInfo)
            const _feeSystem = await showDownFeesSystem()
            setFeeSystem(_feeSystem)
            const dataPact = await pactDetails(_auctionInfo[1].toString())
            setPactInfo(dataPact)
            setSizeLot(+_auctionInfo.amount.toString() * (+BigNumConv(dataPact.sizeLoan)))
            if (+BigNumConv(_auctionInfo.pot) > 0) {
                setAmountBet((+BigNumConv(_auctionInfo.pot) * 100.1) / 100)
            } else {
                setAmountBet(0)
            }
            if (+BigNumConv(_auctionInfo.pot) > 0) {
                setAmountBet((+BigNumConv(_auctionInfo.pot) * 100.1) / 100)
            } else {
                setAmountBet(0)
            }
            const _tokenData = await srcTokenData(dataPact.tokenLoan)
            setTokenData(_tokenData)

            if (+(BigNumConv(_auctionInfo.pot)) == 0) {
                const val = calcPercFromBasisPoints(BigNumConv(_auctionInfo.startPrice), +(_auctionInfo.tolleratedDiscount.toString()))
                setValTolerance(val)
            } else {
                const val = calcPercFromBasisPoints(BigNumConv(_auctionInfo.pot), +(_auctionInfo.tolleratedDiscount.toString()))
                setValTolerance(val)
            }
            //const _events = await betListForDownAuction(null, 0, null)
            //const reversEvents = _events.slice().reverse()
            const _events = await requestNewInstalmentDown(id)
            setEvents(_events)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        if (pactInfo) {
            pactFinancialInformation()
        }
    }, [pactInfo])

    useEffect(() => {
        if (pactInfo) {
            pactFinancialInformationOnAuction()
        }
    }, [financInfo])
    const RenderStatus = () => {
        if (auctionInfo.open) {
            return (
                <span className='text-green-500 font-semibold'>
                    Open
                </span>
            )
        } else {
            <span className='text-red-600 font-semibold'>
                Close
            </span>
        }
    }
    useEffect(() => {
        //fetchUseEffect(amountBet.toFixed(3))
        if (feeSystem) {
            calcData()
        }
        //fetchBetEvents()

    }, [amountBet])


    useEffect(() => {
        fetchData()
        getUSDbalance()
    }, [account])

    const handleInputChange = (e) => {

        const value = parseInt(e.target.value, 10);
        if (!isNaN(value) && value >= 0) {
            setAmountBet(value);
        }
    };
    const addValue = () => {
        setAmountBet((prevQty) => prevQty + 1);
    };
    const subValue = () => {
        setAmountBet((prevQty) => (prevQty > 0 ? prevQty - 1 : 0)); // Evita valori negativi
    };


    const RenderTable = () => {
        if (events.length == 0) {
            return (
                <>
                    <div className="overflow-x-auto">
                        <h2 className='text-xl font-semibold'>Not Activities</h2>
                    </div>
                </>
            )
        }
        return (
            <>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y-2 divide-gray-700 bg-slate-800 text-sm rounded-lg">
                        {/* Intestazione della tabella */}
                        <thead className="ltr:text-left rtl:text-right">
                            <tr>
                                <th className="whitespace-nowrap px-4 py-3 font-semibold text-gray-200 bg-slate-700">Pot</th>
                                <th className="whitespace-nowrap px-4 py-3 font-semibold text-gray-200 bg-slate-700">Bidder</th>
                                {/* <th className="whitespace-nowrap px-4 py-3 font-semibold text-gray-200 bg-slate-700">Block Number</th>*/}
                            </tr>
                        </thead>
                        {/* Corpo della tabella */}
                        <tbody className="divide-y divide-gray-700">
                            {events.map((item, index) => (
                                <tr key={index} className="hover:bg-slate-700 transition-colors duration-200">
                                    {/* Colonna Pot */}
                                    <td className="whitespace-nowrap px-4 py-3 text-gray-300">
                                        {+(BigNumConv(item.amountPot))} mdai
                                    </td>
                                    {/* Colonna Player */}
                                    <td className="whitespace-nowrap px-4 py-3 text-gray-300">
                                        {renderAddress(item.player)}
                                    </td>
                                    {/* Colonna Block Number */}
                                    {/*
                                        <td className="whitespace-nowrap px-4 py-3 text-gray-300">
                                        {+(item.blockNumber.toString())}
                                    </td>
                                    */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </>
        );
    };


    return (
        <div className="py-4">
            <div className="flex flex-col items-center justify-center p-8  text-gray-200">
                <h1 className="text-3xl font-bold mb-4">Downward Auction #{id}</h1>
                <p className="text-gray-300 text-lg text-center mb-8">
                    In this section, find all auction details and gain clarity before participating. You can also review the Pact&apos;s specifications.
                </p>


                <div className="w-full max-w-3xl font-semibold bg-slate-700 rounded-lg p-6">
                    <h3 className="text-2xl font-bold mb-4">How It Works</h3>
                    <ul className="list-disc list-inside space-y-3 text-base text-gray-300">
                        <li>
                            Approve the auction contract to spend your tokens this enables you to place your bid.
                        </li>
                        <li>
                            Your tokens will remain locked in the contract until another user places a higher bid.
                        </li>
                        <li>
                            If you win the auction, you or the seller must close it. Once closed, you can withdraw your Pacts.
                        </li>
                        <li>
                            Upon closing, your winning bid amount is transferred to the seller.
                        </li>
                        <li>
                            Check and manage your locked funds from the{' '}
                            <Link to="/app.ironFall/manager" className="text-blue-400 underline hover:text-blue-300">
                                Auction Manager
                            </Link>{' '}
                            section, where you can also withdraw any available balance.
                        </li>
                    </ul>
                    <p className="mt-6 text-yellow-400 text-sm">
                        ⚠️ Please make sure you understand the process before bidding. Your funds will be locked until you are either outbid or the auction is closed.
                    </p>
                </div>







            </div>
            <div className="flex flex-col lg:flex-row gap-6 p-6">
                {/* Left Column: Image or Placeholder */}
                <div className="flex-1 bg-slate-700 rounded-lg p-4">
                    <div className="h-full bg-slate-600 rounded-md">
                        <img alt='Imagine a Pact Image Here' src={pactAuctionImg} />
                    </div>
                </div>
                {/* Right Column: Auction Details */}
                <div className="flex-1 bg-slate-700 rounded-lg p-6">
                    <h3 className="text-2xl font-semibold text-gray-100 mb-4">Auction #{id} Status: {auctionInfo && RenderStatus()}</h3>
                    <h3 className="text-xl font-semibold text-gray-100 mb-4">CountDown: <Countdown targetTimestamp={auctionInfo ? +auctionInfo.expired.toString() : 0} /></h3>
                    <div className="text-gray-300 text-lg space-y-6">
                        {/* Pact Information */}
                        <div className="text-gray-300 text-lg space-y-6">
                            {/* Auction Information */}
                            <div className="border-b-2 pb-4">
                                <h4 className="text-xl font-semibold text-gray-200 mb-2">Auction Information</h4>
                                <div className="flex justify-between">
                                    <p><strong>Floor Price:</strong></p>
                                    <p>{auctionInfo && BigNumConv(auctionInfo.startPrice)} mDai</p>
                                </div>
                                <div className="flex justify-between">
                                    <p><strong>Pot:</strong></p>
                                    <p>{auctionInfo && BigNumConv(auctionInfo.pot)} mDai</p>
                                </div>
                                <div className="flex justify-between">
                                    <p><strong>Drop Discount:</strong></p>
                                    <p>{auctionInfo && valTolerance} mDai</p>
                                </div>
                                <div className="flex justify-between">
                                    <p><strong>Drop Discount %:</strong></p>
                                    <p>{auctionInfo && +(auctionInfo.tolleratedDiscount.toString()) / 100} %</p>
                                </div>
                                <div className="flex justify-between">
                                    <p><strong>Amount of Pacts:</strong></p>
                                    <p>{auctionInfo && auctionInfo.amount.toString()} units</p>
                                </div>
                            </div>
                            {/* Lot Information */}
                            <div className="mt-6 border-b-2 pb-4">
                                <h4 className="text-xl font-semibold text-gray-200 mb-2">Pact Information</h4>
                                <div className="flex justify-between">
                                    <p><strong>Accrued Interest Entitlement per Pact:</strong></p>
                                    <p>{financInfo && financInfo.rewards}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p><strong>Total Size Pact:</strong></p>
                                    <p>{sizeLot && sizeLot} {tokenData && tokenData.ticker}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p><strong>Total and Interest Settlement::</strong></p>
                                    <p>{financInfo && financInfo.totalRepay} {tokenData && tokenData.ticker}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p><strong>Projected Yield on Nominal Value:</strong></p>
                                    <p>{financInfo && financInfo.apr}%</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-green-500 text-lg font-medium space-y-6 mt-4 ">
                        <label>Balance user: {usdBalance ? Number(usdBalance).toFixed(2) : "/"} mDai</label>
                    </div>

                    <div className="mt-6">
                        <label className="block text-sm text-gray-200 mb-2">Amount to Allocate in Pot</label>
                        <div className="flex items-center space-x-2">
                            <button
                                className="bg-gray-700 text-white font-bold rounded-l-md px-4 py-2 bg-red-500 hover:bg-red-800"
                                onClick={subValue}
                            >
                                -
                            </button>
                            <input
                                type="number"
                                className="w-full px-4 py-2 bg-gray-600 text-gray-200 border border-gray-500 rounded-md no-spinner"
                                placeholder="Enter amount"
                                onChange={handleInputChange}
                                value={amountBet}
                                min={0}
                            />
                            <button
                                className="bg-gray-700 text-white font-bold rounded-r-md px-4 py-2  bg-green-500 hover:bg-green-800"
                                onClick={addValue}
                            >
                                +
                            </button>
                        </div>
                        {/* Amount Details */}
                        <div className="mt-4 text-sm text-yellow-400">
                            <p>
                                Bet:{" "}
                                <span className="font-bold">
                                    {netAmountBet} mdai
                                </span>
                            </p>
                            <p>
                                Fee:{" "}
                                <span className="font-bold">
                                    {feeAmount} mdai
                                </span>
                                <span data-tip data-for="feeInfo" className="ml-2 cursor-pointer" onClick={() => { if (!infoFee) { setInfoFee(true) } else { setInfoFee(false) } }}>{infoFee ? "X" : "?"}</span>
                                {/*infoFee && <RenderFeeInfo />*/}
                                <span data-tip data-for="feeInfo" className="ml-2 cursor-pointer" ></span>
                            </p>
                        </div>
                        {/* Play Button Below the Input */}
                        <button
                            onClick={instalmentInPot}
                            disabled={isLoadingBid}
                            className={`flex items-center justify-center w-full py-2 px-4 rounded-md mt-4 text-white transition-colors duration-300 ease-in-out ${isLoadingBid
                                ? "bg-gray-500 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700"
                                }`}
                        >
                            {isLoadingBid ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                                    </svg>
                                    Processing...
                                </>
                            ) : (
                                "Place Bid"
                            )}
                        </button>


                        <div>
                            {/* Close Auction Button */}
                            <button
                                disabled={isLoadingCls}
                                onClick={async () => {
                                    setIsLoadingCls(true);
                                    try {
                                       await closeDownAuction(id, signer);
                                        alert(`Auction closed successfully!`);
                                    
            
                                    } catch (error) {
                                        console.error("Transaction failed:", error);
                                        alert("Transaction failed! Check console for details.");
                                    } finally {
                                        setIsLoadingCls(false);
                                    }
                                }}
                                className={`flex items-center justify-center w-full py-2 px-4 rounded-md mt-4 text-white transition-colors duration-300 ease-in-out ${isLoadingCls
                                    ? "bg-gray-500 cursor-not-allowed"
                                    : "bg-orange-600 hover:bg-orange-700"
                                    }`}
                            >
                                {isLoadingCls ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8v8z"
                                            ></path>
                                        </svg>
                                        Processing...
                                    </>
                                ) : (
                                    "Close Auction"
                                )}
                            </button>

                            {/* Withdraw Auctioned Pacts Button */}
                            <button
                                disabled={isLoadingWit}
                                onClick={async () => {
                                    setIsLoadingWit(true);
                                    try {
                                        await withDrawPactDownAuction(id, signer);
                                        alert(`Withdraw auctioned pacts successfully!`);
                                     
                                    } catch (error) {
                                        console.error("Transaction failed:", error);
                                        alert("Transaction failed! Check console for details.");
                                    } finally {
                                        setIsLoadingWit(false);
                                    }
                                }}
                                className={`flex items-center justify-center w-full py-2 px-4 rounded-md mt-4 text-white transition-colors duration-300 ease-in-out ${isLoadingWit
                                    ? "bg-gray-500 cursor-not-allowed"
                                    : "bg-red-600 hover:bg-red-700"
                                    }`}
                            >
                                {isLoadingWit ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8v8z"
                                            ></path>
                                        </svg>
                                        Processing...
                                    </>
                                ) : (
                                    "With Draw Auctioned Pacts"
                                )}
                            </button>
                        </div>

                    </div>
                    {/* Bet History Section */}
                    <div className="mt-6 bg-gray-600 rounded-lg p-4">
                        <h4 className="text-xl font-semibold text-gray-100 mb-4">Bet History</h4>
                        <div className="text-gray-300 text-sm">
                            {events && <RenderTable />}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );


}