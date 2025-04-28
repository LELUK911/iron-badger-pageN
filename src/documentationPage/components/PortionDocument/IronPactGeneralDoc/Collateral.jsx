export const Collateral = () => {
    return (
        <div className="p-6 bg-slate-800 text-white rounded-lg">
            <h2 className="text-3xl font-bold mb-4">COLLATERAL</h2>

            <p className="mb-4">
                Collateral is the security deposit provided by the debtor at the time of a Pact's creation.
                It serves to safeguard the creditor in case of missed Scheduled Rewards or failure to return the participation amount at expiration.
            </p>

            <h3 className="text-2xl font-semibold mb-3">Key Features of Collateral:</h3>
            <ul className="list-disc list-inside space-y-2">
                <li>
                    <strong>Token Type:</strong> Collateral consists of one or more types of tokens different from those made available by the creditor,
                    as defined by the debtor.
                </li>
                <li>
                    <strong>Deposit:</strong> Collateral is locked within the smart contract at the time of Pact creation
                    and remains secured until the Pact is fully settled or liquidated.
                </li>
                <li>
                    <strong>Liquidation Mechanism:</strong> In the event of debtor default, a portion of the collateral
                    may be liquidated to compensate for missed Scheduled Rewards or unpaid obligations, according to predefined liquidation rules.
                </li>
                <li>
                    <strong>Lock-in Period:</strong> Upon Pact expiration, the collateral remains locked for <strong>15 days</strong>
                    if the debtor has met all obligations, or for <strong>90 days</strong> in case of unresolved defaults.
                </li>
            </ul>
        </div>
    );

}
