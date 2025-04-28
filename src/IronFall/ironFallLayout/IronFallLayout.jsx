import { NavBarIronFall } from "../components/navbar/NavBarIronFall"
import Footer from '../../utils/components/Footer/Footer'

// eslint-disable-next-line react/prop-types
export const IronFallLayout = ({children}) => {
  return (
    <>
        <NavBarIronFall/>
        {children}
        <Footer/>
    </>
  )
}
