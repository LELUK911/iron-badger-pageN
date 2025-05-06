import { BigNumConv, convertSecondsToUTC, renderAddress } from "../../../utils/helper/helper"
import { Link } from "react-router-dom"


// eslint-disable-next-line react/prop-types
export const AuctionCard = ({ auction, auctionId }) => {

    return (
        <>
         <div className="w-72 mx-auto">
    <Link to={`/app.ironRise/UpwardAuctionId/${auctionId}`}>
        <div
            className="relative bg-gray-900/50 backdrop-blur-xl rounded-2xl p-8 border border-gray-800 transition duration-300 ease-in-out 
                       hover:border-orange-400 hover:ring-2 hover:ring-orange-400 hover:shadow-[0_0_25px_#f97316aa]"
        >
            {/* Orange borders agli angoli */}
            <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-orange-500 rounded-tl-2xl" />
            <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-orange-400 rounded-tr-2xl" />
            <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-orange-500 rounded-bl-2xl" />
            <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-orange-500 rounded-br-2xl" />

            {/* Contenuto */}
            <div className="relative">
                <div className="absolute -top-12 left-0 px-6 py-2 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full text-sm text-black font-bold">
                    Expiration: {convertSecondsToUTC(+(auction[4].toString()))}
                </div>

                <h2 className="text-3xl font-bold mb-2 text-white">Auction # {auctionId}</h2>
                <h3 className="text-2xl font-semibold mb-1 text-transparent bg-clip-text bg-gradient-to-t from-yellow-300 via-orange-400 to-red-500">
                    Pact Id: {auction[1].toString()}
                </h3>
                <h3 className="text-2xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-t from-yellow-400 via-orange-400 to-red-400">
                    Amount: {auction[2].toString()}
                </h3>

                <div className="flex flex-col gap-4 mb-8 text-gray-100">
                    <div className="flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-pink-500/10 to-yellow-500/10 border border-gray-700">
                        <p className="font-semibold">Floor Price:</p>
                        <span className="ml-2 text-gray-200">{BigNumConv(auction[3])} DAI</span>
                    </div>
                    <div className="flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-pink-500/10 to-yellow-500/10 border border-gray-700">
                        <p className="font-semibold">Current Highest Bid:</p>
                        <span className="ml-2 text-gray-200">{BigNumConv(auction[5])} DAI</span>
                    </div>
                    <div className="flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-pink-500/10 to-yellow-500/10 border border-gray-700">
                        <p className="font-semibold">Highest Bidder:</p>
                        <span className="ml-2 text-gray-200">{renderAddress(auction[6])}</span>
                    </div>
                </div>
            </div>
        </div>
    </Link>
</div>

        </>
    )

}
