export const Penalityliquidation = () => {
    return (
        <div className="p-6 bg-slate-800 text-white rounded-lg">
            <h2 className="text-3xl font-bold mb-4">LIQUIDATION AND PENALTIES</h2>

            <p className="mb-4">
                Liquidation is the process through which a creditor can claim a portion of the collateral
                if the debtor fails to meet their obligations.
            </p>

            <h3 className="text-2xl font-semibold mb-3">Liquidation Process:</h3>
            <ul className="list-disc list-inside space-y-2">
                <li>
                    <strong>Liquidation Trigger:</strong> Liquidation can be initiated when the debtor
                    fails to distribute a Scheduled Reward or return the participation amount within the specified timeframe.
                </li>
                <li>
                    <strong>Liquidation Calculation:</strong> The amount of collateral that can be liquidated depends on:
                    <ul className="list-disc list-inside pl-5 mt-2 space-y-1">
                        <li>The debtor's reliability score.</li>
                        <li>The number of prior liquidations the Pact has undergone.</li>
                    </ul>
                </li>
                <li>
                    <strong>Execution:</strong> Once non-compliance is verified, the creditor can initiate
                    a controlled partial liquidation of the collateral as compensation for the associated risk.
                </li>
                <li>
                    <strong>Progressive Liquidation:</strong> To mitigate excessive deterioration of the agreement,
                    liquidations are counted cumulatively rather than per event. Upon the
                    <strong>fourth liquidation event</strong>, creditors may consider the debtor in default
                    and liquidate the remaining collateral. The proceeds will be distributed across all
                    outstanding Pacts, subject to smart contract fees.
                </li>
            </ul>

            <h3 className="text-2xl font-semibold mt-6 mb-3">Penalties:</h3>
            <ul className="list-disc list-inside space-y-2">
                <li>
                    Applied to the debtor in case of non-compliance with Pact obligations,
                    such as failure to distribute Scheduled Rewards.
                </li>
                <li>
                    Result in a reduction of the debtor’s reliability score and an increase in
                    the amount of collateral liquidated in case of future defaults.
                </li>
                <li>
                    Encourage responsible behavior from debtors while protecting creditors.
                </li>
                <li>
                    Designed to strongly discourage non-compliance, while ensuring that
                    collateral cannot be liquidated solely due to a change in market value.
                </li>
            </ul>
        </div>
    );

}
