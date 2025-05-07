import { BodyIronForgePage } from "../ironForge/BodyIronForgePage"
import { IronForgeLayout } from "../ironForge/ironForgeLayout/IronForgeLayout"
import { Helmet } from "react-helmet-async"

export const IronForge = () => {
  return (
    <div className="bg-iron-forge">
      <Helmet>
        <title>Iron Forge | Iron Badger Brotherhood</title>
        <meta name="description" content="Forge and customize your unique token pacts with the Iron Forge platform." />

        {/* Open Graph / Facebook */}
        <meta property="og:title" content="Iron Forge | Iron Badger Brotherhood" />
        <meta property="og:description" content="Forge and customize your unique token pacts with the Iron Forge platform." />
        <meta property="og:image" content="https://www.iron-badger-brotherhood.xyz/assets/TassoForgiatore.png" />
        <meta property="og:url" content="https://www.iron-badger-brotherhood.xyz/app.ironForge" />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Iron Forge | Iron Badger Brotherhood" />
        <meta name="twitter:description" content="Forge and customize your unique token pacts with the Iron Forge platform." />
        <meta name="twitter:image" content="https://www.iron-badger-brotherhood.xyz/assets/TassoForgiatore.png" />
      </Helmet>

      <IronForgeLayout>
        <BodyIronForgePage />
      </IronForgeLayout>
    </div>
  )
}
