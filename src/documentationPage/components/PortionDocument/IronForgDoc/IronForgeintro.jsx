export const IronForgeintro = () => {
    return (
        <div className="p-6 bg-slate-800 text-white rounded-lg">
            <h2 className="text-3xl font-bold mb-4">Introduction</h2>
    
            <p className="mb-4">
                <strong>Iron Forge</strong> is the official launch platform of the ecosystem.
                From here, newly created Pacts generated via <strong>Iron Pact</strong>
                can be introduced into the <strong>primary creation phase</strong> to facilitate liquidity allocation.
            </p>
    
            <p className="mb-4">Through <strong>Iron Forge</strong>, users can:</p>
    
            <ul className="list-disc list-inside space-y-2">
                <li>
                    <strong>Initiate the creation of their Pacts:</strong> These will be made available
                    at the predefined <strong>Participation Amount</strong> value.
                </li>
                <li>
                    <strong>Access allocated liquidity:</strong> After each transaction, debtors can withdraw
                    the collected funds.
                </li>
                <li>
                    <strong>Acquire Pacts:</strong> This is the primary way for users to obtain Pacts
                    as <strong>initial holders</strong>.
                </li>
            </ul>
        </div>
    );
    
}
