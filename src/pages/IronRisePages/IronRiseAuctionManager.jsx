import { BodyIronRiseManager } from "../../IronRise/BodyIronRiseManager"
import { IronRiseLayout } from "../../IronRise/ironRiseLayout/IronRiseLayout"

export const IronRiseAuctionManager = () => {
    return (
        <div className="bg-iron-rise">
            <IronRiseLayout>
                <BodyIronRiseManager />
            </IronRiseLayout>
        </div>
    )
}
