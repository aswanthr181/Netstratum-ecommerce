import { useLocation, useNavigate } from "react-router-dom"

function Error() {
    const navigate=useNavigate()
    const location=useLocation()
    const currentPath = location.pathname;

    const handleGoBack = () => {
        navigate(-1);
    };

    const handleNavigateHome=()=>{
        if(currentPath.startsWith('/portal')){
            navigate('portal')
        }else{
            navigate('/')
        }
    }
    return (
        <div className="bg-gradient-to-r from-slate-200 to-gray-200  text-black ">
            <div className="flex items-center justify-center min-h-screen px-2">
                <div className="text-center">
                    <h1 className="text-9xl font-bold">404</h1>
                    <p className="text-2xl font-medium mt-4">Oops! Page not found</p>
                    <p className="mt-4 mb-8">The page you're looking for doesn't exist or has been moved.</p>
                    <div className="flex gap-10 justify-center">
                        <button onClick={handleGoBack}
                            className="px-6  py-3 rounded-full bg-gray-700 hover:bg-gray-600 text-white">
                            Previous 
                        </button>
                        <button onClick={handleNavigateHome}
                            className="px-6 py-3 rounded-full bg-gray-700 hover:bg-gray-600 text-white">
                            Go Home
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Error