import { IronFallLayout } from "../../IronFall/ironFallLayout/IronFallLayout"
import { BodyIronFallAuction } from '../../IronFall/BodyIronFallAuction'

export const IronFallAuctionList = () => {
    return (
        <div className='bg-iron-fall'>
            <IronFallLayout>
                <BodyIronFallAuction/>
            </IronFallLayout>
        </div>
    )
}
