import { useDispatch } from "react-redux"
import { GetUserData } from '../../redux/userAuth'
import { useEffect} from "react";
import Navbar from "../../components/common/Navbar";
import Products from "../../components/common/Products";
import { useAuth0 } from "@auth0/auth0-react";
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
      const c = JSON.stringify(user)
      const d = JSON.parse(c)
      dispatch(GetUserData({ userData: d }))
  }

  useEffect(()=>{
    isAuthenticated ?
    handlRedux():''
  },[isAuthenticated])
  // const handleLogout=()=>{
  //   logout()
  //   dispatch(GetUserData({ userData: ''}))
  // }
  return (
    <>
      <Navbar />
      <Products data={data} />
    </>
  )
}

export default HomePage