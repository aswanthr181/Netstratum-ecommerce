import Navbar from "../../components/common/Navbar"
import ProductDetail from "../../components/common/ProductDetail"

function ProductDetailPage() {
    return (
        <div>
            <Navbar />
            {/* <div className="flex items-center justify-center h-screen w-full px-5 ">
                <div className="flex bg-white rounded-lg lg:shadow-lg lg:border overflow-hidden max-w-sm lg:max-w-6xl w-full md:h-3/4"> */}
                    <ProductDetail />
                {/* </div>
            </div> */}
        </div >
    )
}

export default ProductDetailPage