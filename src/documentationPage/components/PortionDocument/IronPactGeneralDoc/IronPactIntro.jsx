export const IronPactIntro = () => {
    return (
        <div className="p-6 bg-slate-800 text-white rounded-lg">
            <h2 className="text-3xl font-bold mb-4">IRON PACT</h2>

            <h3 className="text-2xl font-semibold mb-3">Introduction</h3>
            <p className="mb-4">
                Iron Pact is an innovative DeFi platform designed for the creation and management of
                customizable Pact agreements. Thanks to its flexible structure, users can:
            </p>

            <ul className="list-disc list-inside space-y-2">
                <li>
                    <strong>Customize Pacts:</strong> Define expiration, Scheduled Rewards (number, timing, and value),
                    as well as the associated collateral.
                </li>
                <li>
                    <strong>Programmability:</strong> Create tailored agreements that offer stability and
                    risk mitigation, preventing sudden reward disruptions or unwanted collateral liquidations during
                    high market volatility.
                </li>
                <li>
                    <strong>Tokenization:</strong> Create Pacts as tokens compliant with the
                    <span className="font-mono"> ERC-1155</span> standard, enabling seamless transfer, integration,
                    and interaction within the Iron Badger Brotherhood ecosystem.
                </li>
                <li>
                    <strong>Creditor-Managed Liquidations:</strong> In case of default, creditors can enforce their
                    rights through a transparent penalty system, ensuring controlled collateral liquidation.
                </li>
            </ul>

            <p className="mt-4">
                This combination of customization, programmability, tokenization, and structured liquidation
                mechanisms makes Iron Pact a distinctive solution within the DeFi space. It provides debtors
                with full control over their Pacts while fostering a transparent and secure liquidity
                environment, ensuring strong safeguards for creditors through an effective liquidation
                and penalty framework.
            </p>
        </div>
    );
}
