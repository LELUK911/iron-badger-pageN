import { useEffect, useState } from "react"
import { AuctionCardManager } from "./AuctionCardManager"
import { showAuctionsList, showUserBalanceFree, showUserBalanceLock, withdrawMoneyUpAuction } from "../../../utils/BlockchainOperation/IronRiseOp"
import { BigNumConv, NumConvBig } from "../../../utils/helper/helper"
import { useAccount } from "wagmi"
import { useEthersSigner } from "../../../utils/helper/ClientToSigner"
import { InfoManagerAuction } from "./InfoManagerAuction"




export const ManagerAuction = () => {
    const [auctionList, setAuctionList] = useState([])
    const [auctionIndex, setAuctionIndex] = useState('')
    const [cardElement, setCardElement] = useState(null)
    // eslint-disable-next-line no-unused-vars
    const [userBalance, setUserBalance] = useState('0')
    const [userLockBalance, setLockBalance] = useState('0')
    const [withAmount, setWithAmount] = useState(0)
    const account = useAccount()
    const signer = useEthersSigner()

    const [isLoading, setIsLoading] = useState(false);
    const [, setTxHash] = useState(null);


    const fetchData = async () => {
        try {
            const _auctionList = await showAuctionsList()
            const readableAuctionList = _auctionList.map(item => ({
                owner: item[0],
                id: item[1],
                amount: item[2],
                startPrice: item[3],
                expired: item[4],
                pot: item[5],
                player: item[6],
                open: item[7]
            }));

            const _auctionListForUser = readableAuctionList
                .map((item, index) => {
                    if (item.owner === account.address) {
                        return { ...item, auctionIndex: index };
                    }
                    return null;
                })
                .filter(Boolean);
            setAuctionList(_auctionListForUser)

            if (_auctionListForUser[0]) {
                setCardElement(_auctionListForUser[0])
                setAuctionIndex[_auctionListForUser[0].auctionIndex]
            }
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        if (account.address) {
            fetchData()
        }
    }, [account])

    const fetchBalance = async () => {
        if (account.address) {
            try {
                const balance = await showUserBalanceFree(account.address)
                const lockBalance = await showUserBalanceLock(account.address)
                const freeBalance = (+(balance.toString())) - (+(lockBalance.toString()))
                setUserBalance(BigNumConv(freeBalance))
                setLockBalance(BigNumConv(lockBalance))
                setWithAmount(BigNumConv(freeBalance))
            } catch (error) {
                console.error(error)
            }
        }
    }

    const withDrawTokenMoney = async () => {
        if (account.address) {
            setIsLoading(true);
            try {
                const _withAmount = NumConvBig(withAmount)
                const tx = await withdrawMoneyUpAuction(_withAmount, signer)
                setTxHash(tx)
                alert(`Tx submitted -> ${tx}`);
            } catch (error) {
                console.error("Transaction failed:", error);
                alert("Transaction failed! Check console for details.");
            } finally {
                setIsLoading(false);
            }
        }
    }

    const handleOnChangeAuctionId = (e) => {
        setAuctionIndex(+e.target.value)
        const _cardElement = auctionList.find((item) => item.auctionIndex === +e.target.value)
        setCardElement(_cardElement)
    }

    const handleOnChangeWithAmount = (e) => {
        setWithAmount(+e.target.value)
    }

    return (
        <div className="flex flex-col p-4 sm:p-8 space-y-8 text-gray-100 shadow-lg rounded-lg min-h-screen">
            {/* Titolo principale */}
            <div className="mb-4 text-center sm:text-left">
                <h1 className="font-bold text-3xl">Auction Manager Section</h1>
            </div>
            <InfoManagerAuction/>
            {/* Your Token Section */}
            <div className="space-y-6">
                <h3 className="font-bold text-xl">Your Token Section</h3>
                <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row items-center sm:space-x-4 space-y-4 sm:space-y-0">
                        <div className="flex items-center space-x-2">
                            <label className="font-semibold">Locked Balance:</label>
                            <p>{userLockBalance} mdai</p>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center sm:space-x-2 space-y-2 sm:space-y-0">
                            <label className="font-semibold">Available Balance:</label>
                            <input
                                type="number"
                                value={withAmount}
                                onChange={handleOnChangeWithAmount}
                                className="w-full sm:w-48 px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100 placeholder-gray-500"
                                placeholder="Enter Balance"
                            />
                        </div>
                        <div className="flex flex-col sm:flex-row items-center sm:space-x-2 space-y-2 sm:space-y-0">
                            <button
                                onClick={fetchBalance}
                                className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-2 px-4 rounded-lg shadow-lg transform transition-transform duration-300 ease-in-out hover:scale-105 hover:brightness-110 active:scale-95"
                            >
                                Show Balance
                            </button>
                            <button
                                onClick={withDrawTokenMoney}
                                disabled={isLoading}
                                className={`flex items-center justify-center w-full sm:w-auto py-2 px-4 font-bold rounded-lg shadow-lg transform transition-transform duration-300 ease-in-out ${isLoading
                                        ? "bg-gray-500 cursor-not-allowed"
                                        : "bg-gradient-to-r from-green-500 to-green-700 hover:to-green-800 hover:scale-105 hover:brightness-110 active:scale-95"
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
                                    "Withdraw"
                                )}
                            </button>

                        </div>
                    </div>
                </div>
            </div>

            {/* Forge Section */}
            <div className="flex flex-col justify-center items-center p-4 sm:p-6">
                <div className="space-y-8 bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-lg">
                    {/* Titolo */}
                    <div className="text-center">
                        <h3 className="font-bold text-2xl text-gray-100">Auction Details</h3>
                    </div>

                    {/* Pacts in the Furnace Section */}
                    <div className="space-y-4">
                        <label
                            className="block text-lg font-medium text-gray-300 mb-2"
                            htmlFor="debtor"
                        >
                            Auction #
                            <button
                                onClick={fetchData}
                                className="mx-4 w-full sm:w-auto bg-gradient-to-r text-sm from-yellow-500 to-yellow-700 hover:to-yellow-800 text-white font-bold py-1 px-2 rounded-lg shadow-lg transform transition-transform duration-300 ease-in-out hover:scale-105 hover:brightness-110 active:scale-95"
                            >
                                Refresh
                            </button>
                        </label>

                        <select
                            onChange={handleOnChangeAuctionId}
                            value={auctionIndex}
                            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100"
                        >
                            <option value="" disabled>
                                /
                            </option>
                            {auctionList.map((item) => (
                                <option key={item.auctionIndex} value={item.auctionIndex}>
                                    {item.auctionIndex}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Auction Card Manager */}
                    <div>
                        {cardElement && <AuctionCardManager auction={cardElement} />}
                    </div>
                </div>
            </div>
        </div>
    );



}
