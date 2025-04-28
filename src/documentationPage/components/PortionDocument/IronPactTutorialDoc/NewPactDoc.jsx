export const NewPactDoc = () => {
    return (
        <div className="p-6 bg-slate-800 text-white rounded-lg">
            <h2 className="text-3xl font-bold mb-4">Creating a New Pact</h2>
    
            <p className="mb-4">
                To create a new Pact, navigate through the <strong>navBar</strong> at the top of the page
                and select the <strong>“Create New Pact”</strong> section.
            </p>
    
            <p className="mb-4">
                At this point, you will need to complete the form with the required information for
                creation, which includes:
            </p>
    
            <ol className="list-decimal list-inside space-y-2">
                <li>
                    <strong>Debtor Address:</strong> Defaulted to the connected wallet.
                </li>
                <li>
                    <strong>Requested Token Address:</strong> The address of the token being requested.
                </li>
                <li>
                    <strong>Participation Amount:</strong> The unit size of each Pact, representing the
                    amount of tokens required to acquire a single unit.
                </li>
                <li>
                    <strong>Scheduled Reward Amount:</strong> The number of tokens to be distributed per Scheduled Reward period
                    for each Pact unit.
                </li>
                <li>
                    <strong>Scheduled Reward Dates:</strong> The scheduled distribution dates and number of Scheduled Rewards
                    offered to the creditor (currently up to six).
                </li>
                <li>
                    <strong>Expiration Date:</strong> The final expiration date, marking when the participation amount
                    can be reclaimed.
                </li>
                <li>
                    <strong>Collateral Token Address:</strong> The address of the token provided as collateral.
                </li>
                <li>
                    <strong>Collateral Amount:</strong> The quantity of tokens deposited as collateral
                    for the Pact.
                </li>
                <li>
                    <strong>Number of Units:</strong> The total number of Pact units to be created.
                </li>
                <li>
                    <strong>Description:</strong> An optional description of the Pact.
                    <span className="italic">Not mandatory.</span>
                </li>
            </ol>
    
            <p className="mt-6">
                After filling out the fields, you must first <strong>authorize the smart contract</strong>
                to manage the specified collateral amount. Then, proceed to <strong>create the Pact</strong>,
                which will be sent directly to the debtor's wallet.
            </p>
        </div>
    );
    
}
