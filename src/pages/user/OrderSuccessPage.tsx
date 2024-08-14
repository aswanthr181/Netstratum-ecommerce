import { Link } from "react-router-dom";
import Navbar from "../../components/common/Navbar"
import { FaCheckCircle } from 'react-icons/fa';


function OrderSuccessPage() {
  return (
    <div> 
        <Navbar/>
        <div className=" h-screen">
                <div className="bg-white p-6  md:mx-auto">
                    <FaCheckCircle className="text-green-600 w-16 h-16 mx-auto my-6" />
                    <div className="text-center">
                        <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">Order Success!</h3>
                        <p className="text-gray-600 my-2">Thank you for completing your online shopping.</p>
                        <p> Have a great day!  </p>
                        <div className="py-10 text-center">
                            <Link to='/'>
                                <button className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3">
                                    GO BACK
                                </button>
                            </Link>

                        </div>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default OrderSuccessPage