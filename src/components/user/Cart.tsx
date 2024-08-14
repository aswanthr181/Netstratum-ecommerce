import { Link, useNavigate } from "react-router-dom"
import CartCard from "../common/Cards/CartCard"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"


function Cart() {
    const [cart, useCart] = useState([])
    const [total,setTotal]=useState<number>(0)
    const navigate = useNavigate()
    const { cartList } = useSelector((state: any) => state.cart)
    const { userData } = useSelector((state: any) => state.userAuth)
    console.log('uuuu', userData.email);

    useEffect(() => {
        const userCart = cartList.find((cart: any) => cart.user === userData.email)
        // const {cartList} =useSelector((state:any)=>state.cart)
        if (userCart) {
            useCart(userCart.cart)
            setTotal(userCart.total)

        }
    }, [cartList])

    const handlePlaceOrder = () => {
        setTimeout(() => {
            navigate('/success')
        }, 500)
    }
    console.log(cart, 'carrrrr');

    return (
        <>
            {cart && cart.length > 0 ?
                <div className="h-screen  py-12 sm:py-16 lg:py-20">
                    <div className="mx-auto px-4  sm:px-6 lg:px-8">
                        <div className="flex items-center justify-center">
                            <h1 className="text-2xl font-semibold text-gray-900">Your Cart</h1>
                        </div>

                        <div className="mx-auto mt-8 max-w-md md:mt-12">
                            <div className="rounded-3xl bg-white shadow-lg">
                                <div className="px-4 py-6 sm:px-8 sm:py-10">
                                    <div className="flow-root">
                                        <ul className="-my-8">
                                            {cart.map((item: any) => (
                                                <CartCard key={item.id} item={item} />
                                            ))}
                                        </ul>
                                    </div>

                                    <hr className="mx-0 mt-6 mb-0 h-0 border-r-0 border-b-0 border-l-0 border-t border-solid border-gray-300" />

                                    <div className="mt-6 space-y-3 border-t border-b py-8">
                                        <div className="flex items-center justify-between">
                                            <p className="text-gray-400">Subtotal</p>
                                            <p className="text-lg font-semibold text-gray-900">${(total).toFixed(3)}</p>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <p className="text-gray-400">Tax 10%</p>
                                            <p className="text-lg font-semibold text-gray-900">${((total*0.10)).toFixed(3)}</p>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <p className="text-gray-400">Shipping</p>
                                            <p className="text-lg font-semibold text-gray-900">$8.00</p>
                                        </div>
                                    </div>
                                    <div className="mt-6 flex items-center justify-between">
                                        <p className="text-sm font-medium text-gray-900">Total</p>
                                        <p className="text-2xl font-semibold text-gray-900"><span className="text-xs font-normal text-gray-400">USD</span>{((total+8+(total*0.10)).toFixed(3))} </p>
                                    </div>

                                    <div className="mt-6 text-center">
                                        <button onClick={handlePlaceOrder}
                                            type="button" className="group inline-flex w-full items-center justify-center rounded-md bg-orange-500 px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800">
                                            Place Order
                                            <svg xmlns="http://www.w3.org/2000/svg" className="group-hover:ml-8 ml-4 h-6 w-6 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
                                                <path  d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div className=" h-screen flex justify-center items-center">
                    <div className="bg-white p-6  md:mx-auto">
                        <div className="text-center">
                            <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">Cart is Empty!</h3>
                            <p className="text-gray-600 my-2">Shop Now.</p>
                            <div className="py-10 text-center">

                                <Link to='/'>
                                    <button className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-lg">
                                        GO BACK
                                    </button>
                                </Link>

                            </div>
                        </div>
                    </div>
                </div>
            }
        </>

    )
}

export default Cart