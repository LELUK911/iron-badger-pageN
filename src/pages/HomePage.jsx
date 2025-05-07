import { BodyHomePage } from "../homePage/BodyHomePage"
import { Helmet } from "react-helmet-async"


export const HomePage = () => {
    return (
        <>
            <Helmet>
                <title>Iron Badger Brotherhood</title>
                <meta name="description" content="Iron Badger is a DeFi Protocol where innovation meets auction-based lending and borrowing." />

                {/* Open Graph / Facebook */}
                <meta property="og:title" content="Iron Badger Brotherhood" />
                <meta property="og:description" content="Iron Badger is a DeFi Protocol where innovation meets auction-based lending and borrowing." />
                <meta property="og:image" content="https://www.iron-badger-brotherhood.xyz/assets/tassoSimbolo.png" />
                <meta property="og:url" content="https://www.iron-badger-brotherhood.xyz/" />
                <meta property="og:type" content="website" />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Iron Badger Brotherhood" />
                <meta name="twitter:description" content="Iron Badger is a DeFi Protocol where innovation meets auction-based lending and borrowing." />
                <meta name="twitter:image" content="https://www.iron-badger-brotherhood.xyz/assets/tassoSimbolo.png" />
            </Helmet>

            <BodyHomePage />
        </>
    )
}
