import { BodyIronForgePage } from "../ironForge/BodyIronForgePage"
import { IronForgeLayout } from "../ironForge/ironForgeLayout/IronForgeLayout"

export const IronForge = () => {
  return (
    <div className="bg-iron-forge">
      <IronForgeLayout>
        <BodyIronForgePage />
      </IronForgeLayout>
    </div>
  )
}
