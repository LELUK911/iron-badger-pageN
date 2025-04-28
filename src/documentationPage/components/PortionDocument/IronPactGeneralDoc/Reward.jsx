export const Reward = () => {
  return (
    <div className="p-6 bg-slate-800 text-white rounded-lg">
      <h2 className="text-3xl font-bold mb-4">SCHEDULED REWARD</h2>

      <p className="mb-4">
        A Scheduled Reward is a periodic distribution predetermined at the creation of the Pact
        by the debtor. It represents the benefit that the creditor receives for participating in the Pact.
        The tokens used for Scheduled Rewards are of the same type as the Pact itself, while their quantity
        and payment schedule are chosen by the debtor at the time of creation, with a maximum of six Scheduled Rewards per Pact.
      </p>

      <h3 className="text-2xl font-semibold mb-3">Key Features of Scheduled Rewards:</h3>
      <ul className="list-disc list-inside space-y-2">
        <li>
          <strong>Predefined Payment Dates:</strong> At the time of creation, the debtor selects the dates on which
          Scheduled Rewards will be distributed. Once set, these dates cannot be modified.
        </li>
        <li>
          <strong>Fixed Amount:</strong> The amount of each Scheduled Reward is determined at creation and cannot be altered afterward.
        </li>
        <li>
          <strong>Collateral Assurance:</strong> In the event of a missed Scheduled Reward, the creditor has the right
          to trigger a controlled liquidation of a portion of the collateral. The liquidatable amount depends on the debtor’s
          reliability score and the number of prior liquidations the Pact has undergone during its lifecycle.
        </li>
        <li>
          <strong>Eligibility:</strong> To claim a Scheduled Reward, the creditor must own the Pact at the time of the scheduled distribution.
        </li>
      </ul>

      <p className="mt-4">
        Within the context of <strong>Iron Pact</strong> and the <strong>DeFi</strong> ecosystem,
        Scheduled Rewards represent predefined moments when debtors distribute benefits to creditors,
        making participation predictable and programmable.
      </p>
    </div>
  );

}
