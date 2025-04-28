import { IronForgeLayout } from '../../ironForge/ironForgeLayout/IronForgeLayout'
import { BodyIronForgeMarket } from '../../ironForge/BodyIronForgeMarket'

export const IronForgeMarket = () => {
  return (
    <div className='bg-iron-forge'>
        <IronForgeLayout>
            <BodyIronForgeMarket/>
        </IronForgeLayout>
    </div>
  )
}
