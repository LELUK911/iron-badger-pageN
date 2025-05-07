import { BodyIronPactPage } from '../ironPact/BodyIronPactPage'
import { IronPactLayout } from '../ironPact/ironPactLayout/IronPactLayout'
import { Helmet } from "react-helmet-async"

export const IronPactPAge = () => {
  return (
    <div className="bg-iron-Pact">
      <Helmet>
        <title>Iron Pact | Iron Badger Brotherhood</title>
        <meta name="description" content="Create, manage and explore decentralized token pacts with Iron Pact." />

        {/* Open Graph / Facebook */}
        <meta property="og:title" content="Iron Pact | Iron Badger Brotherhood" />
        <meta property="og:description" content="Create, manage and explore decentralized token pacts with Iron Pact." />
        <meta property="og:image" content="https://www.iron-badger-brotherhood.xyz/assets/tassoIronPact.jpg" />
        <meta property="og:url" content="https://www.iron-badger-brotherhood.xyz/app.ironPact" />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Iron Pact | Iron Badger Brotherhood" />
        <meta name="twitter:description" content="Create, manage and explore decentralized token pacts with Iron Pact." />
        <meta name="twitter:image" content="https://www.iron-badger-brotherhood.xyz/assets/tassoIronPact.jpg" />
      </Helmet>

      <IronPactLayout>
        <BodyIronPactPage />
      </IronPactLayout>
    </div>
  )
}
