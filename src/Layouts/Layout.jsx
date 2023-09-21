import Footer from './Footer/Footer'
import Navbar from './Header/Navbar'

function Layout({children}) {
  return (
    <div>
      <Navbar/>
      {children}
      <Footer/>
    </div>
  )
}

export default Layout
