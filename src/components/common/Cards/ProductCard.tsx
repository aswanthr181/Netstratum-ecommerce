// import { FaHeart } from "react-icons/fa"
// import { useWishList } from "../../Context/WishListContext"
import axios from "axios"
import { useNavigate } from "react-router-dom"



function ProductCard({ product, data }: any) {
    const author = data.data

    const navigate = useNavigate()
    // const {addRemoveList}=useWishList()

    // const handleUpdateWishlist=()=>{
    //     addRemoveList(product)
    // }

    const handleNavigate = (productId: number,url:any,req:any) => {
        if(req==='api'){
            axios.delete(`https://fakestoreapi.com/products/${productId}`).then((res)=>{
                console.log('resssssssssss',res.data);
            })
        }else{
            navigate(`${url}/${productId}`)
        }
    }


    return (
        <>

            <div key={product.id} className="group  my-10 flex w-full max-w-xs flex-col overflow-hidden  rounded-lg border border-gray-100 bg-white shadow-md hover:opacity-85">
                <div className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl">
                    <img className="peer absolute top-0 right-0 h-full w-full object-cover" src={product.image} alt="product image" />
                    {/* <div onClick={handleUpdateWishlist}
                     className="absolute  top-2 right-2 w-[30px] h-[30px] rounded-full flex items-center justify-center bg-white">
                        <FaHeart className="text-red-600"/>
                    </div> */}

                    {/* <div className="absolute  bottom-0 mb-4 flex space-x-4 w-full justify-center">
                        
                    </div> */}
                </div>
                <div className="mt-4 px-5 pb-5">
                    <div className="h-[48px] overflow-hidden">
                        <h5 className="text-md tracking-tight text-slate-900">{product.title}</h5>
                    </div>
                    <div className="mt-2 mb-5 flex items-center justify-between">
                        <p>
                            <span className="text-xl font-bold text-slate-900">${product.price}</span>
                        </p>
                    </div>
                    {author.action.map((item:any,i: any) => {
                        return (
                            <div key={i} className="flex">
                                <div  onClick={() => handleNavigate(product.id,item.url,item.req)}
                                    className="w-full mb-1 flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
                                    {item.action}
                                </div>
                            </div>
                        )
                    })}

                </div>
            </div>
        </>
    )
}

export default ProductCard

