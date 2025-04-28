import {
    InformationCircleIcon,
    LockClosedIcon,
    DocumentMagnifyingGlassIcon,
    UserCircleIcon,
} from '@heroicons/react/24/solid';

export const InfoManagerAuction = () => {
    return (
        <div className="w-full space-y-5 text-white p-6 rounded-lg shadow-lg bg-slate-700 bg-opacity-60 border border-gray-600">
            <h2 className="text-2xl font-bold text-blue-400 flex items-center space-x-2 mb-4">
                <InformationCircleIcon className="h-6 w-6 text-blue-400" />
                <span>Manage Your Auctions</span>
            </h2>

            <div className="flex items-start space-x-3">
                <LockClosedIcon className="h-6 w-6 text-cyan-400 mt-1" />
                <p>
                    <strong>Your Tokens</strong> shows:
                    <br />
                    • <strong>Available:</strong> withdrawable DAI from sales or expired auctions.
                    <br />
                    • <strong>Locked:</strong> funds in active bids (unlocked if outbid or after win).
                </p>
            </div>

            <div className="flex items-start space-x-3">
                <DocumentMagnifyingGlassIcon className="h-6 w-6 text-green-400 mt-1" />
                <p>
                    In <strong>Auction Details</strong> you can:
                    <br />
                    • Close expired auctions.
                    <br />
                    • Withdraw unsold Pacts.
                </p>
            </div>

            <div className="flex items-start space-x-3">
                <UserCircleIcon className="h-6 w-6 text-yellow-400 mt-1" />
                <p>
                    Auctions can be closed by <strong>Seller, Winner</strong> or <strong>Admin</strong>.
                    <br />
                    Once closed, assets become claimable by rightful users.
                </p>
            </div>
        </div>
    );
};
