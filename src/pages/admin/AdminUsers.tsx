import AdminNavbar from "../../components/admin/AdminNavbar"
import Users from "../../components/admin/Users"

function AdminUsers() {
    return (
        <div className='flex-row md:flex h-screen overflow-y-scroll'>

            <AdminNavbar />
            <Users />
        </div>
    )
}

export default AdminUsers