export const TermsOfUse = () => {
    return (
        <div className="p-6 bg-slate-800 text-white rounded-lg space-y-4">
            <h2 className="text-3xl font-bold mb-4">Terms of Use for Iron Badger Brotherhood</h2>
            <p>Last updated: April 2025</p>

            <h3 className="text-2xl font-semibold">1. Introduction</h3>
            <p>
                Welcome to the Iron Badger Brotherhood ecosystem, which includes the protocols Iron Pact, Iron Forge, Iron Rise, Iron Fall, and any future services.
                Access to and interaction with the protocols occur exclusively through public and autonomous smart contracts on compatible blockchains.
                There is no direct management or custody of users’ funds by any centralized entity.
                By accessing or interacting with any protocol, you fully agree to these Terms of Use.
            </p>

            <h3 className="text-2xl font-semibold">2. Protocol Features</h3>
            <ul className="list-disc list-inside space-y-2">
                <li><strong>Iron Pact Protocol:</strong> Create peer-to-peer collateralized agreements using programmable Semi-NFTs.</li>
                <li><strong>Iron Forge Protocol:</strong> Manage and sell newly created Pacts to allow debtors to raise decentralized liquidity.</li>
                <li><strong>Iron Rise Protocol:</strong> Decentralized ascending auctions for the trading of Pacts.</li>
                <li><strong>Iron Fall Protocol:</strong> Decentralized descending auctions for dynamic and rapid purchase opportunities.</li>
            </ul>
            <p>
                All protocols operate entirely through smart contracts without intermediaries, fund custody, or discretionary control.
            </p>

            <h3 className="text-2xl font-semibold">3. No Custody, Fund Management, or Intermediation</h3>
            <p>
                The ecosystem does not manage, hold, invest, or administer user funds. All transactions occur directly between users and public smart contracts on the blockchain.
                Users retain full and continuous control over their assets.
            </p>
            <p>
                The Iron Badger Brotherhood interface does not provide fiat services, does not intermediate transactions, and does not offer client fund custody.
                Therefore, it operates outside the scope of Virtual Asset Service Providers (VASPs) as defined under Estonian and EU regulations.
            </p>

            <h3 className="text-2xl font-semibold">4. No Financial Product or Investment Offer</h3>
            <p>
                The ecosystem does not offer regulated financial products, does not promote or advise on investments, and does not guarantee any form of return.
                Any profits or losses incurred through use of the protocols are entirely the user's responsibility.
            </p>

            <h3 className="text-2xl font-semibold">5. Risk Disclosure</h3>
            <p>By using the protocols, you acknowledge and accept the following risks (including but not limited to):</p>
            <ul className="list-disc list-inside space-y-2">
                <li>Volatility in the value of collateral or assets.</li>
                <li>Bugs or exploits in smart contracts.</li>
                <li>Liquidity risks or inability to quickly exit positions.</li>
                <li>Regulatory changes that may affect access or use.</li>
                <li>Oracle failures or external data feed issues.</li>
                <li>Total or partial loss of assets.</li>
            </ul>
            <p>
                Users are strongly encouraged to evaluate these risks independently before engaging with the protocols.
            </p>

            <h3 className="text-2xl font-semibold">6. Acceptance of Terms via Wallet Connection</h3>
            <p>By connecting a blockchain wallet and interacting with any of the protocols, users:</p>
            <ul className="list-disc list-inside space-y-2">
                <li>Confirm they have read, understood, and accepted these Terms of Use.</li>
                <li>Accept these Terms without the need for any written or digital signature.</li>
                <li>Declare full responsibility for all actions taken via their connected wallet.</li>
            </ul>
            <p>
                Connecting a wallet and signing transactions constitutes full, voluntary acceptance of these Terms.
            </p>

            <h3 className="text-2xl font-semibold">7. Amendments</h3>
            <p>
                These Terms may be updated or modified at any time. Updates become effective upon publication.
                Users are responsible for reviewing the Terms periodically.
            </p>

            <h3 className="text-2xl font-semibold">8. Governing Law</h3>
            <p>
                Until the possible establishment of a formal DAO or legal entity, the ecosystem operates in a decentralized and autonomous manner.
                For the time being, these Terms are governed by and construed in accordance with the laws of Estonia.
                Any future updates will reflect changes in governance or jurisdiction if necessary.
            </p>
        </div>
    );
};
