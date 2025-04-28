import { BodyIronForgeManager } from '../../ironForge/BodyIronForgeManager'
import { IronForgeLayout } from '../../ironForge/ironForgeLayout/IronForgeLayout'

export const IronForgeManager = () => {
    return (
        <div className='bg-iron-forge'>
            <IronForgeLayout>
                <BodyIronForgeManager />
            </IronForgeLayout>
        </div>
    )
}
