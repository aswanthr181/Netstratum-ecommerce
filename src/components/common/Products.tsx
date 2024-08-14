// import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useEffect, useState } from "react"
import { ClipLoader } from "react-spinners"
import ProductCard from "./Cards/ProductCard"

function Products({ ...data }) {
    const [loading, setLoading] = useState<any>()
    const [products, setProducts] = useState<any[]>([])
    const [categorys, setCategorys] = useState<string[]>(['ALL PRODUCTS'])
    const [filterProduct, setFilterProduct] = useState<any[]>([])
    const [search, setSearch] = useState<string>('')
    const [category, setCategory] = useState<string>('')


    // console.log(data);

    // const navigate = useNavigate()

    useEffect(() => {
        setLoading(true)
        axios.get('https://fakestoreapi.com/products').then((result) => {
            console.log(result.data);

            setProducts(result.data)
            setFilterProduct(result.data)
            let categorySet = new Set<string>()
            result.data.forEach((product: any) => {
                categorySet.add(product.category)
            })
            setCategorys([...categorySet])
            setCategory('ALL PRODUCTS')
            setLoading(false)
        })
    }, [])



    const handleFilter = (category: string) => {
        console.log(category)
        console.log('allll prdttttttttttt', products);
        let categoryProduct: any[] = []

        category === 'ALL PRODUCTS' ?
            setFilterProduct([...products])
            : (
                categoryProduct = products.filter((product: any) => {
                    return product.category === category
                })

            )

        setCategory(category)
        setFilterProduct([...categoryProduct])
        // if (category === 'ALL PRODUCTS') {
        //     setFilterProduct([...products])
        // } else {
        //     let categoryProduct: any[] = []
        //     categoryProduct = products.filter((product: any) => {
        //         return product.category === category
        //     })

        //     setFilterProduct([...categoryProduct])
        // }
        setCategory(category)
    }


    const handleSearch = (searchText: string) => {
        console.log('search111', searchText);

        setSearch(searchText)
        let searchProduct: any[] = []
        searchProduct = filterProduct.filter((product: any) => {
            return product.title.toLowerCase().includes(searchText.toLowerCase())
        })
        setFilterProduct([...searchProduct])
    }


    const handlePriceFilter = (e: any) => {
        const sort = e.target.value
        const sortedProduct = [...filterProduct]
        sort > 0 ?
            sortedProduct.sort((a, b) => a.price - b.price) : sortedProduct.sort((a, b) => b.price - a.price)
        setFilterProduct([...sortedProduct])
    }

    return (<>
        {loading ?
            <div className="flex  items-center justify-center h-screen overflow-y-scroll w-full">
                <ClipLoader color="green" loading={loading} size={70} />
            </div> :

            <div className="bg-white mx-auto flex ">

                <div className=" lg:w-[1200px] mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 ">
                    <div className="flex flex-wrap justify-between sm:justify-">
                        {categorys &&

                            <ul className="flex flex-wrap gap-5 pb-10">
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

                            <div className="w-full  pb-10 md:w-1/2 sm:w-full flex justify-center items-center ">
                                <div className="flex sm:justify-center items-center w-full">

                                    <div className="">
                                        <select onChange={handlePriceFilter} className="bg-white border border-gray-300  text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5   ">
                                            <option value={0} >SORT BY</option>
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

                    <div >
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900">{category.toUpperCase()}</h2>
                    </div>

                    <div className=" mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 justify-center ">
                        {filterProduct.length > 0 ? filterProduct.map((product) => (
                            <div className="flex justify-center" key={product.id}
                            >

                                <ProductCard product={product} data={data} />
                                {/* <h4>{product.price}</h4> */}

                            </div>
                        )) :
                            <div><h1>NO PRODUCTS</h1></div>}
                    </div>
                </div>
            </div >
        }
    </>
    )
}

export default Products