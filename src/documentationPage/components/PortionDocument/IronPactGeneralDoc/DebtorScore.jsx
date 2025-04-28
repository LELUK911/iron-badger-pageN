export const DebtorScoreA = () => {
    return (
        <div className="p-6 bg-slate-800 text-white rounded-lg">
            <h2 className="text-3xl font-bold mb-4">DEBTOR RELIABILITY</h2>

            <p className="mb-4">
                The debtor reliability indicator reflects the level of trust and credibility assigned to each debtor within the platform.
                It directly affects:
            </p>

            <ul className="list-disc list-inside space-y-2">
                <li>
                    <strong>Liquidation Conditions:</strong> A lower reliability level increases the percentage of collateral
                    that may be liquidated in case of non-compliance.
                </li>
                <li>
                    <strong>Perceived Stability of Pacts:</strong> Pacts created by debtors with
                    higher reliability may be considered more attractive to creditors due to a lower
                    perceived risk.
                </li>
            </ul>

            <h3 className="text-2xl font-semibold mt-6 mb-3">Reliability Determination:</h3>
            <ul className="list-disc list-inside space-y-2">
                <li>The reliability level is initially assigned at a medium-risk profile.</li>
                <li>
                    It is dynamically updated based on the debtor’s behavior, specifically:
                    <ul className="list-disc list-inside pl-5 mt-2 space-y-1">
                        <li>Timely fulfillment of Pact expirations and Scheduled Rewards.</li>
                        <li>Occurrence of liquidations.</li>
                    </ul>
                </li>
                <li>
                    The updated reliability level is assigned upon the <strong>debtor’s claim</strong> or automatically upon
                    creating new Pacts. Once updated, it applies to all active Pacts, including retroactively.
                </li>
            </ul>

            <h3 className="text-2xl font-semibold mt-6 mb-3">Reliability Utilization:</h3>
            <ul className="list-disc list-inside space-y-2">
                <li>
                    Platform participants can review a debtor’s reliability level before acquiring Pacts
                    as a measure of the debtor’s trustworthiness.
                </li>
                <li>
                    A higher reliability level enhances the debtor’s standing, allowing them to benefit from
                    more favorable liquidation conditions in case of non-compliance.
                </li>
            </ul>
        </div>
    );

}
