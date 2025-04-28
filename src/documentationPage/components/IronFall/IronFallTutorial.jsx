export const IronFallTutorial = ({ setFunction }) => {
    return (
        <>
            <ul className="space-y-2 ms-2">
                <li className="text-lg">Sellers</li>
                <li className="ms-2">
                    <button onClick={() => setFunction(28)}>List Pact Auction Lots</button>
                </li>
                <li className="ms-2">
                    <button onClick={() => setFunction(29)}>Pact Auction Management</button>
                </li>

                <li className="text-lg">Buyers</li>
                <li className="ms-2">
                    <button onClick={() => setFunction(30)}>Participate in a Pact Auction Lot</button>
                </li>
            </ul>
        </>
    );

};
