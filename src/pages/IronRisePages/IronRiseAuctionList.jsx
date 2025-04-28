import { BodyIronRiseAuction } from '../../IronRise/BodyIronRiseAuction'
import { IronRiseLayout } from '../../IronRise/ironRiseLayout/IronRiseLayout'

export const IronRiseAuctionList = () => {
    return (
        <div className="bg-iron-rise">
            <IronRiseLayout>
                <BodyIronRiseAuction />
            </IronRiseLayout>
        </div>
    )
}
