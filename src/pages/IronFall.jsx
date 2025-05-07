import { BodyIronFallHome } from '../IronFall/BodyIronFallHome'
import { IronFallLayout } from '../IronFall/ironFallLayout/IronFallLayout'
import { Helmet } from "react-helmet-async"


export const IronFall = () => {
  return (
    <div className='bg-iron-fall'>
      <Helmet>
        <title>Iron Fall | Iron Badger Brotherhood</title>
        <meta name="description" content="Participate in downward auctions and explore falling prices with Iron Fall." />

        {/* Open Graph / Facebook */}
        <meta property="og:title" content="Iron Fall | Iron Badger Brotherhood" />
        <meta property="og:description" content="Participate in downward auctions and explore falling prices with Iron Fall." />
        <meta property="og:image" content="https://www.iron-badger-brotherhood.xyz/assets/TassoIronFAll.png" />
        <meta property="og:url" content="https://www.iron-badger-brotherhood.xyz/app.ironfall" />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Iron Fall | Iron Badger Brotherhood" />
        <meta name="twitter:description" content="Participate in downward auctions and explore falling prices with Iron Fall." />
        <meta name="twitter:image" content="https://www.iron-badger-brotherhood.xyz/assets/TassoIronFAll.png" />
      </Helmet>

      <IronFallLayout>
        <BodyIronFallHome />
      </IronFallLayout>
    </div>
  )
}
