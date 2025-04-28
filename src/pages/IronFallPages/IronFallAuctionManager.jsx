import { BodyIronFallManager } from '../../IronFall/BodyIronFallManager' 
import { IronFallLayout } from "../../IronFall/ironFallLayout/IronFallLayout"

export const IronFallAuctionManager = () => {
    return (
        <div className='bg-iron-fall'>
            <IronFallLayout>
                <BodyIronFallManager/>
            </IronFallLayout>
        </div>
    )
}
