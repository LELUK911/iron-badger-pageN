export const DownWardAuctionDoc = () => {
    return (
        <div className="p-6 bg-slate-800 text-white rounded-lg">
            <h2 className="text-3xl font-bold mb-4">Auction Management</h2>
    
            <p className="mb-4">
                Once an auction is created, the seller can manage it from the <strong>“Auction Manager”</strong>
                section. By selecting the desired Pact, users can access a detailed
                auction management panel.
            </p>
    
            <h3 className="text-2xl font-semibold mb-3">Auction Details:</h3>
            <ul className="list-disc list-inside space-y-2">
                <li><strong>Pact ID:</strong> Unique identifier of the Pact listed in the auction.</li>
                <li><strong>Current Leading Bidder:</strong> The address of the user currently leading the auction (initially corresponds to the seller).</li>
                <li><strong>Units Listed:</strong> Quantity of Pact units available for bidding.</li>
                <li><strong>Current Bid:</strong> The highest active bid in the auction.</li>
                <li><strong>Tolerance Discount:</strong> Current percentage tolerance for bid reductions.</li>
                <li><strong>Set New Tolerance:</strong> Allows the seller to adjust the tolerance level.</li>
                <li><strong>Starting Price:</strong> Initial price set by the seller.</li>
                <li><strong>Status:</strong> Indicates whether the auction is <strong>Open</strong> or <strong>Closed</strong>.</li>
                <li><strong>Expiration:</strong> Auction end date.</li>
                <li><strong>Countdown:</strong> Countdown timer until auction expiration.</li>
                <li><strong>Penalties List:</strong> Overview of accumulated penalties.</li>
            </ul>
    
            <h3 className="text-2xl font-semibold mt-6 mb-3">Available Actions:</h3>
            <ul className="list-disc list-inside space-y-2">
                <li>
                    <strong>Close Auction:</strong> Finalizes the auction, transferring ownership of the Pact
                    to the highest bidder and allocating the bid amount to the seller.
                </li>
                <li>
                    <strong>Withdraw Pact:</strong> Allows the seller to reclaim the listed Pacts if no
                    bids have been placed.
                </li>
                <li>
                    <strong>Set New Tolerance:</strong> Adjusts the tolerance percentage for price reduction.
                    <span className="italic">(*This action incurs a penalty.)</span>
                </li>
                <li>
                    <strong>Emergency Close:</strong> Immediately terminates the auction.
                    <span className="italic">(*This action incurs a penalty.)</span>
                </li>
            </ul>
    
            <p className="mt-4">
                Additionally, in the <strong>“Auction Manager”</strong> section, to the right of the Pact selection box,
                there is a <strong>“Withdraw Funds”</strong> button. This allows the seller to retrieve all or part of their
                <strong>available balance</strong>, including any proceeds earned from the auction.
            </p>
        </div>
    );
    
}
