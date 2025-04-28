import { NavBarIronForge } from "../components/navbar/NavBarIronForge"
import Footer from '../../utils/components/Footer/Footer'

// eslint-disable-next-line react/prop-types
export const IronForgeLayout = ({children}) => {
  return (
    <>
        <NavBarIronForge/>
        {children}
        <Footer/>
    </>
  )
}
