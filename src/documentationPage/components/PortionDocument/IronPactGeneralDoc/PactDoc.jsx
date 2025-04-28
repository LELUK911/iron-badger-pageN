export const PactDoc = () => {
    return (
        <div className="p-6 bg-slate-800 text-white rounded-lg">
            <h2 className="text-3xl font-bold mb-4">PACT</h2>

            <p className="mb-4">
                A Pact is a structured agreement created by a debtor, secured by collateral
                deposited in the smart contract. The debtor commits to distributing Scheduled Rewards
                to the creditor at defined intervals and to repaying the initial participation amount upon expiration.
            </p>

            <h3 className="text-2xl font-semibold mb-3">Key Elements of Scheduled Rewards:</h3>
            <ul className="list-disc list-inside space-y-2">
                <li>
                    <strong>Participation Amount:</strong> The amount required to obtain each individual Pact,
                    representing the capital made available to the debtor.
                </li>
                <li>
                    <strong>Scheduled Reward:</strong> Periodic rewards scheduled by the debtor, allowing creditors
                    to receive benefits at predefined intervals.
                </li>
                <li>
                    <strong>Expiration Date:</strong> The date by which the debtor commits to returning the
                    initial participation amount.
                </li>
                <li>
                    <strong>Collateral:</strong> A quantity of tokens (different from the participation asset) that
                    the debtor deposits as security for the Pact. This collateral may be liquidated in case
                    of non-compliance with Scheduled Rewards or repayment obligations.
                </li>
            </ul>

            <h3 className="text-2xl font-semibold mt-6 mb-3">Summary</h3>
            <p className="mb-4">
                This structured agreement allows:
            </p>

            <ul className="list-disc list-inside space-y-2">
                <li>
                    <strong>The debtor</strong> to access liquidity under predefined conditions.
                </li>
                <li>
                    <strong>The creditor</strong> to participate within a transparent framework that
                    reduces counterparty risks and ensures a balanced position relative to the debtor.
                </li>
            </ul>

            <p className="mt-4">
                This programmable structure offers flexibility and safeguards for both debtors and creditors,
                fostering a more secure and transparent liquidity environment.
            </p>
        </div>
    );

}
