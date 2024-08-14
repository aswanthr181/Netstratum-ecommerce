import { useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import GoogleLogins from "./GoogleLogins"

function Login() {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const navigate = useNavigate()

    const data = {
        email: "abc@gmail.com",
        password: "1234"
    }
    const generateError = (error: string) => toast.error(error, { position: 'bottom-center' })

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        if (!email.trim() || !password.trim()) {
            generateError("Please fill in all the fields");
            return;
        }
        const emailRegex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
        if (!email.match(emailRegex)) {
            generateError("Please enter a valid email address");
            return;
        }

        try {
            if (email === data.email && password === data.password) {
                navigate('/')
            } else {
                generateError("Email or password is wrong");
            }
        } catch (error) {
            generateError("An error occurred. Please try again.");
            console.error(error);
        }

    }

    return (
        <div>
            <div className="flex items-center justify-center h-screen w-full px-5 sm:px-0">
                <Toaster position='top-center' reverseOrder={false} />

                <div className="flex bg-white rounded-lg shadow-lg border overflow-hidden max-w-sm lg:max-w-4xl w-full md:h-2/3">
                    <div
                        className=" hidden md:block  lg:w-1/2 bg-cover "
                        style={{
                            backgroundImage: `url(https://media.licdn.com/dms/image/C510BAQHdiY0P2Dv1oA/company-logo_200_200/0/1630628090078/netstratum_logo?e=2147483647&v=beta&t=ZKPPgE_xXaENiTe0LfuBH07kAnK6aTOa8visO3mT-nE)`,
                            backgroundSize: '80%',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',


                        }}>
                    </div>

                    <div className="w-full p-14 lg:w-1/2">
                        <p className="text-xl text-gray-600 text-center">Welcome back!</p>
                        <div className="mb-5 flex justify-center items-center">
                            <GoogleLogins generateError={generateError} />
                        </div>
                        <p className="text-xl text-gray-600 text-center">OR</p>
                        <form onSubmit={handleLogin}>
                            <div className="mt-4  ">
                                <div className="flex justify-between">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Email Address
                                    </label>
                                </div>
                                <input
                                    className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700 shadow-lg"
                                    type="text"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}


                                />
                            </div>

                            <div className="mt-4 flex flex-col ">
                                <div className="flex justify-between">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Password
                                    </label>
                                </div>
                                <input
                                    className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700 shadow-lg"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />

                            </div>
                            <div className="mt-8">
                                <button type='submit'
                                    className="bg-blue-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-600">
                                    Login
                                </button>
                            </div>
                        </form>
                        <a
                            href="#"
                            className=" flex items-center justify-center mt-4 text-white rounded-lg shadow-md hover:bg-gray-100"
                        >

                        </a>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login