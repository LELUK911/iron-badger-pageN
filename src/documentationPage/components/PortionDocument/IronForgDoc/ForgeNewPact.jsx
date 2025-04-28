export const ForgeNewPact = () => {
    return (
        <div className="p-6 bg-slate-800 text-white rounded-lg">
            <h2 className="text-3xl font-bold mb-4">Launching a New Pact</h2>
    
            <p className="mb-4">
                After creating a new Pact on <strong>Iron Pact</strong>, the debtor
                must navigate to the <strong>“LaunchBoard”</strong> section and select the
                Pact from the <strong>“List of Created Pacts”</strong> table.
            </p>
    
            <p className="mb-4">
                By clicking the <strong>“Go”</strong> button in the <strong>Launch</strong> section,
                the Pact will be made available in the primary creation phase.
                This table also provides summary information about the Pact,
                and if needed, users can access the <strong>Pact Details Card</strong>
                for a more comprehensive overview.
            </p>
    
            <p className="mb-4">
                After clicking <strong>“Go”</strong>, a window will appear allowing the debtor
                to specify the quantity of Pacts to be listed.
                The debtor must authorize the contract to manage their <strong>ERC-1155</strong> tokens
                (if not already approved) before finalizing the launch.
            </p>
        </div>
    );
    
}
