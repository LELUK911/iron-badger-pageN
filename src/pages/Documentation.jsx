import { BodyDocumentation } from '../documentationPage/BodyDocumentation';
import { NavbarHomePage } from '../homePage/components/NavBar'
import Footer from '../utils/components/Footer/Footer';

export const Documentation = () => {



    return (
        <div className="bg-slate-900 min-h-screen text-white">
            <NavbarHomePage />
            <BodyDocumentation />
            <Footer />
        </div>
    )
}
