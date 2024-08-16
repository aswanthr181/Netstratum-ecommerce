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
    console.log("usssssssssssss", user);

    // const c = JSON.stringify(user)
    // const d = JSON.parse(c)
    dispatch(GetUserData({ userData: user }))
  }

  useEffect(() => {
    isAuthenticated ?
      handlRedux() : ''
  }, [isAuthenticated])
  // const handleLogout=()=>{
  //   logout()
  //   dispatch(GetUserData({ userData: ''}))
  // }
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