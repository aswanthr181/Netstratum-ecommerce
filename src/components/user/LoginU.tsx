import { useAuth0 } from "@auth0/auth0-react"


function LoginU() {
    const { loginWithRedirect} = useAuth0()

    return (
        <>
            

            
            <div className="flex font-poppins shadow-lg items-center justify-center  min-w-screen min-h-screen">
                <div className="grid gap-8">
                    <div className="bg-gradient-to-r shadow-lg from-blue-500 to-purple-500 rounded-[26px] m-4 ">
                        <div className="border-[20px] border-transparent rounded-[20px]  bg-white shadow-lg xl:p-10 2xl:p-10 lg:p-10 md:p-10 sm:p-2 m-2">
                            <h1 className="pt-8 pb-6 font-bold text-5xl dark:text-gray-400 text-center cursor-default">
                                LOG IN
                            </h1>
                            <form className="space-y-4">
                                <div>
                                    <label className="mb-2  text-lg">Email</label>
                                    <input className="border   dark:border-gray-700 p-3 shadow-md placeholder:text-base border-gray-300 rounded-lg w-full focus:scale-105 ease-in-out duration-300"
                                        type="email"
                                        placeholder="Email"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="mb-2  text-lg">Password</label>
                                    <input className="border   dark:border-gray-700 p-3 mb-2 shadow-md placeholder:text-base border-gray-300 rounded-lg w-full focus:scale-105 ease-in-out duration-300"
                                        type="password"
                                        placeholder="Password"
                                        required
                                    />
                                </div>
                                <button className="bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg mt-6 p-2 text-white rounded-lg w-full hover:scale-105 hover:from-purple-500 hover:to-blue-500 transition duration-300 ease-in-out"
                                    type="submit" >
                                    LOG IN 
                                </button>
                            </form>


                            <div className="flex items-center justify-center mt-5 flex-wrap">
                                <button onClick={() => loginWithRedirect()} className="hover:scale-105 ease-in-out duration-300 shadow-lg p-2 rounded-lg m-1">
                                    <img
                                        className="max-w-[25px]"
                                        src="https://ucarecdn.com/8f25a2ba-bdcf-4ff1-b596-088f330416ef/"
                                        alt="Google"
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginU