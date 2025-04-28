export const IronForgeTutorial = ({ setFunction }) => {
    return (
        <>
            <ul className="space-y-2 ms-2">
                <li className="text-lg">Debtors</li>
                <li className="ms-2">
                    <button onClick={() => setFunction(18)}>Initiate a New Pact</button>
                </li>
                <li className="ms-2">
                    <button onClick={() => setFunction(19)}>Pact Launch Management</button>
                </li>

                <li className="text-lg">Creditors</li>
                <li className="ms-2">
                    <button onClick={() => setFunction(20)}>Obtain a Pact</button>
                </li>
            </ul>
        </>
    );

};
