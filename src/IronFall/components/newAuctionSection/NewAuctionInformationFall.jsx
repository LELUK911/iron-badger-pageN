import { ClipboardDocumentListIcon, CurrencyDollarIcon, ArrowUpCircleIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

export const NewAuctionInformationFall = () => {
    return (
        <div className="flex justify-center items-center my-10">
            <div className="w-full md:w-2/3 lg:w-1/2 space-y-5 text-white p-6 rounded-lg shadow-lg bg-slate-700 bg-opacity-60 border border-gray-600">
                <h2 className="text-2xl font-bold text-blue-400 flex items-center space-x-2 mb-4">
                    <ClipboardDocumentListIcon className="h-6 w-6 text-blue-400" />
                    <span>Create a New Auction</span>
                </h2>

                {/* Instructions */}
                <div className="flex items-start space-x-3">
                    <ArrowUpCircleIcon className="h-6 w-6 text-cyan-400 mt-1" />
                    <p>
                        Only Pacts purchased on
                        <Link to="/app.ironForge/market" className="text-blue-400 underline mx-1">Iron Forge</Link>,
                        <Link to="/app.ironRise/newauction" className="text-blue-400 underline mx-1">Iron Rise</Link>, or
                        <Link to="/app.ironfall/auction" className="text-blue-400 underline mx-1">Iron Fall</Link>
                        can be listed for sale in the auction.
                    </p>
                </div>

                {/* Form Information */}
                <div className="flex items-start space-x-3">
                    <CurrencyDollarIcon className="h-6 w-6 text-green-400 mt-1" />
                    <p>
                        Select the Pact and complete the form.
                        <br />
                        <span className="text-gray-300">Price:</span> Set in DAI, and it refers to the total lot value.
                        <br />
                        <span className="text-gray-300">Auction Duration:</span> Minimum of 7 days.
                        <br />
                        <span className="text-gray-300">Drop Tolerance:</span> Defines the maximum % price drop allowed during the auction.
                    </p>
                </div>

                {/* Create Auction */}
                <div className="flex items-start space-x-3">
                    <ClipboardDocumentListIcon className="h-6 w-6 text-yellow-400 mt-1" />
                    <p className="text-gray-300 leading-relaxed">
                        Before you can create your first auction, you’ll need to <span className="text-yellow-400 font-semibold">authorize</span> the platform to manage your Pact NFTs.
                        <br />
                        This is a <span className="italic">one-time transaction</span> that allows the contract to interact with your assets.
                        <br />
                        After this step, you’ll be able to freely create new auctions.
                    </p>
                </div>

            </div>
        </div>
    )

}
