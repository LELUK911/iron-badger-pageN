export const IronRiseFeeDoc = () => {
    return (
        <div className="p-6 bg-slate-800 text-white rounded-lg">
            <h2 className="text-3xl font-bold mb-4">Fee Structure</h2>
    
            <p className="mb-4">
                Participation in auctions requires the payment of certain <strong>fees</strong>. The following fees apply:
            </p>
    
            <ul className="list-disc list-inside space-y-2">
                <li>
                    <strong>Bid Fee:</strong> Applied to bids placed in the auction <strong>pot</strong>.
                    <ul className="list-disc list-inside pl-5 mt-2 space-y-1">
                        <li><strong>Fixed fee</strong> up to a certain token threshold.</li>
                        <li><strong>Dynamic fee</strong> replacing the fixed fee once the threshold is exceeded.</li>
                    </ul>
                </li>
                <li>
                    <strong>Seller Fee:</strong> Applied when the seller withdraws the proceeds from the auction.
                    <ul className="list-disc list-inside pl-5 mt-2 space-y-1">
                        <li>The fee <strong>decreases progressively</strong> as the total earnings increase.</li>
                    </ul>
                </li>
            </ul>
    
            <p className="mt-4">
                Users can review detailed fee information at any time by clicking the <strong>“?”</strong>
                icon next to the fee amount or by accessing the <strong>“Info” → “Fees”</strong> section.
            </p>
        </div>
    );
    
}
