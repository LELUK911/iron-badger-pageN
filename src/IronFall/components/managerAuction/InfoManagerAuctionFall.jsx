import {
    InformationCircleIcon,
    LockClosedIcon,
    WrenchScrewdriverIcon,
    ExclamationTriangleIcon,
    UserCircleIcon,
} from '@heroicons/react/24/solid';

export const InfoManagerAuctionFall = () => {
    return (
        <div className="w-full space-y-5 text-white p-6 rounded-lg shadow-lg bg-slate-700 bg-opacity-60 border border-gray-600">
            <h2 className="text-2xl font-bold text-blue-400 flex items-center space-x-2 mb-4">
                <InformationCircleIcon className="h-6 w-6 text-blue-400" />
                <span>Manage Your Falling Auctions</span>
            </h2>

            {/* Token Balance Info */}
            <div className="flex items-start space-x-3">
                <LockClosedIcon className="h-6 w-6 text-cyan-400 mt-1" />
                <p>
                    <strong>Your Tokens</strong> include:
                    <br />
                    • <strong>Available:</strong> DAI from completed or expired auctions.
                    <br />
                    • <strong>Locked:</strong> Funds currently in active bids (released if outbid or if the auction ends).
                </p>
            </div>

            {/* Auction Actions */}
            <div className="flex items-start space-x-3">
                <WrenchScrewdriverIcon className="h-6 w-6 text-green-400 mt-1" />
                <p>
                    In <strong>Auction Details</strong> you can:
                    <br />
                    • Close expired auctions.
                    <br />
                    • Withdraw unsold Pacts.
                    <br />
                    • Increase Drop Tolerance <span className="text-gray-400">(penalty applies)</span>.
                    <br />
                    • Trigger Emergency Close <span className="text-gray-400">(heavy penalty applies)</span>.
                </p>
            </div>

            {/* Penalties Info */}
            <div className="flex items-start space-x-3">
                <ExclamationTriangleIcon className="h-6 w-6 text-red-400 mt-1" />
                <p>
                    <strong>Penalties:</strong> Maximum of 6 tolerance changes and 1 emergency close per auction.
                    <br />
                    Always review penalty details in the final pot before proceeding.
                </p>
            </div>

            {/* Who Can Close */}
            <div className="flex items-start space-x-3">
                <UserCircleIcon className="h-6 w-6 text-yellow-400 mt-1" />
                <p>
                    Auctions can be closed by the <strong>Seller</strong>, <strong>Winner</strong>, or <strong>Admin</strong>.
                    <br />
                    Once closed, DAI and Pacts can be claimed by their rightful owners.
                </p>
            </div>
        </div>
    );

};
