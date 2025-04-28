export const BuyerLotOfDownAuctionDoc = () => {
    return (
        <div className="p-6 bg-slate-800 text-white rounded-lg">
            <h2 className="text-3xl font-bold mb-4">Participating in a Pact Auction Lot</h2>
    
            <p className="mb-4">
                To participate in an available Pact auction lot, navigate to the <strong>“Auctions”</strong> 
                section, where all active auctions will be displayed.
            </p>
    
            <p className="mb-4">
                Bids can be placed directly from the table by clicking the <strong>“Bid”</strong> button 
                in the <strong>Auction</strong> column, or users can access the detailed auction page 
                by selecting <strong>“Show”</strong> in the <strong>Detail</strong> column.
            </p>
    
            <p className="mb-4">
                On the dedicated auction page, in addition to all relevant details, participants can 
                submit their bids and engage in the auction process.
            </p>
    
            <p className="mb-4">
                Once the auction concludes, the <strong>winner</strong> can finalize the closure if 
                the seller does not do so, using the <strong>“Close Auction”</strong> button. 
                Afterward, the winner can <strong>claim their acquired Pact lot</strong> through the 
                <strong>“Withdraw”</strong> button.
            </p>
    
            <p className="mb-4">
                If a participant’s bid is outbid by another, they will be able to reclaim their previously 
                staked tokens in the <strong>“Auction”</strong> section.
            </p>
        </div>
    );
    
}
