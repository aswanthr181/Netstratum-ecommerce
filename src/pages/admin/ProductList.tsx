import AdminNavbar from "../../components/admin/AdminNavbar"
import Products from "../../components/common/Products"

function ProductList() {

  const data = {
    author: 'admin',
    action: [
      { action: 'EDIT', url: '/portal/edit',req:'nav' },
      { action: 'REMOVE', url: '/portal/remove',req:'api' }
    ]
  }

  return (
    <div className='flex h-screen overflow-y-scroll'>
      <AdminNavbar />
      <Products data={data} />
    </div>
  )
}

export default ProductList