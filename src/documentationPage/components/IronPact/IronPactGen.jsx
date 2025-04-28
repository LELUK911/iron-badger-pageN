export const IronPactGen = ({ setFunction }) => {
    return (
        <>
            <ul className="space-y-2 ms-2">
                <li>
                    <button onClick={() => setFunction(1)}>Introduction</button>
                </li>
                <li>
                    <button onClick={() => setFunction(2)}>Pact Overview</button>
                </li>
                <li>
                    <button onClick={() => setFunction(3)}>Scheduled Reward</button>
                </li>
                <li>
                    <button onClick={() => setFunction(4)}>Collateral</button>
                </li>
                <li>
                    <button onClick={() => setFunction(5)}>Liquidation and Adjustments</button>
                </li>
                <li>
                    <button onClick={() => setFunction(6)}>Debtor Reliability</button>
                </li>
                <li>
                    <button onClick={() => setFunction(7)}>Service Fees</button>
                </li>
            </ul>
        </>
    );

};
