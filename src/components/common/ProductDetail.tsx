import { IoMdHeartEmpty } from "react-icons/io";
import { BsCart } from "react-icons/bs";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { useEffect, useState } from "react";
import axios from 'axios'
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { addTocart } from "../../redux/cart";

function ProductDetail() {
    const [productData, setProductData] = useState<any>()
    const { productId } = useParams()
    const { isAuthenticated, user } = useAuth0()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { cartList } = useSelector((state: any) => state.cart)

    useEffect(() => {
        axios.get(`https://fakestoreapi.com/products/${productId}`).then((response) => {
            setProductData(response.data)
        })
    }, [])

    const handleAddToCart = () => {
        isAuthenticated ?

            dispatch(addTocart({ user: user?.email, product: productData })) :
            navigate('/log')
    }
    console.log('carrrrrt', cartList);

    return (<>
        {productData &&
            <div className=" w-full  h-screen md:py-5">
                {/* <Wrapper> */}
                <div className=" flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[100px]">

                    {/* left column start */}
                    <div className=" w-1/2 md:w-auto    max-w-[500px] lg:max-w-full mx-auto lg:mx-0">
                        <div className="text-white   text-[20px] lg:w-full max-w-[1300px] mx-auto sticky top-[50px]">
                            <img className="" src={productData ? productData.image : "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNob2VzfGVufDB8fDB8fHww"} />
                        </div>
                    </div>
                    {/* left column end */}


                    {/* right column start */}
                    <div className=" lg:w-1/2 overscroll-y-auto flex-  py-3">
                        {/* Product title */}
                        <div className=" text-[24px] font-semibold mb-3">
                            {productData?.title}
                        </div>
                        {/* Product subtitle */}
                        <div className=" text-xl font-semibold mb-5">
                            {productData?.category}
                        </div>
                        {/* Product price */}
                        <div className=" text-lg font-semibold mb-0">MRF : $ {productData?.price}</div>
                        <div className=" text-base font-medium text-black/[.5]">
                            |
                        </div>
                        <div className=" overflow-hidden text-base font-medium text-black/[.5]">
                            {productData?.description}
                        </div>

                        {/* Product size range start */}
                        <div className=" mb-10 mt-10">
                            

                            {/* Size selection */}
                            <div className=" ">
                                <div className="flex items-center gap-2">

                                    <span className="flex ml-3 pl-3 py-2  ">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <svg
                                                key={star}
                                                className={`w-6 h-6 cursor-pointer  ${star <= productData?.rating.rate
                                                    ? "text-yellow-500"
                                                    : "text-gray-100"
                                                    }`}
                                                fill="currentColor"
                                                viewBox="0 0 20 20">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z"
                                                    clipRule="evenodd" />
                                            </svg>
                                        ))}
                                    </span>
                                    <span className="pl-2 font-normal leading-7 text-gray-500 text-sm ">{productData?.rating.count} review</span>
                                </div>

                            </div>
                            
                        </div>
                        {/* Product size range end */}

                        {/* Buttons start */}
                        <div className="">
                            <button onClick={handleAddToCart}
                                className=" w-full py-4   flex items-center justify-center gap-2 mb-10   rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95  hover:opacity-75">
                                Add to Cart
                                <BsCart size={18} />
                            </button>
                            <button className=" w-full py-4 border border-black flex items-center justify-center gap-2 mb-10 rounded-full bg-white text-black text-lg font-medium transition-transform active:scale-95 hover:opacity-75">
                                Whishlist
                                <IoMdHeartEmpty size={20} />
                            </button>
                        </div>
                        {/* Buttons end */}
                    </div>
                    {/* right column end */}
                </div>
                {/* </Wrapper> */}
            </div>}
    </>
    )
}

export default ProductDetail