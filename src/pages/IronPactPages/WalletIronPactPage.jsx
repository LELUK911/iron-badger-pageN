import { BodyIronPactWallet } from '../../ironPact/BodyIronPactWallet'
import { IronPactLayout } from '../../ironPact/ironPactLayout/IronPactLayout'

export const WalletIronPactPage = () => {
    return (
        <div className="bg-iron-Pact">
            <IronPactLayout>
                <BodyIronPactWallet />
            </IronPactLayout>
        </div>
    )
}
