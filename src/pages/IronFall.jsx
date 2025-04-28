
import { BodyIronFallHome } from '../IronFall/BodyIronFallHome'
import { IronFallLayout } from '../IronFall/ironFallLayout/IronFallLayout'

export const IronFall = () => {
  return (
    <div className='bg-iron-fall'>
      <IronFallLayout>
        <BodyIronFallHome />
      </IronFallLayout>
    </div>
  )
}
