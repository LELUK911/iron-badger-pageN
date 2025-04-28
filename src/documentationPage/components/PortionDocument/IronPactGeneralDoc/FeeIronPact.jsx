export const FeeIronPact = () => {
    return (
        <div className="p-6 bg-slate-800 text-white rounded-lg">
            <h2 className="text-3xl font-bold mb-4">SERVICE FEES (TARIFFE)</h2>

            <p className="mb-4">
                Within <strong>Iron Pact</strong>, service fees are integrated to ensure the sustainable and efficient
                operation of the platform. Below are the main types of applicable service fees:
            </p>

            <h3 className="text-2xl font-semibold mb-3">Types of Service Fees:</h3>
            <ul className="list-disc list-inside space-y-2">
                <li>
                    <strong>Creation Fee:</strong>
                    Applied when a new Pact is created. This fee supports the ongoing
                    development and maintenance of the platform. It is generally calculated as a
                    percentage of the deposited collateral and deducted from the same.
                </li>
                <li>
                    <strong>Transaction Fee:</strong>
                    Charged on transfers outside the ecosystem, it consists of a fixed fee.
                </li>
                <li>
                    <strong>Scheduled Reward Distribution Fee:</strong>
                    Applied at the time of each Scheduled Reward distribution. It consists of a fixed fee based
                    on the Scheduled Reward amount.
                </li>
                <li>
                    <strong>Redemption Fee:</strong>
                    Applied when a Pact is fully settled or concluded. It is determined
                    as a percentage of the total amount reimbursed at the time of final settlement.
                </li>
                <li>
                    <strong>Liquidation Fee:</strong>
                    Associated with the liquidation process in case of debtor default. This fee is
                    included as part of the percentage of collateral liquidated during the process.
                </li>
            </ul>

            <h3 className="text-2xl font-semibold mt-6 mb-3">Service Fee Application Methods:</h3>
            <ul className="list-disc list-inside space-y-2">
                <li>
                    <strong>Automation via Smart Contracts:</strong>
                    All service fees are calculated and deducted automatically by smart contracts
                    during various operations (creation, transactions, liquidation, etc.).
                </li>
                <li>
                    <strong>Spending Approval:</strong>
                    To execute a transaction, a spending approval equal to the service fee amount
                    is required.
                </li>
                <li>
                    <strong>Transparency:</strong>
                    All applicable service fees are predefined within the contracts, ensuring that
                    participants are informed and can review them at any time.
                </li>
                <li>
                    <strong>Deduction Process:</strong>
                    Service fees are directly deducted from the funds involved in transactions or
                    from collateral deposits in case of liquidation or penalties. For transfers,
                    payments are processed using a <strong>wrapped token</strong> of the currency
                    used for service fee payments (e.g., <strong>WETH</strong>).
                </li>
            </ul>
        </div>
    );

}
