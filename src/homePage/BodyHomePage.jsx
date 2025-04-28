import Footer from "../utils/components/Footer/Footer"
import { PactsScheme } from "./components/PactsScheme"
import { DaoSection } from "./components/DaoSection"
import { GameSection } from "./components/GameSection"
import { NavbarHomePage } from "./components/NavBar"

export const BodyHomePage = () => {
    return (
        <div className="bg-slate-900 min-h-screen text-white">
            <NavbarHomePage/>
            <PactsScheme/>
            <GameSection/>
            <DaoSection/>
            <Footer/>
        </div>

    )
}
