import { BodyIronFallNewAuction } from "../../IronFall/BodyIronFallNewAuction"
import { IronFallLayout } from "../../IronFall/ironFallLayout/IronFallLayout"

export const IronFallNewAuction = () => {
    return (
        <div className='bg-iron-fall'>
            <IronFallLayout>
                <BodyIronFallNewAuction/>
            </IronFallLayout>
        </div>
    )
}
