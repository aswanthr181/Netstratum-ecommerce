import { useDispatch } from "react-redux"
import { GetUserData } from '../../redux/userAuth'
import { useEffect } from "react";
import Navbar from "../../components/common/Navbar";
import Products from "../../components/common/Products";
import { useAuth0 } from "@auth0/auth0-react";
import Footer from "../../components/user/Footer";
function HomePage() {
  const { user, isAuthenticated } = useAuth0()

  const dispatch = useDispatch()

  const data = {
    author: 'user',
    action: [
      { action: 'VIEW', url: '/productdetail', req: 'nav' }
    ]
  }

  const handlRedux = () => {
    dispatch(GetUserData({ userData: user }))
  }

  useEffect(() => {
    if(isAuthenticated){
      handlRedux()
    }
  }, [isAuthenticated])
  
  return (
    <>
      <div>
        <Navbar />
        <Products data={data} />
        <Footer />
      </div>
    </>
  )
}

export default HomePage