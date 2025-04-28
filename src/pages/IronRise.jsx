import { BodyIronRiseHome } from "../IronRise/BodyIronRiseHome"
import { IronRiseLayout } from "../IronRise/ironRiseLayout/IronRiseLayout"

export const IronRise = () => {
  return (
    <div className="bg-iron-rise">
      <IronRiseLayout>
        <BodyIronRiseHome/>
      </IronRiseLayout>
    </div>
  )
}
