export const IronRiseTutorial = ({ setFunction }) => {
    return (
        <>
            <ul className="space-y-2 ms-2">
                <li className="text-lg">Sellers</li>
                <li className="ms-2">
                    <button onClick={() => setFunction(23)}>List Pact Auction Lots</button>
                </li>
                <li className="ms-2">
                    <button onClick={() => setFunction(24)}>Pact Auction Management</button>
                </li>

                <li className="text-lg">Buyers</li>
                <li className="ms-2">
                    <button onClick={() => setFunction(25)}>Participate in a Pact Auction Lot</button>
                </li>
            </ul>
        </>
    );

};
