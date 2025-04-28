export const IronPactTutorial = ({ setFunction }) => {
    return (
        <>
            <ul className="space-y-2 ms-2">
                <li className="text-lg">Debtors</li>
                <li className="ms-2">
                    <button onClick={() => setFunction(9)}>Creating a New Pact</button>
                </li>
                <li className="ms-2">
                    <button onClick={() => setFunction(10)}>Initial Listing of Pacts</button>
                </li>
                <li className="ms-2">
                    <button onClick={() => setFunction(11)}>Pact Management</button>
                </li>
                <li className="text-lg">Creditors</li>
                <li className="ms-2">
                    <button onClick={() => setFunction(12)}>Acquire via Iron Forge</button>
                </li>
                <li className="ms-2">
                    <button onClick={() => setFunction(13)}>Participate in Iron Rise & Iron Fall</button>
                </li>
                <li className="ms-2">
                    <button onClick={() => setFunction(14)}>Pact Management</button>
                </li>
                <li className="ms-2">
                    <button onClick={() => setFunction(16)}>Liquidation Process Information</button>
                </li>
            </ul>
        </>
    );
};
