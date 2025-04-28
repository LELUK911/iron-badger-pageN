import Footer from '../../utils/components/Footer/Footer'
import { NavBarIronPact } from '../components/navbar/NavBarIronPact'

// eslint-disable-next-line react/prop-types
export const IronPactLayout = ({children}) => {
  return (
    <>
        <NavBarIronPact/>
        {children}
        <Footer/>
    </>
  )
}
