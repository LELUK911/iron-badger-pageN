export const ManagmentPact = () => {
    return (
        <div className="p-6 bg-slate-800 text-white rounded-lg">
            <h2 className="text-3xl font-bold mb-4">Pact Management</h2>
    
            <p className="mb-4">
                After creating and distributing the Pacts, clicking on the <strong>“Dashboard”</strong>
                section grants access to an area where both held and created Pacts can be managed.
            </p>
    
            <p className="mb-4">
                Once the desired Pact is located in the table, simply click the
                <strong>“Details”</strong> button to access a card containing all relevant information.
            </p>
    
            <h3 className="text-2xl font-semibold mb-3">Pact Details Card:</h3>
            <p className="mb-4">The available information includes:</p>
    
            <h4 className="text-xl font-semibold mb-2">Debtor Info:</h4>
            <ul className="list-disc list-inside space-y-2">
                <li><strong>Debtor:</strong> Address of the debtor.</li>
                <li><strong>Reliability Score:</strong> The assigned reliability score of the debtor.</li>
                <li><strong>Liquidation Penalties:</strong> The percentage of collateral subject to liquidation in case of non-compliance.</li>
            </ul>
    
            <h4 className="text-xl font-semibold mt-4 mb-2">Liquidity Info:</h4>
            <ul className="list-disc list-inside space-y-2">
                <li><strong>Created Units:</strong> Total number of units created.</li>
                <li><strong>Available Supply:</strong> Current supply of the created units.</li>
                <li><strong>Collateral Token:</strong> Name of the token deposited as collateral.</li>
                <li><strong>Requested Token:</strong> Name of the token requested by the debtor.</li>
                <li><strong>Collateral Balance:</strong> Amount of collateral deposited as security.</li>
                <li><strong>Liquidity for Scheduled Rewards:</strong> Balance of tokens reserved for Scheduled Rewards and participation return.</li>
            </ul>
    
            <h4 className="text-xl font-semibold mt-4 mb-2">Scheduled Reward Info:</h4>
            <ul className="list-disc list-inside space-y-2">
                <li><strong>Number of Scheduled Rewards:</strong> Total number of Scheduled Rewards associated with the Pact.</li>
                <li><strong>Expiration Date:</strong> Final expiration date of the Pact.</li>
                <li><strong>Scheduled Reward Dates:</strong> Schedule of Scheduled Reward distribution dates.</li>
            </ul>
    
            <h4 className="text-xl font-semibold mt-4 mb-2">User Info:</h4>
            <ul className="list-disc list-inside space-y-2">
                <li><strong>Number of Owned Units:</strong> Total number of held units.</li>
                <li><strong>Redeemable Amount:</strong> Number of units that can be settled at expiration.</li>
                <li><strong>Claim Scheduled Rewards:</strong> List of claimable Scheduled Rewards with an action button.</li>
            </ul>
    
            <h4 className="text-xl font-semibold mt-4 mb-2">Owner Section <span className="italic">(Debtor Only)</span>:</h4>
            <ul className="list-disc list-inside space-y-2">
                <li><strong>Deposit Tokens for Scheduled Rewards:</strong> Allows the debtor to deposit tokens for Scheduled Rewards and participation return.</li>
                <li><strong>Claim Score Points:</strong> Button to claim the debtor’s earned score points.</li>
                <li><strong>Withdraw Collateral:</strong> Button to retrieve collateral after the freeze period has ended.</li>
            </ul>
    
            <p className="mt-4">
                Through this card, both users and debtors can manage the lifecycle of the Pact.
                Debtors have additional controls available within the <strong>"Owner Section"</strong>.
            </p>
    
            <p className="mt-4">
                Additionally, the <strong>"Dashboard"</strong> section contains a list of held Pacts.
                From this list, users can initiate sales through designated secondary trading mechanisms within the ecosystem.
            </p>
        </div>
    );
    
}
