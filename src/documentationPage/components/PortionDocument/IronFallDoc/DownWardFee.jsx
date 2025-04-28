export const DownWardFee = () => {
    return (
        <div className="p-6 bg-slate-800 text-white rounded-lg">
            <h2 className="text-3xl font-bold mb-4">Fee Structure</h2>
    
            <p className="mb-4">
                Participation in auctions requires the payment of certain <strong>fees</strong>. The following fees apply:
            </p>
    
            <h3 className="text-2xl font-semibold mb-3">1. Bid Fee</h3>
            <ul className="list-disc list-inside space-y-2">
                <li>Applied to bids placed in the auction <strong>pot</strong>.</li>
                <li><strong>Fixed fee</strong> up to a certain token threshold.</li>
                <li><strong>Dynamic fee</strong> replacing the fixed fee once the threshold is exceeded.</li>
            </ul>
    
            <h3 className="text-2xl font-semibold mt-6 mb-3">2. Seller Fee</h3>
            <ul className="list-disc list-inside space-y-2">
                <li>Applied when the seller withdraws the proceeds from the auction.</li>
                <li>The fee <strong>decreases progressively</strong> as the total earnings increase.</li>
            </ul>
    
            <h3 className="text-2xl font-semibold mt-6 mb-3">3. Penalty Fees</h3>
            <p className="mb-4">Penalties applied in specific cases based on the seller’s actions:</p>
    
            <h4 className="text-xl font-semibold mb-2">Tolerance Adjustment Penalty</h4>
            <ul className="list-disc list-inside space-y-2">
                <li><strong>5%</strong> if the adjustment occurs more than 24 hours before expiration.</li>
                <li><strong>8%</strong> if the adjustment occurs between 24 hours and 1 hour before expiration.</li>
                <li><strong>10%</strong> if the adjustment occurs less than 1 hour before expiration.</li>
            </ul>
    
            <h4 className="text-xl font-semibold mt-4 mb-2">Over Penalty Fee</h4>
            <p className="mb-4">
                Applied after accumulating <strong>six penalties</strong>, which is the maximum penalty threshold.
            </p>
            <ul className="list-disc list-inside space-y-2">
                <li><strong>30%</strong> penalty.</li>
            </ul>
    
            <h4 className="text-xl font-semibold mt-4 mb-2">Emergency Close Penalty</h4>
            <p className="mb-4">
                Penalties applied when triggering an <strong>emergency auction closure</strong>,
                based on the remaining auction duration:
            </p>
            <ul className="list-disc list-inside space-y-2">
                <li><strong>15%</strong> if executed more than 24 hours before expiration.</li>
                <li><strong>20%</strong> if executed within 24 hours of expiration.</li>
                <li><strong>30%</strong> if six penalties have already been accumulated (<strong>Over Penalty Fee</strong>).</li>
            </ul>
    
            <p className="mt-4">
                Penalties will be <strong>deducted from the pot</strong> when the seller withdraws proceeds.
                They will be applied sequentially in the order they were incurred, followed by the
                standard seller fees.
            </p>
    
            <p className="mt-4">
                Users can review detailed fee information at any time by clicking the <strong>“?”</strong> icon next to the
                fee amount or by accessing the <strong>“Info” → “Fees”</strong> section.
            </p>
        </div>
    );
    
}
