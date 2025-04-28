
import { DownwardCard } from "../../IronFall/components/DownWardAuctionCard/DownwardCard"
import { IronFallLayout } from "../../IronFall/ironFallLayout/IronFallLayout"
import { useParams } from "react-router-dom"

export const DownwardAuctionId = () => {
    const { id } = useParams()
    return (
        <div className='bg-iron-fall'>
            <IronFallLayout>
                <DownwardCard id={id} />
            </IronFallLayout>
        </div>
    )
}