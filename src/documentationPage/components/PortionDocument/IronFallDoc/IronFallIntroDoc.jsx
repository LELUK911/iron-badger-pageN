export const IronFallIntroDoc = () => {
    return (
        <div className="p-6 bg-slate-800 text-white rounded-lg">
            <h2 className="text-3xl font-bold mb-4">Iron Fall Auction</h2>
    
            <h3 className="text-2xl font-semibold mb-3">Introduction</h3>
            <p className="mb-4">
                <strong>Iron Fall Auction</strong> is one of the available options within the
                <strong>Iron Badger Brotherhood</strong> ecosystem for facilitating the exchange of
                Pacts created through <strong>Iron Pact</strong>.
            </p>
    
            <p className="mb-4">
                With <strong>Iron Fall Auction</strong>, users can participate in a <strong>descending auction mechanism</strong>,
                where the seller lists a lot of Pacts, setting a <strong>starting price</strong>, a
                <strong>declining price tolerance</strong> per bid, and an <strong>expiration time</strong>.
            </p>
    
            <h3 className="text-2xl font-semibold mb-3">Features:</h3>
            <ul className="list-disc list-inside space-y-2">
                <li>
                    <strong>List owned Pacts</strong> through a dynamic and competitive auction format.
                </li>
                <li>
                    <strong>Participate in auctions</strong> to acquire Pacts at potentially advantageous prices.
                </li>
            </ul>
        </div>
    );
    
}
