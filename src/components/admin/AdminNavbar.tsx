import { useNavigate } from "react-router-dom";
import { LogOutAdmin } from "../../redux/adminAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faChartSimple,
  faFutbol,
  faImage,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";

function AdminNavbar() {
  const {adminData}=useSelector((state:any)=>state.adminAuth)
  const navigate = useNavigate();
  const dispatch=useDispatch()



  const addNew = () => {
    navigate("/portal/addNew");
  };

  const userget = () => {
    navigate("/portal/users");
  };

  const getOrder = () => {
    navigate("/portal/chart");
  };

  const dashboard = () => {
    navigate("/portal");
  };

  const exit = () => {
    dispatch(LogOutAdmin({adminData:""}))
    navigate("/portal/login");
  };

  return (
    <div className="w-1/6 h-screen bg-gray-950 text-white flex flex-col sticky top-0 bottom-0 items-center  space-y-11">
      <img src="" className="pt-10 md:pt-32 w-12" alt="" />
      <div className="flex items-center" onClick={dashboard}>
      <FontAwesomeIcon className="h-6 mr-2" icon={faImage} />
        <div className="font-bold hidden md:block ">PRODUCT LIST</div>
      </div>
      <div className="flex items-center" onClick={addNew}>
        <FontAwesomeIcon className="h-6 mr-2" icon={faFutbol} />
        <div className="font-bold hidden md:block ">ADD NEW</div>
      </div>
      <div className="flex items-center" onClick={userget}>
        <FontAwesomeIcon className="h-6 mr-2" icon={faUser} />
        <div className="font-bold hidden md:block">USERLIST</div>
      </div>
      <div className="cursor-pointer flex items-center" onClick={getOrder}>
      <FontAwesomeIcon className="h-6 mr-2" icon={faChartSimple} />

        <div className="font-bold hidden md:block">Charts</div>
      </div>
      <div className="flex-grow"></div>

      <div className="flex-row items-center">
        <div className="mx-auto flex  justify-center">

          <img
            className="h-8 w-8 rounded-full"
            src={adminData ? adminData.picture : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGlZkIqki43f4vMGa-DljqZBCOr6D6Cm_l_kDM06YEjL2QWlKZY_glSuSJGybsUIHmdpc&usqp=CAU"}
            // src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGlZkIqki43f4vMGa-DljqZBCOr6D6Cm_l_kDM06YEjL2QWlKZY_glSuSJGybsUIHmdpc&usqp=CAU"
            alt="no"
          />
        </div>

        <div onClick={exit} className="mt-auto flex items-center">

          <FontAwesomeIcon className="h-6 mr-2" icon={faArrowRightFromBracket} />
          <div onClick={exit} className="mt-6  mb-6 hidden md:block font-bold">
            Logout
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminNavbar;