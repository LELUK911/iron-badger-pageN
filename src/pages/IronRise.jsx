import { Helmet } from "react-helmet-async"
import { BodyIronRiseHome } from "../IronRise/BodyIronRiseHome"
import { IronRiseLayout } from "../IronRise/ironRiseLayout/IronRiseLayout"


export const IronRise = () => {
  return (
    <>
      <Helmet>
        <title>Iron Badger Brotherhood</title>
        <meta name="description" content="Explore tokenized pacts, auctions, and powerful tools on Iron Badger." />

        {/* OpenGraph tags */}
        <meta property="og:title" content="Iron Badger Brotherhood" />
        <meta property="og:description" content="Explore tokenized pacts, auctions, and powerful tools on Iron Badger." />
        <meta property="og:image" content="https://www.iron-badger-brotherhood.xyz/assets/tassoIRonRise.png" />
        <meta property="og:url" content="https://www.iron-badger-brotherhood.xyz/" />
        <meta property="og:type" content="website" />

        {/* Twitter card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Iron Badger Brotherhood" />
        <meta name="twitter:description" content="Explore tokenized pacts, auctions, and powerful tools on Iron Badger." />
        <meta name="twitter:image" content="https://www.iron-badger-brotherhood.xyz/assets/tassoIRonRise.png" />
      </Helmet>
      <div className="bg-iron-rise">
        <IronRiseLayout>
          <BodyIronRiseHome />
        </IronRiseLayout>
      </div>
    </>
  )
}
