
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/user/HomePage'
import Login from './components/common/Login'

import ProductDetailPage from './pages/user/ProductDetailPage'
import ProductList from './pages/admin/ProductList'
import ProductEdit from './pages/admin/ProductEdit'
import ProductAdd from './pages/admin/ProductAdd'
import LoginU from './components/user/LoginU'
import { useSelector } from 'react-redux'
import CartPage from './pages/user/CartPage'
import OrderSuccessPage from './pages/user/OrderSuccessPage'
import DashBoardPage from './pages/admin/DashBoardPage'
import UserChat from './components/user/UserChat'
import AdminUsers from './pages/admin/AdminUsers'
import { RootState } from './redux/store'

function App() {
const {adminData}=useSelector((state:RootState)=>state.adminAuth)
const {userData}=useSelector((state:RootState)=>state.userAuth)
// const {isAuthenticated}=useAuth0()


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/log' element={userData?<HomePage />:<LoginU/>} />

          <Route path='/productDetail/:productId' element={<ProductDetailPage />} />
          <Route path='/cart' element={userData?<CartPage/>:<LoginU/>} />
          <Route path='/success' element={userData?<OrderSuccessPage/>:<LoginU/>} />
          {/* <Route path='/chat' element={userData?<UserChat/>:<LoginU/>} /> */}

          <Route path='/portal/login' element={adminData?<ProductList/>:<Login />} />
          <Route path='/portal' element={adminData?<ProductList />:<Login />} />
          <Route path='/portal/addNew' element={adminData?<ProductAdd />:<Login/>} />
          <Route path='/portal/edit/:productId' element={adminData?<ProductEdit />:<Login/>} />
          <Route path='/portal/chart' element={adminData?<DashBoardPage/>:<Login/>} />
          {/* <Route path='/portal/users' element={adminData?<AdminUsers/>:<Login/>} /> */}

        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
