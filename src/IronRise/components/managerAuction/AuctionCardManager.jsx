/* eslint-disable react/prop-types */
import { useState } from "react";
import { closeUpAuction, withDrawPactUpAuction } from "../../../utils/BlockchainOperation/IronRiseOp"
import { useEthersSigner } from "../../../utils/helper/ClientToSigner"
import { BigNumConv, calculateExpired, renderAddress } from "../../../utils/helper/helper"
import { Countdown } from "../../../utils/helper/CountDown";


export const AuctionCardManager = ({ auction }) => {
    const [isLoadingCls, setIsLoadingCls] = useState(false);

    const [isLoadingWit, setIsLoadingWit] = useState(false);

    const signer = useEthersSigner()
    if (!auction) {
        return (
            <>
                <div className="m-12 bg-gray-700 max-w-[600px] rounded-xl hover:bg-gray-900 hover:scale-110 duration-700 p-5">
                    <h2>Loding</h2>
                </div>
            </>)
    }

    const closeAuction = async () => {
        setIsLoadingCls(true);
        try {
            await closeUpAuction(auction.auctionIndex, signer)
            alert("Auction closed successfully!");
        } catch (error) {
            console.error("Transaction failed:", error);
            alert("Transaction failed! Check console for details.");
        } finally {
            setIsLoadingCls(false);
        }
    }

    const withDrawPact = async () => {
        setIsLoadingWit(true);
        try {
            await withDrawPactUpAuction(auction.auctionIndex, signer)
            alert("Pact withdrawn successfully!");
        } catch (error) {
            console.error("Transaction failed:", error);
            alert("Transaction failed! Check console for details.");
        } finally {
            setIsLoadingWit(false);
        }
    }

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
                        { label: "Participant", value: renderAddress(auction.player) },
                        { label: "Quantity", value: auction.amount.toString() },
                        { label: "Current Pot", value: `${BigNumConv(auction.pot)} mDai` },
                        { label: "Initial Price", value: `${BigNumConv(auction.startPrice)} mDai` },
                        { label: "Auction Status", value: auction.open ? "Open" : "Closed" },
                        { label: "Expiration Date", value: calculateExpired(auction.expired.toString()) },
                        {
                            label: "Time Remaining",
                            value: <Countdown targetTimestamp={+auction.expired.toString()} />
                        }
                    ].map((item, index) => (
                        <div key={index} className="flex justify-between items-center border-b border-gray-600 pb-2">
                            <span className="font-semibold text-white">{item.label}:</span>
                            <span className="text-slate-300">{item.value}</span>
                        </div>
                    ))}
                </div>

                {/* Bottoni */}
                <div className="pt-5 pb-2 flex justify-center gap-4">
                    {/* Close Auction Button */}
                    <button
                        disabled={isLoadingCls}
                        onClick={closeAuction}
                        className={`flex items-center justify-center px-6 py-2 rounded-lg font-semibold shadow-md transition-transform ${isLoadingCls
                                ? "bg-gray-500 cursor-not-allowed"
                                : "bg-blue-600 text-white hover:bg-blue-700 hover:scale-105"
                            }`}
                    >
                        {isLoadingCls ? (
                            <>
                                <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
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

                    {/* Withdraw Pact Button */}
                    <button
                        disabled={isLoadingWit}
                        onClick={withDrawPact}
                        className={`flex items-center justify-center px-6 py-2 rounded-lg font-semibold shadow-md transition-transform ${isLoadingWit
                                ? "bg-gray-500 cursor-not-allowed"
                                : "bg-gray-600 text-white hover:bg-gray-700 hover:scale-105"
                            }`}
                    >
                        {isLoadingWit ? (
                            <>
                                <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
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
                            "Withdraw Pact"
                        )}
                    </button>
                </div>

            </div>
        </>

    )
}
