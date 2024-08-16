import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxCross1 } from "react-icons/rx";
import { AiFillDelete } from "react-icons/ai";
import { decrementQuantity, incrementQuantity, removeFromCart } from "../../../redux/cart";
import Modal from "../Modal";
import { CartItem } from "../../../Types/allType";
import { RootState } from "../../../redux/store";


function CartCard({ item }: { item: CartItem }) {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const modalData={
        text:"Do you really want to remove this Product from Cart",
        action:"REMOVE"
    }

    const dispatch = useDispatch()
    const { userData } = useSelector((state: RootState) => state.userAuth)

    const handleQuantityUpdate = (task: number) => {
        task > 0 ?
            dispatch(incrementQuantity({ user: userData?.email, productId: item.id })) : dispatch(decrementQuantity({ user: userData?.email, productId: item.id }))
    }

    const handleRomove = () => {
        setIsModalOpen(true)
    }
    const handleAction = () => {
        dispatch(removeFromCart({ user: userData?.email, productId: item.id }))
        setIsModalOpen(false)


    }

    return (
        <>
            <li className="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0">
                <div className="shrink-0 relative">
                    <span className="absolute top-1 left-1 flex h-6 w-6 items-center justify-center rounded-full border bg-white text-sm font-medium text-gray-500 shadow sm:-top-2 sm:-right-2">{item.quantity}</span>
                    <img className="h-24 w-24 max-w-full rounded-lg object-cover" src={item.image} alt="" />
                </div>

                <div className="relative flex flex-1 flex-col justify-between ">
                    <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
                        <div className="pr-8 sm:pr-5">
                            <p className="text-base font-semibold text-gray-900">{item.title}</p>
                            <p className="mx-0 mt-1 mb-0 text-sm text-gray-400">${item.price}</p>
                        </div>

                        <div className="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end ">
                            <p className="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">${(item.price * item.quantity).toFixed(3)}</p>

                        </div>
                        <div className="flex items-center gap-1 border-gray-100">
                            <div className={`${item.quantity > 1 ? '' : ''}`}>
                                <button onClick={() => item.quantity > 1 && handleQuantityUpdate(-1)} className={`cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 ${item.quantity > 1 ? 'hover:bg-blue-500 hover:text-blue-50' : ''} `}> - </button>
                            </div><button onClick={() => handleQuantityUpdate(1)} className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"> + </button>
                        </div>
                    </div>

                    <div className="absolute top-0 right-0 flex sm:bottom-0 sm:top-auto">
                        <button onClick={handleRomove} type="button" className="flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900">

                            <RxCross1 />
                        </button>
                    </div>
                </div>
            </li>
            {isModalOpen && (
                <Modal setIsModalOpen={setIsModalOpen} handleAction={handleAction} modalData={modalData} icon={<AiFillDelete size={40} color="red" />} />
            )}
        </>

    )
}

export default CartCard