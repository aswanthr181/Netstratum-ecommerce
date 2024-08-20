import AdminNavbar from '../../components/admin/AdminNavbar'
import NewProductFrom from '../../components/admin/NewProductFrom'

function ProductAdd() {
  return (
    <>
      <div className='flex-row md:flex h-screen overflow-y-scroll'>
        <AdminNavbar />
        <NewProductFrom />
      </div>
    </>
  )
}

export default ProductAdd