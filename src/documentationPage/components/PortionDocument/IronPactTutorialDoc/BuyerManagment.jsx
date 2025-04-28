export const BuyerManagment = () => {
    return (
        <div className="p-6 bg-slate-800 text-white rounded-lg">
            <h2 className="text-3xl font-bold mb-4">Management of Acquired Pacts</h2>

            <p className="mb-4">
                After acquiring a Pact, clicking on the <strong>“Dashboard”</strong> section
                grants access to an area where users can manage the Pacts held within their wallet
                and review those they have created.
            </p>

            <p className="mb-4">
                Once the desired Pact is located in the table, simply click the <strong>“Details”</strong>
                button to access the <strong>Pact Details Card</strong>, which contains all relevant
                information and action buttons for managing the agreement.
            </p>

            <p className="mb-4">
                Additionally, within the same table, users can initiate the sale of their Pacts
                by clicking the <strong>“Option”</strong> button in the <strong>Sell</strong> section. This will
                automatically create a request for a new <strong>“Auction”</strong> in the selected auction system.
            </p>
        </div>
    );

}
