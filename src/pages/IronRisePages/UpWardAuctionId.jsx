
import { UpwardCard } from "../../IronRise/components/UpWardAuctionCard/UpwnwardCard"
import { IronRiseLayout } from "../../IronRise/ironRiseLayout/IronRiseLayout"
import { useParams } from "react-router-dom"

export const UpwardAuctionId = () => {
    const { id } = useParams()
    return (
        <div className='bg-iron-rise'>
            <IronRiseLayout>
                <UpwardCard id={id} />
            </IronRiseLayout>
        </div>
    )
}