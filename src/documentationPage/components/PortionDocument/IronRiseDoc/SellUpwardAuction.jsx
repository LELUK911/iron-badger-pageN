export const SellUpwardAuction = () => {
    return (
        <div className="p-6 bg-slate-800 text-white rounded-lg">
            <h2 className="text-3xl font-bold mb-4">Listing Auction Lots</h2>
    
            <p className="mb-4">
                Users can create an auction lot directly from the <strong>“Dashboard”</strong>
                section of <strong>Iron Pact</strong> or from the <strong>“New Auction”</strong> section
                within <strong>Iron Rise Auction</strong>.
            </p>
    
            <p className="mb-4">
                On the <strong>Iron Pact</strong> page, simply click the <strong>“Option”</strong> button
                in the <strong>“Pacts in Wallet”</strong> table and select
                <strong>“Iron Rise Auction”</strong> from the available options.
            </p>
    
            <p className="mb-4">
                On the <strong>Iron Rise Auction</strong> page, within the <strong>“New Auction”</strong> section,
                users can search for the Pact they wish to list and complete the auction form.
            </p>
    
            <p className="mb-4">
                In both cases, users must <strong>authorize</strong> the <strong>Iron Rise Auction</strong> contract
                to manage their <strong>ERC-1155</strong> tokens before creating a new auction.
            </p>
        </div>
    );
    
}
