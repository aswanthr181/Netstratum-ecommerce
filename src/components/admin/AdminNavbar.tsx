import { useNavigate } from "react-router-dom";
import { LogOutAdmin, CurrentPage } from "../../redux/adminAuth";
import { FaSignOutAlt, FaChartBar, FaImage, FaUser, FaHome } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";

function AdminNavbar() {
  const { adminData, current } = useSelector((state: RootState) => state.adminAuth)
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const sideBar = [
    { title: 'Home', icon: <FaHome className="h-5 w-5 mr-1 " />, url: '/portal' },
    { title: 'New Product', icon: <FaImage className="h-4 w-5 mr-1 " />, url: '/portal/addNew' },
    { title: 'Users', icon: <FaUser className="h-4 w-5 mr-1 " />, url: '/portal/users' },
    { title: 'Charts', icon: <FaChartBar className="h-5 w-5 mr-1 " />, url: '/portal/chart' }
  ]

  const handleNavigation = (url: string, i: number) => {
    dispatch(CurrentPage({ page: i }))
    navigate(url)
  }

  const exit = () => {
    dispatch(LogOutAdmin({ adminData: "" }))
    dispatch(CurrentPage({ page: 0 }))
    navigate("/portal/login");
  }

  return (

    <>
      <div className="sticky z-10  sm:left-4 top-4 bg-gradient-to-br from-gray-800 to-gray-900   my-4 sm:ml-4 md:h-[calc(100vh-32px)]  md:min-w-72 md:rounded-xl rounded-full transition-transform duration-300 translate-x-0 ">
        <div className="hidden md:block  relative border-b border-white/20">
          <a className="flex items-center gap-4 py-6 px-8" href="#/">
            <h6 className="hidden lg:block   text-base font-semibold leading-relaxed text-white">ADMIN PORTAL</h6>
          </a>

        </div>
        <div className="m-4 ml-3 mt-4 flex justify-between md:flex-col ">
          <ul className="mb-4 md:mt-0 mt-4 flex md:flex-col  gap-1">
            {sideBar.map((item, i) => (
              <li key={i}>
                <div className="relative group ">
                  <button onClick={() => handleNavigation(item.url, i)} className={` middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white w-full flex items-center gap-4 px-4 capitalize hover:bg-white/10 active:bg-white/30  ${i === current ? 'bg-gradient-to-tr from-blue-600 to-blue-400 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85]' : ''}`} type="button">
                    {item.icon}
                    <p className="hidden md:block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">{item.title} </p>
                    <span className=" absolute  left-1/2 transform -translate-x-1/2  hidden group-hover:block md:group-hover:hidden sm:block md:hidden px-2 py-1 text-xs text-white bg-black rounded-md">
                      {item.title}
                    </span>
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <ul className="mb-4 md:mt-0 mt-3 flex md:flex-col gap-0 sm:gap-1  flex-shrink-0 overflow-hidden">
            <li className="mx-3.5 mt-4 mb-2">
              <p className="hidden md:block antialiased font-sans text-sm leading-normal text-white font-black uppercase opacity-75">auth pages</p>
            </li>
            <li>
              <div className="relative group">
                <button onClick={() => handleNavigation('/', 0)} className="middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize" type="button">
                  <img
                    className="h-6 w-6 rounded-full"
                    src={adminData ? adminData.picture : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGlZkIqki43f4vMGa-DljqZBCOr6D6Cm_l_kDM06YEjL2QWlKZY_glSuSJGybsUIHmdpc&usqp=CAU"} alt="no" />
                  <p className="hidden md:block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">User Login</p>
                  {/* <span className=" absolute  left-1/2 transform -translate-x-1/2  hidden group-hover:block md:group-hover:hidden sm:block md:hidden px-2 py-1 text-xs text-white bg-black rounded-md">
                    User Login
                  </span> */}
                </button>
              </div>
            </li>
            <li className="md:mt-0 mt-1 ml-0">
              <div className="relative group">
                <button onClick={exit} className="middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center  gap-4 px-4 capitalize" type="button">
                  <FaSignOutAlt className="h-4 w-4 mr-1 ml-1" />
                  <p className="hidden md:block antialiased font-sans text-base leading-relaxed  font-medium capitalize">Log Out</p>
                  <div className=" absolute left-1/2  ">
                    <span className="h-full transform -translate-x-1/2  hidden group-hover:block  md:group-hover:hidden sm:block md:hidden px-2 py-1 text-xs text-white bg-black rounded-md" >
                      LogOut
                    </span>
                  </div>
                </button>
              </div>
            </li>



          </ul>
        </div>
      </div>
    </>
  );
}

export default AdminNavbar;



















// <div className="w-1/6 h-screen bg-gray-950 text-white flex flex-col sticky top-0 bottom-0 items-center  space-y-11">
//   <img src="" className="pt-10 md:pt-32 w-12" alt="" />
//   <div className="flex items-center" onClick={dashboard}>
//   <FontAwesomeIcon className="h-6 mr-2" icon={faImage} />
//     <div className="font-bold hidden md:block ">PRODUCT LIST</div>
//   </div>
//   <div className="flex items-center" onClick={addNew}>
//     <FontAwesomeIcon className="h-6 mr-2" icon={faFutbol} />
//     <div className="font-bold hidden md:block ">ADD NEW</div>
//   </div>
//   <div className="flex items-center" onClick={userget}>
//     <FontAwesomeIcon className="h-6 mr-2" icon={faUser} />
//     <div className="font-bold hidden md:block">USERLIST</div>
//   </div>
//   <div className="cursor-pointer flex items-center" onClick={getOrder}>
//   <FontAwesomeIcon className="h-6 mr-2" icon={faChartSimple} />

//     <div className="font-bold hidden md:block">Charts</div>
//   </div>
//   <div className="flex-grow"></div>

//   <div className="flex-row items-center">
//     <div className="mx-auto flex  justify-center">

// <img
//   className="h-8 w-8 rounded-full"
//   src={adminData ? adminData.picture : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGlZkIqki43f4vMGa-DljqZBCOr6D6Cm_l_kDM06YEjL2QWlKZY_glSuSJGybsUIHmdpc&usqp=CAU"}
//   // src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGlZkIqki43f4vMGa-DljqZBCOr6D6Cm_l_kDM06YEjL2QWlKZY_glSuSJGybsUIHmdpc&usqp=CAU"
//   alt="no"
// />
//     </div>

//     <div onClick={exit} className="mt-auto flex items-center">

//       <FontAwesomeIcon className="h-6 mr-2" icon={faArrowRightFromBracket} />
//       <div onClick={exit} className="mt-6  mb-6 hidden md:block font-bold">
//         Logout
//       </div>
//     </div>
//   </div>
// </div>