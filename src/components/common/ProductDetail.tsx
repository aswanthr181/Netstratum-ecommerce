import { useEffect, useState } from "react";
import axios from 'axios'
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BsCart } from "react-icons/bs";
import { useAuth0 } from "@auth0/auth0-react";
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { addTocart } from "../../redux/cart";
import { ProductType } from "../../Types/allType";
import { productApi } from "../../constants/api";
import { RootState } from "../../redux/store";
import { Toast } from "../../constants/Alerts";
import Loader from "./Loader";


function ProductDetail() {
    const { loginWithRedirect } = useAuth0()
    const [productData, setProductData] = useState<ProductType>()
    const [loading, setLoading] = useState<boolean>(true)
    const { productId } = useParams<string>()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { userData } = useSelector((state: RootState) => state.userAuth)


    useEffect(() => {
        axios.get(`${productApi}/${productId}`).then((response) => {
            setProductData(response.data)
            setLoading(false)
        })
    }, [])

    const handleAddToCart = () => {
        if (userData) {
            dispatch(addTocart({ user: userData?.email, product: productData }))
            Toast.fire({
                icon: "success",
                title: "PRODUCT ADDED TO CART ",
            })
            navigate('/cart')
        } else {
            loginWithRedirect()
        }

    }

    return (
        <>
            {loading ?
                <Loader loading={loading} />
                :
                
                <section className="py-8 bg-white md:py-16   max-w-screen-lg mx-auto">
                    <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0 sm:pt-56 lg:pt-0">
                        <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16 items-center">
                            <div className="shrink-0 h-[60%] max-w-md lg:max-w-lg mx-auto">
                                <img
                                    className="w-full h-full overflow-hidden object-contain"
                                    src={productData?.image}
                                    alt=""
                                />
                            </div>

                            <div className="mt-6 sm:mt-8 lg:mt-0">
                                <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">
                                    {productData?.title}
                                </h1>
                                <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
                                    <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
                                        ${productData?.price}
                                    </p>

                                    <div className="flex items-center gap-2 mt-2 sm:mt-0">
                                        <div className="flex items-center gap-1">
                                            {/* Rating stars (5 stars) */}
                                            {[...Array(5)].map((_, i) => (
                                                <svg
                                                    key={i}
                                                    className="w-4 h-4 text-yellow-300"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                                                </svg>
                                            ))}
                                        </div>
                                        <p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
                                            (5.0)
                                        </p>
                                        <a
                                            href="#"
                                            className="text-sm font-medium leading-none text-gray-900 underline hover:no-underline"
                                        >
                                            345 Reviews
                                        </a>
                                    </div>
                                </div>

                                <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
                                    <button onClick={handleAddToCart}
                                        className="flex items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
                                        role="button"
                                    >
                                        <BsCart size={18} />
                                        Add to Cart
                                    </button>

                                    
                                </div>

                                <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

                                <p className="mb-6 text-gray-500 dark:text-gray-400">
                                    {productData?.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            }
        </>
    )
}

export default ProductDetail