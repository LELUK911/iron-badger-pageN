import { NavBarIronRise } from "../components/navbar/NavBarIronRise"
import Footer from '../../utils/components/Footer/Footer'


// eslint-disable-next-line react/prop-types
export const IronRiseLayout = ({children}) => {
  return (
    <>
        <NavBarIronRise/>
        {children}
        <Footer/>
    </>
  )
}
