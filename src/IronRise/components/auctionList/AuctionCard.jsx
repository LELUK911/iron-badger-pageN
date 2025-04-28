import { useEffect, useState } from "react"
import { instalmentPot, ironRiseAddress, showFeesSystem } from "../../../utils/BlockchainOperation/IronRiseOp"
import { BigNumConv, convertSecondsToUTC, NumConvBig, renderAddress } from "../../../utils/helper/helper"
import { AuthorizeERC20 } from "../../../utils/components/window/AuthorizeERC20"
import { auctionMoneyToken } from "../../../utils/Information/constantPage"
import { Link } from "react-router-dom"
import { useAccount } from "wagmi"
import { useEthersSigner } from "../../../utils/helper/ClientToSigner"


// eslint-disable-next-line react/prop-types
export const AuctionCard = ({ auction, auctionId }) => {
    const [openBet, setOpenBet] = useState(false)
    const account = useAccount()
    const signer = useEthersSigner()


    const BetInPot = () => {
        const [betAmount, setBetAmount] = useState('');
        const [openAuthERC20, setOpenAuthERC20] = useState(false)
        const [feeSystem, setFeeSystem] = useState('')
        const [netAmount, setNetAmount] = useState(0)
        const [feeAmount, setFeeAmount] = useState(0)
        const [isLoading, setIsLoading] = useState(false);
        const [, setTxHash] = useState(null);

        const fetchData = async () => {
            const _feeSystem = await showFeesSystem()
            setFeeSystem(_feeSystem)
        }

        const calcData = () => {
            const priceThreshold = BigNumConv(feeSystem[1])
            const fixedFee = BigNumConv(feeSystem[0])
            const dinamicFee = feeSystem[2].toString()

            if (+priceThreshold >= betAmount) {
                setFeeAmount(fixedFee)
                setNetAmount(+betAmount - fixedFee)
            } else {
                const _amountFee = (+betAmount * (+dinamicFee / 100)) / 100;
                const _netAmount = +betAmount - _amountFee;
                setFeeAmount(_amountFee)
                setNetAmount(_netAmount)
            }
        }

        useEffect(() => {
            fetchData()
        }, [])

        useEffect(() => {
            if (betAmount) {
                calcData()
            }
        }, [betAmount])


        const bet = async () => {
            if (account.address) {
                setIsLoading(true)
                try {
                    const amountInWei = NumConvBig(betAmount)
                    const tx = await instalmentPot(auctionId, amountInWei, signer)
                    setTxHash(tx); 
                    alert(`Tx submitted -> ${tx}`);
                } catch (error) {
                    console.error("Transaction failed:", error);
                    alert("Transaction failed! Check console for details.");
                } finally {
                    setIsLoading(false);
                }
            } else {
                alert("Connect Wallet before bet")
            }
        }
        const isOpenAuth = () => {
            if (openAuthERC20) {
                setOpenAuthERC20(false)
            } else {
                setOpenAuthERC20(true)
            }
        }
        const closeModal = () => {
            setOpenBet(false);
        };
        const handleOnChangeBet = (e) => {
            setBetAmount(e.target.value)
        }

        const RenderAuthWi = () => {
            return (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="relative w-full flex items-center justify-center">
                        {/* Componente Autorizzazione */}
                        <AuthorizeERC20 contractAddress={ironRiseAddress} tokenAddress={auctionMoneyToken} amount={betAmount} setChange={isOpenAuth} />
                    </div>
                </div>
            )
        }

        return (
            <>
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                >
                    <div className="w-full md:w-2/5 bg-gradient-to-b from-slate-900 to-gray-800 text-white rounded-xl p-6 shadow-xl relative">
                        {/* Pulsante Chiudi */}
                        <button
                            className="absolute top-4 right-4 w-10 h-10 bg-gray-800 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition duration-300"
                            onClick={closeModal}
                            title="Close"
                        >
                            ✖
                        </button>

                        {/* Titolo */}
                        <div className="text-center mb-6">
                            <h3 className="font-extrabold text-2xl bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-transparent bg-clip-text">
                                Place a Bid
                            </h3>
                            <p className="text-sm text-gray-400">
                                Submit your bid to participate in the auction.
                            </p>
                        </div>

                        {/* Riepilogo */}
                        <div className="space-y-4 mb-6">
                            <p className="flex justify-between">
                                <span className="font-semibold">Pact ID:</span>
                                <span className="text-gray-300">{auction[1].toString()}</span>
                            </p>
                            <p className="flex justify-between">
                                <span className="font-semibold">Amount:</span>
                                <span className="text-gray-300">{auction[2].toString()}</span>
                            </p>
                            <p className="flex justify-between">
                                <span className="font-semibold">Current Highest Bid:</span>
                                <span className="text-gray-300">{BigNumConv(auction[5])} mDai</span>
                            </p>
                        </div>

                        {/* Input Box */}
                        <div className="mb-6">
                            <label
                                htmlFor="bidAmount"
                                className="block text-sm font-semibold text-gray-300 mb-2"
                            >
                                New Bid
                            </label>
                            <input
                                type="number"
                                id="bidAmount"
                                placeholder="Enter your bid"
                                min={0}
                                value={betAmount}
                                onChange={handleOnChangeBet}
                                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100 placeholder-gray-500"
                            />
                            <div className="text-yellow-400 pt-2 font-semibold">
                                <p className="text-sm">Net Bid: <span>{netAmount} mdai</span></p>
                                <p className="text-sm">Fee: <span>{feeAmount} mdai</span></p>
                            </div>
                        </div>

                        {/* Pulsanti */}
                        <div className="flex flex-col text-center space-y-4">
                            <button
                                onClick={bet}
                                disabled={isLoading}
                                className={`flex items-center justify-center w-full py-3 px-6 font-bold rounded-lg shadow-lg transform transition-all duration-500 ease-in-out ${isLoading
                                        ? "bg-gray-500 cursor-not-allowed"
                                        : "bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 hover:scale-105 hover:brightness-110 active:scale-95"
                                    } text-white`}
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
                                    "Submit Bid"
                                )}
                            </button>

                            <button
                                className="text-blue-500 font-bold underline hover:text-blue-700 transition-colors duration-300"
                                onClick={isOpenAuth}
                            >
                                Authorize Spending
                            </button>
                        </div>
                    </div>
                </div>

                {openAuthERC20 && <RenderAuthWi />}
            </>
        );


    };

    return (
        <>
            <div className="w-72 mx-auto">
                <div
                    className="relative bg-gray-900/50 backdrop-blur-xl rounded-2xl p-8 border border-gray-800"
                >
                    <div
                        className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-orange-500 rounded-tl-2xl"
                    ></div>
                    <div
                        className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-orange-400 rounded-tr-2xl"
                    ></div>
                    <div
                        className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-orange-500 rounded-bl-2xl"
                    ></div>
                    <div
                        className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-orange-500 rounded-br-2xl"
                    ></div>

                    <div className="relative">
                        <div
                            className="absolute -top-12 left-0 px-6 py-2 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full text-sm text-black font-bold"
                        >
                            Expiration: {convertSecondsToUTC(+(auction[4].toString()))}
                        </div>

                        <h2 className="text-3xl font-bold mb-2 text-white">Auction # {auctionId}</h2>
                        <h3
                            className="text-2xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-t from-pink-500 via-red-400 to-yellow-500"
                        >
                            Pact Id: {auction[1].toString()} <span>Amount: {auction[2].toString()}</span>
                        </h3>

                        <div className="flex flex-col gap-4 mb-8 text-gray-100">
                            <div className="flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-pink-500/10 to-yellow-500/10    border border-gray-700   ">
                                <p className="font-semibold">Floor Price:</p>
                                <span className="ml-2 text-gray-200">{BigNumConv(auction[3])} DAI</span>
                            </div>
                            <div className="flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-pink-500/10 to-yellow-500/10    border border-gray-700 ">
                                <p className="font-semibold">Current Highest Bid:</p>
                                <span className="ml-2 text-gray-200">{BigNumConv(auction[5])} DAI</span>
                            </div>
                            <div className="flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-pink-500/10 to-yellow-500/10   border border-gray-700 ">
                                <p className="font-semibold">Highest Bidder:</p>
                                <span className="ml-2 text-gray-200">{renderAddress(auction[6])}</span>
                            </div>
                        </div>

                        <div className="flex-row md:flex-col space-y-3 gap-10">
                            <Link
                                className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-t from-pink-500 via-red-400 to-yellow-500 hover:opacity-90 transition-opacity  font font-bold text-lg"
                                
                                to={`/app.ironRise/UpwardAuctionId/${auctionId}`}
                            >
                                Show Auction Page
                            </Link>
                        </div>
                    </div>
                </div>
                {openBet && <BetInPot />}
            </div>
        </>
    )

}
