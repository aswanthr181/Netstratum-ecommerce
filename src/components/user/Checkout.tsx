import { useEffect, useState } from "react"
import { generateError } from "../../constants/Alerts"
import { Toaster } from 'react-hot-toast'
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import { newOrder } from "../../redux/order"
import { CartItem, UserCart } from "../../Types/allType"
import { useNavigate } from "react-router-dom"
import { clearCart } from "../../redux/cart"



function Checkout() {
    const [name, setName] = useState<string>('')
    const [phone, setPhone] = useState<number>(91)
    const [house, setHouse] = useState<string>('')
    const [street, setStreet] = useState<string>('')
    const [district, setDistrict] = useState<string>('')
    const [pin, setPin] = useState<number>(0)
    const [payment, setPayment] = useState<string>('')

    const [cart, useCart] = useState<CartItem[]>([])
    const [total, setTotal] = useState<number>(0)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { userData } = useSelector((state: RootState) => state.userAuth)
    const { cartList } = useSelector((state: RootState) => state.cart)
    useEffect(() => {
        const userCart = cartList.find((cart: UserCart) => cart.user === userData?.email)
        if (userCart) {
            useCart(userCart.cart)
            setTotal(userCart.total)

        }
    }, [cartList])

    const handleSubmission = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!name.trim() || !house.trim() || !street.trim() || !district.trim()) {
            generateError('Please fill all the field')
            return
        }
        if (!phone || phone.toString().length !== 10) {
            generateError("Enter a valid Phone")
            return
        }
        if (!pin || pin.toString().length !== 6) {
            generateError("Enter a valid Pin")
            return
        }
        if (!payment.trim()) {
            generateError("Select Payment Method")
        }
        try {
            const address: string = `${house}, ${street}, ${district}, ${pin}`
            const today = new Date()
            const day = (String(today.getDay())).padStart(2, '0')
            const month = (String(today.getMonth() + 1)).padStart(2, '0')
            const year = today.getFullYear()
            const date = `${day}/${month}/${year}`
            dispatch(newOrder({ user: String(userData?.email), products: cart, address, total, paymentType: payment, phone, status: "ordered", name, date }))
            dispatch(clearCart({ user: userData?.email }))
            navigate('/success')

        } catch (error) {
            generateError(String(error))
        }

    };
    return (
        <section className="bg-white py-8 antialiased md:py-16">
            <Toaster />

            <form onSubmit={handleSubmission} className="mx-auto max-w-screen-xl px-4 2xl:px-0">


                <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
                    <div className="min-w-0 flex-1 space-y-8">
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold text-gray-900 ">Delivery Details</h2>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-900 "> Name </label>
                                    <input maxLength={25} value={name} onChange={(e) => setName(e.target.value)} type="text" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 " placeholder="Name" />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-900 "> Phone </label>
                                    <input maxLength={10} value={phone} onChange={(e) => setPhone(Number(e.target.value))} type="text" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 " placeholder="Phone" />
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-900 "> House Name/No </label>
                                    <input maxLength={25} value={house} onChange={(e) => setHouse(e.target.value)} type="text" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 " placeholder="Phone" />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-900 "> street </label>
                                    <input maxLength={25} value={street} onChange={(e) => (setStreet(e.target.value))} type="text" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 " placeholder="Phone" />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-900 "> District </label>
                                    <input maxLength={25} value={district} onChange={(e) => setDistrict(e.target.value)} type="text" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 " placeholder="Phone" />
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-900 "> Pin </label>
                                    <input maxLength={7} value={pin} onChange={(e) => setPin(Number(e.target.value))} type="text" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 " placeholder="Phone" />
                                </div>


                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-gray-900 ">Payment</h3>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 ">
                                    <div className="flex items-start">
                                        <div className="flex h-5 items-center">
                                            <input type="radio" value="COD" checked={payment === "COD"} onChange={(e) => { setPayment(e.target.value) }}
                                                name="payment-method" className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 " />
                                        </div>

                                        <div className="ms-4 text-sm">
                                            <label className="font-medium leading-none text-gray-900 "> COD </label>
                                            <p className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">Pay On Delivery</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 w-full space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md">
                        <div className="flow-root">
                            <div className="-my-3 divide-y  ">
                                <dl className="flex items-center justify-between gap-4 py-3">
                                    <dt className="text-base font-normal text-gray-500 ">Subtotal</dt>
                                    <dd className="text-base font-medium text-gray-900 ">${total.toFixed(3)}</dd>
                                </dl>

                                <dl className="flex items-center justify-between gap-4 py-3">
                                    <dt className="text-base font-normal text-gray-500 ">Tax 10%</dt>
                                    <dd className="text-base font-medium text-gray-900 ">${(total * 0.10).toFixed(3)}</dd>
                                </dl>

                                <dl className="flex items-center justify-between gap-4 py-3">
                                    <dt className="text-base font-normal text-gray-500 ">shipping</dt>
                                    <dd className="text-base font-medium text-gray-900 ">$8 </dd>
                                </dl>

                                <dl className="flex items-center justify-between gap-4 py-3">
                                    <dt className="text-base font-normal text-gray-500 ">Discount</dt>
                                    <dd className="text-base font-medium text-green-500 ">$0</dd>
                                </dl>

                                <dl className="flex items-center justify-between gap-4 py-3">
                                    <dt className="text-base font-bold text-gray-900 ">Total</dt>
                                    <dd className="text-base font-bold text-gray-900 ">${(total + (total * 0.10) + 8).toFixed(3)}</dd>
                                </dl>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <button  type="submit" className="flex w-full items-center justify-center rounded-lg bg-orange-500 hover:bg-orange-400 px-5 py-2.5 text-sm font-medium  hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300 ">Proceed to Payment</button>

                            <p className="text-sm font-normal text-gray-500 ">One or more items in your cart require an account. <a href="#" title="" className="font-medium text-primary-700 underline hover:no-underline dark:text-primary-500">Sign in or create an account now.</a>.</p>
                        </div>
                    </div>
                </div>
            </form>
        </section>
    )
}

export default Checkout






// const formData = [
//     { label: 'Name', state: name, setFunction: setName, type: 'text', placeholder:'Enter Name' },
//     { label: 'Phone', state: phone, setFunction: setPhone, type: 'number', placeholder:'Enter Phone' },
//     { label: 'House', state: house, setFunction: setHouse, type: 'text', placeholder:'Enter House' },
//     { label: 'Street', state: street, setFunction: setStreet, type: 'text', placeholder:'Enter Street' },
//     { label: 'District', state: District, setFunction: setDistrict, type: 'text', placeholder:'Enter District' },
//     { label: 'Pincode', state: pin, setFunction: setPin, type: 'number', placeholder:'Enter PinCode' }
// ]