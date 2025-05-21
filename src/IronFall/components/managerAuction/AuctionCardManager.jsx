import { BigNumConv, calcPercFromBasisPoints, calculateExpired, renderAddress } from "../../../utils/helper/helper"
import { changeTolleratedDiscountTX, closeDownAuction, emergencyCloseDownAuction, withDrawPactDownAuction } from "../../../utils/BlockchainOperation/IronFall"
import { useState } from "react"
import { Countdown } from "../../../utils/helper/CountDown"
import { useEthersSigner } from "../../../utils/helper/ClientToSigner"
import { toast } from "react-toastify"

export const AuctionCardManager = ({ auction }) => {
    const [dropValueToken, setDropValueToken] = useState(0)
    const [dropPerc, setDropPerc] = useState(0)

    const signer = useEthersSigner()



    useState(() => {
        setDropPerc(+auction.tolleratedDiscount.toString())
        const _dropValueToken = calcPercFromBasisPoints(auction.pot.toString(), +auction.tolleratedDiscount.toString())
        setDropValueToken(BigNumConv(_dropValueToken))
    }, [])



    if (!auction) {
        return (
            <>
                <div className="m-12 bg-gray-700 max-w-[600px] rounded-xl hover:bg-gray-900 hover:scale-110 duration-700 p-5">
                    <h2>Loding</h2>
                </div>
            </>)
    }

    const closeAuction = async () => {
        try {
            const tx = await closeDownAuction(auction.auctionIndex, signer)
            if(tx != false){
                toast.success(`Auction Close transaction submitted`)
            }else{
                toast.error(`Auction Close transaction failed`)
            }
        } catch (error) {
            console.error(error)
            toast.error(`Transaction failed! ${error}`)

        }
    }


    const emergencyCloseAuction = async () => {
        try {
            const tx = await emergencyCloseDownAuction(auction.auctionIndex, signer)
            if(tx != false){
                toast.success(`Emergency Auction Close transaction submitted`)
            }else{
                toast.error(`Emergency Auction Close transaction failed`)
            }
        } catch (error) {
            console.error(error)
            toast.error(`Transaction failed! ${error}`)
        }
    }





    const changeTolleratedDiscountOP = async () => {
        try {
            const tx = await changeTolleratedDiscountTX(auction.auctionIndex, dropPerc, signer)
            if(tx != false){
                toast.success(`Change Tollerated Discount transaction submitted`)
            }else{
                toast.error(`Change Tollerated Discount transaction failed`)
            }
        } catch (error) {
            console.error(error)
            toast.error(`Transaction failed! ${error}`)
        }
    }


    const withDrawPact = async () => {
        try {
            const tx = await withDrawPactDownAuction(auction.auctionIndex, signer)
            if(tx != false){
                toast.success(`WithDraw Pact DownAuction transaction submitted`)
            }else{
                toast.error(`WithDraw Pact DownAuction transaction failed`)
            }
 
        } catch (error) {
            console.error(error)
            toast.error(`Transaction failed! ${error}`)
        }
    }

    const handleOnChangeDropPerc = (op) => {
        if (op === "+") {
            if (dropPerc < 10000) {
                setDropPerc(prev => prev + 1); // 0.01% -> 1 bps
            }
        } else if (op === "-") {
            if (dropPerc > 0) {
                setDropPerc(prev => prev - 1); // 0.01% -> 1 bps
            }
        }
    };

    const handleOnChangeDropPercDigit = (e) => {
        const input = e.target.value;
        // Permetti solo numeri e un singolo punto decimale
        const sanitizedValue = input.replace(/[^0-9.]/g, '');
        const numericValue = parseFloat(sanitizedValue);

        if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 100) {
            // Converti la percentuale in basis points
            setDropPerc(Math.round(numericValue * 100));
        } else {
            // Rendi il campo valido con un valore predefinito se necessario
            setDropPerc(10000); // ad esempio, 100% -> 10,000 bps
            console.log('Valore non valido:', input);
        }
    };



    return (
        <>
            <div className="m-12 bg-gray-700 max-w-[600px] rounded-xl hover:bg-gray-900 hover:scale-110 duration-700 p-6 space-y-6 shadow-lg">
                {/* Icona */}
                <div className="flex justify-center">
                    <figure className="w-12 h-12 p-3 bg-blue-800 rounded-full">
                        <svg width="24" height="24" fill="#FFFFFF">
                            <path d="M18.799 7.038c-.496-.535-.799-1.252-.799-2.038 0-1.656 1.344-3 3-3s3 1.344 3 3-1.344 3-3 3c-.146 0-.29-.01-.431-.031l-3.333 6.032c.475.53.764 1.231.764 1.999 0 1.656-1.344 3-3 3s-3-1.344-3-3c0-.583.167-1.127.455-1.587l-2.565-3.547c-.281.087-.58.134-.89.134l-.368-.022-3.355 6.069c.451.525.723 1.208.723 1.953 0 1.656-1.344 3-3 3s-3-1.344-3-3 1.344-3 3-3c.186 0 .367.017.543.049l3.298-5.967c-.52-.539-.841-1.273-.841-2.082 0-1.656 1.344-3 3-3s3 1.344 3 3c0 .617-.187 1.191-.507 1.669l2.527 3.495c.307-.106.637-.164.98-.164.164 0 .325.013.482.039l3.317-6.001zm-3.799 7.962c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1zm-6-8c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1z"></path>
                        </svg>
                    </figure>
                </div>

                {/* Titolo */}
                <h4 className="text-2xl font-bold text-white text-center">Auction #{auction.auctionIndex} Details</h4>

                {/* Dati */}
                <div className="space-y-4">
                    {[
                        { label: "Pact ID", value: auction.id.toString() },
                        { label: "Bidder", value: renderAddress(auction.player) },
                        { label: "Quantity", value: auction.amount.toString() },
                        { label: "Initial Price", value: `${BigNumConv(auction.startPrice)} mDai` },
                        { label: "Pot", value: `${BigNumConv(auction.pot)} mDai` },
                        { label: "Status", value: auction.open ? "Open" : "Closed" },
                        { label: "Expiration", value: calculateExpired(auction.expired.toString()) },
                    ].map((item, index) => (
                        <div key={index} className="flex justify-between items-center border-b border-gray-600 pb-2">
                            <span className="font-semibold text-white">{item.label}:</span>
                            <span className="text-slate-300">{item.value}</span>
                        </div>
                    ))}
                    <div className="flex justify-between items-center border-b border-gray-600 pb-2">
                        <span className="font-semibold text-white">Count Down:</span>
                        <span className="text-slate-300"><Countdown targetTimestamp={+(auction.expired.toString())} /></span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-600 pb-2">
                        <span className="font-semibold text-white">Penality:</span>
                        {auction.penality.map((item, index) => {
                            return (
                                <>
                                    <span key={index} className="text-slate-300"> {(+item.toString()) / 100} %</span>
                                </>
                            )
                        })}
                    </div>
                    <div>
                        <div className="flex justify-between items-center">
                            <p className="text-lg font-semibold text-white">Drop Tolerance:</p>
                            <span className="text-slate-300">{(+auction.tolleratedDiscount.toString()) / 100} %</span>
                            <span className="text-slate-300">{(+dropValueToken).toFixed(2)} mDai</span>
                        </div>
                        <div className="flex items-center space-x-2 mt-2">
                            <button
                                className="px-4 py-2 rounded-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white font-bold"
                                onClick={() => { handleOnChangeDropPerc('-') }} // Funzione per decrementare
                            >
                                -
                            </button>
                            <input
                                type="number"
                                className="w-20 px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-100 placeholder-gray-500 text-center no-spinner"
                                value={dropPerc / 100}
                                onChange={handleOnChangeDropPercDigit}
                            />
                            <button
                                className="px-4 py-2 rounded-full bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 text-white font-bold"
                                onClick={() => { handleOnChangeDropPerc('+') }} // Funzione per incrementare
                            >
                                +
                            </button>
                            <button
                                onClick={changeTolleratedDiscountOP}
                                className="ml-4 px-6 py-2 rounded-md bg-gradient-to-r from-rose-600 to-red-500 text-white font-bold hover:scale-105 transition-transform duration-300">
                                Set
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottoni */}
                <div className="pt-5 pb-2 flex justify-center gap-4">
                    <button
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow-md hover:bg-blue-700 hover:scale-105 transition-transform"
                        onClick={closeAuction}
                    >
                        Close Auction
                    </button>
                    <button
                        className="px-6 py-2 bg-gray-600 text-white rounded-lg font-semibold shadow-md hover:bg-gray-700 hover:scale-105 transition-transform"
                        onClick={withDrawPact}
                    >
                        Withdraw Pact
                    </button>
                </div>
                <div className="w-full flex justify-center gap-4">
                    <button
                        className="px-6 py-2 bg-red-600 text-white rounded-lg font-semibold shadow-md hover:bg-red-700 hover:scale-105 transition-transform"
                        onClick={emergencyCloseAuction}
                    >
                        Emergency Close
                    </button>
                </div>
            </div>
        </>

    )
}
