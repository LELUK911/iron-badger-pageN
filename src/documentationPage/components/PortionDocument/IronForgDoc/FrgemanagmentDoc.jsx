export const FrgemanagmentDoc = () => {
    return (
        <div className="p-6 bg-slate-800 text-white rounded-lg">
            <h2 className="text-3xl font-bold mb-4">Launch Management</h2>
    
            <p className="mb-4">
                After initiating the creation of Pacts, they can be managed 
                through the <strong>“Manage Your Launches”</strong> table, which displays the 
                remaining quantity available. If necessary, debtors can <strong>cancel the launch</strong> 
                and retrieve any unallocated Pacts.
            </p>
    
            <p className="mb-4">
                Additionally, this section allows debtors to <strong>withdraw the proceeds</strong> 
                from completed transactions through the <strong>“Sell Balance”</strong> section.
            </p>
        </div>
    );
    
}
