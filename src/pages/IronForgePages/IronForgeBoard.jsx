import { BodyIronForgeBoard } from '../../ironForge/BodyIronForgeBoard'
import { IronForgeLayout } from '../../ironForge/ironForgeLayout/IronForgeLayout'

export const IronForgeBoard = () => {
    return (
        <div className='bg-iron-forge'>
            <IronForgeLayout>
                <BodyIronForgeBoard />
            </IronForgeLayout></div>
    )
}
