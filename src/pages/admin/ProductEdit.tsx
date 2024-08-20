import { useParams } from "react-router-dom"

import AdminNavbar from "../../components/admin/AdminNavbar"
import ProductForm from "../../components/admin/ProductForm"
// import { useEffect, useState } from "react"
// import axios from "axios"

function ProductEdit() {
  const {productId}=useParams<string>()
  
  return (
  <>    
     <div className='flex-row md:flex h-screen overflow-y-scroll'>
      <AdminNavbar/>
      <ProductForm id={productId}/>
     </div>
    </> 
  )
}

export default ProductEdit