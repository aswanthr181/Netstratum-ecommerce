import AdminNavbar from "../../components/admin/AdminNavbar"
import Dashboard from "../../components/admin/Dashboard"

function DashBoardPage() {
  return (
    <>
      <div className='flex h-screen overflow-y-scroll'>
        <AdminNavbar/>
        <Dashboard />

      </div>
    </>
  )
}

export default DashBoardPage