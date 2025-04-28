export const LiquidationInfo = () => {
    return (
        <div className="p-6 bg-slate-800 text-white rounded-lg">
            <h2 className="text-3xl font-bold mb-4">Liquidation Process Overview</h2>
    
            <p className="mb-4">
                In case of <strong>non-compliance</strong> with Scheduled Reward distributions or participation return obligations,
                the liquidation process is <strong>automated</strong>. A <strong>partial liquidation</strong> mechanism
                is also in place if there are sufficient funds to cover one or more Scheduled Rewards or
                return amounts.
            </p>
    
            <p className="italic">
                ** Currently, the front-end does not include a section displaying the number of
                liquidations a Pact has undergone, but this feature will be implemented soon.
            </p>
        </div>
    );
    
}
