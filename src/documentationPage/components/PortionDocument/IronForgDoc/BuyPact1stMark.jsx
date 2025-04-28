export const BuyPact1stMark = () => {
    return (
        <div className="p-6 bg-slate-800 text-white rounded-lg">
            <h2 className="text-3xl font-bold mb-4">Acquiring Pacts</h2>
    
            <p className="mb-4">
                To acquire Pacts, users must navigate to the <strong>“Launch Hub”</strong>,
                where a list of available Pacts on the launcher is displayed.
            </p>
    
            <p className="mb-4">
                The table provides key financial information about each Pact.
                For more details, users can access the <strong>Pact Details Card</strong>
                by clicking the <strong>“Show”</strong> button in the <strong>Details</strong> column.
            </p>
    
            <p className="mb-4">
                Once the desired Pact is selected, users can proceed with the acquisition
                by clicking the <strong>“Buy”</strong> button. This opens a window where they can
                specify the quantity they wish to acquire. After approving the token expenditure,
                they can finalize the acquisition.
            </p>
    
            <p className="mb-4">
                After the acquisition, the Pacts can be <strong>claimed</strong> from the contract
                using the <strong>“Withdraw”</strong> button.
            </p>
        </div>
    );
    
}
