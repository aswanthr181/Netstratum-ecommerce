// import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useEffect, useState } from "react"
import ProductCard from "./Cards/ProductCard"
import { ProductType } from "../../Types/allType"
import { productApi } from "../../constants/api"
import Loader from "./Loader"
// const data = {
//     author: 'user',
//     action: [
//       { action: 'VIEW', url: '/productdetail', req: 'nav' }
//     ]
//   }
interface actionType {
    action: string
    url: string
    req: string
}
interface dataType {
    author: string
    action: actionType[]
}
interface ProductsProps {
    data: dataType
}
function Products({ data }: ProductsProps) {

    const [loading, setLoading] = useState<boolean>(true)
    const [products, setProducts] = useState<ProductType[]>([])
    const [categorys, setCategorys] = useState<string[]>([''])
    const [filterProduct, setFilterProduct] = useState<ProductType[]>([])
    const [search, setSearch] = useState<string>('')
    const [category, setCategory] = useState<string>('ALL PRODUCTS')


    useEffect(() => {
        setLoading(true)
        axios.get(`${productApi}`).then((result) => {
            setProducts(result.data)
            setFilterProduct(result.data)
            let categorySet = new Set<string>()
            result.data.forEach((product: ProductType) => {
                categorySet.add(product.category)
            })
            setCategorys([...categorySet])
            setLoading(false)
        })
    }, [])

    const handleFilter = (category: string) => {

        if (category === 'ALL PRODUCTS') {
            setFilterProduct([...products])
        } else {
            let categoryProduct: ProductType[] = []
            categoryProduct = products.filter((product: ProductType) => {
                return product.category === category
            })

            setFilterProduct([...categoryProduct])
        }
        setCategory(category)
    }


    const handleSearch = (searchText: string) => {

        setSearch(searchText)
        let searchProduct: ProductType[] = []
        searchProduct = filterProduct.filter((product: ProductType) => {
            return product.title.toLowerCase().includes(searchText.toLowerCase())
        })
        setFilterProduct([...searchProduct])
    }

    const handleAdminRemove = (productId: number) => {
        const updatedProducts = filterProduct.filter((product:ProductType) => product.id !== productId);
        setFilterProduct(updatedProducts);
    }

    const handlePriceFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const sort = parseInt(e.target.value, 10)
        const filteredCopy = [...filterProduct]
        if (sort > 0) {
            filteredCopy.sort((a, b) => a.price - b.price)
        } else {
            filteredCopy.sort((a, b) => b.price - a.price)
        }
        setFilterProduct([...filteredCopy])
    }

    return (
        <>
            {loading ?
                <Loader loading={loading} />
                :
                <div className="bg-white mx-auto flex  ">

                    <div className=" lg:w-[1200px] mx-auto max-w-2xl px-4 py-24 sm:py-24 lg:py-16 sm:px-6  lg:max-w-7xl lg:px-8 ">
                        <div className="flex flex-wrap lg:justify-between sm:justify-evenly ">
                            {categorys &&

                                <ul className="flex flex-wrap sm:gap-0 md:gap-2 lg:gap-5 pb-10">
                                    <li key={0} className="" >
                                        <button className="hover:bg-slate-100 p-4 rounded-md "
                                            onClick={() => handleFilter('ALL PRODUCTS')}>
                                            ALL
                                        </button>
                                    </li >

                                    {categorys.map((category, i) => {
                                        return (
                                            <>
                                                <li key={i + 1} className="" >
                                                    <button className="hover:bg-slate-100 p-4 rounded-md"
                                                        onClick={() => handleFilter(category)}>
                                                        {category}
                                                    </button>

                                                </li >
                                            </>
                                        )
                                    })}


                                </ul>
                            }
                            {

                                <div className="w-full  pb-10 lg:w-2/5  md:w-full flex justify-center items-center ">
                                    <div className="flex sm:justify-center gap-2 items-center w-full">

                                        <div className="">
                                            <select defaultValue="" onChange={handlePriceFilter} className="bg-white border border-gray-300  text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5   ">
                                                <option value="" disabled hidden>
                                                    SORT BY
                                                </option>
                                                <option value={1}  >Price Low To High</option>
                                                <option value={-1}  >Price High To Low</option>
                                            </select>
                                        </div>
                                        <div className="relative w-full">
                                            <input type="search" className="bg-white border border-gray-300  text-gray-900 text-sm rounded-lg  focus:border-black block w-full p-2.5"
                                                placeholder=" Search..."
                                                value={search}
                                                onChange={(e) => handleSearch(e.target.value)} />

                                        </div>
                                    </div>
                                </div>
                            }
                        </div>

                        <div className="flex   justify-center md:justify-start">
                            <h2 className="text-2xl font-bold tracking-tight text-gray-900">{category.toUpperCase()}</h2>
                        </div>

                        <div className=" mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 justify-center ">
                            {filterProduct.length > 0 ? filterProduct.map((product) => (
                                <div className="flex justify-center" key={product.id}>

                                    <ProductCard product={product} data={data} handleAdminRemove={handleAdminRemove} />

                                </div>
                            )) : <div><h1>NO PRODUCTS</h1></div>}
                        </div>
                    </div>
                </div >
            }
        </>
    )
}

export default Products