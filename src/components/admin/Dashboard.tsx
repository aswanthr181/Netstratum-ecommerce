import { useEffect, useState } from "react"
import { ProductType } from "../../Types/productType"
import axios from "axios"
import { Chart } from "chart.js/auto"
import { Bar, Pie } from 'react-chartjs-2'
import { CategoryScale } from 'chart.js/auto'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import Chart1 from "./Chart"
import LineChart from "./LineChart"
Chart.register(CategoryScale, ChartDataLabels)

function Dashboard() {
    const [product, setProduct] = useState<ProductType[]>([])
    const [categorys, setCategorys] = useState<{ [key: string]: number }>({})
    const [lineOption, setLineOption] = useState("PRODUCT PRICE")
    const [loading, setLoading] = useState(true);

    const handleType = (e: any) => {
        setLineOption(e.target.value)
    }
console.log('opttttt',lineOption);

    const fetchProducts = async () => {
        try {
            const result = await axios.get('https://fakestoreapi.com/products')
            setProduct(result.data)
            let categoriesCount: { [key: string]: number } = {}
            result.data.forEach((product: ProductType) => {
                const category = product.category
                if (categoriesCount[category]) {
                    categoriesCount[category] += 1
                } else {
                    categoriesCount[category] = 1
                }
            })
            setCategorys(categoriesCount)
            setLoading(false);


        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchProducts()
        setLoading(false);
        return () => {

        }
    }, [])
    const pieChartData = {
        labels: Object.keys(categorys),
        datasets: [
            {
                label: 'Categories',
                data: Object.values(categorys),
                backgroundColor: [
                    '#A30000',
                    '#005F60',
                    '#F4B678',
                    '#4CB140'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1,
            },
        ],

    };




    console.log('hi');
    console.log('ppp', product, categorys)


    return (
        <>
            <div className="flex  justify-center items-center mt-1 w-full overflow-y-scroll">

                <div className="h-full pb-6 flex justify-center rounded-sm  shadow-md md:left-[16%] bg-opacity-10 w-[98%] md:w-10/12 ">
                    <div className="h-[70%] flex flex-grow w-full mt-[1%] ml-[2%]  lg:flex md:gap-x-3">
                        <div className="flex flex-grow  flex-col">
                            <div className="grid grid-cols-12  w-full lg:flex gap-2 lg:gap-3 lg:justify-center mt-2">
                                <div className="  col-span-4 sm:w-[16rem]  text-center   rounded-md shadow-md bg-gradient-to-t to-blue-600 from-blue-400">
                                    <h1 className="mt-[2%] font-medium text-lg text-white">TOTAL PRODUCTS</h1>
                                    <h1 className="mt-[2%] font-semibold sm:text-4xl">
                                        {product ? product.length : 0} </h1>
                                </div>
                                <div className="  col-span-4 sm:w-[16rem]  h-[6rem] text-center rounded-md shadow-md  bg-gradient-to-t to-blue-600 from-blue-400">
                                    <h1 className="mt-[2%] font-medium text-lg text-white">TOTAL CATEGORYS</h1>
                                    <h1 className="mt-[2%] font-semibold sm:text-4xl ">{categorys ? Object.keys(categorys).length : 0}</h1>
                                </div>
                                <div className="  col-span-4 sm:w-[16rem]   h-[6rem] text-center rounded-md shadow-md  bg-gradient-to-t to-blue-600 from-blue-400">
                                    <h1 className="mt-[2%] font-medium text-lg text-white">TOTAL REVENUE</h1>
                                    <h1 className="mt-[2%] font-semibold sm:text-4xl">₹0</h1>
                                </div>
                            </div>
                            <div className="flex">
                                
                                {/* <div class="flex-grow w-1/4 pr-2">
                    
                    <select
                        value={selectedMonth} // Set the value of the select element
                        onChange={handleMonthChange}
                        placeholder="PLZ" class=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400" >
                        <option value="" >None</option>
                        <option value="1" >Januery</option>
                        <option value="2" >Febreury</option>
                        <option value="3" >March</option>
                        <option value="4" >April</option>
                        <option value="5" >May</option>
                        <option value="6" >June</option>
                        <option value="7" >July</option>
                        <option value="8" >August</option>
                        <option value="9" >september</option>
                        <option value="10" >October</option>
                        <option value="11" >November</option>
                        <option value="12" >December</option>
                    </select>

                </div> */}
                            </div>
                            {product.length > 0 && !loading && pieChartData &&
                                <div className="flex flex-col justify-center items-center w-full">
                                    <div className=" flex flex-col gap-20 justify-center items-center w-[99%] lg:w-full ">

                                        <div className="lg:w-[99%]  mt-4 m-auto  rounded-md  bg-white">
                                            <select onChange={handleType}
                                             className='w-full px-4 py-2.5 mt-2 bg-gray-100 hover:bg-gray-200 rounded-lg '   >
                                                <option className="bg-gray-100 hover:bg-gray-200" value="PRODUCT PRICE">PRODUCT PRICE</option>
                                                <option className="bg-gray-100 hover:bg-gray-200" value="PRODUCT RATING">PRODUCT RATING</option>
                                            </select>
                                            <LineChart products={product} lineOption={lineOption} />


                                        </div>
                                        <div className="flex w-full">
                                            <div className="  lg:h-full w-[50%] lg:w-full ">
                                                <div
                                                    className="flex-grow">

                                                    <button className=" text-black placeholder-gray-400 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-100  hover:border-blueGray-500 hover:bg-gray-200  focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400" >Category Rating</button>
                                                </div>
                                                <div className="lg:w-[99%]   m-auto  rounded-md shadow-md bg-white">
                                                    <Chart1 products={product} />


                                                </div>
                                            </div>
                                            <div className="  lg:h-full w-[50%] lg:w-full ">
                                                <div
                                                    className="flex-grow">
                                                    <button className=" text-black placeholder-gray-400 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-100  hover:border-blueGray-500 hover:bg-gray-200  focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400" >Category Count</button>
                                                </div>
                                                <div className="lg:w-[99%]   m-auto  rounded-md shadow-md bg-white">
                                                    <Pie data={pieChartData} />


                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>}
                        </div>

                    </div>
                </div>
            </div>

            {/* <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        <ChartThree />
        <MapOne />
        <div className="col-span-12 xl:col-span-8">
          <TableOne />
        </div>
        <ChatCard />
      </div> */}
        </>
        // <div className=" w-full flex flex-wrap gap-6">
        //     <div className="shadow-lg w-full lg:w-1/3 p-5">

        //         {loading ? (<h1>Data loading</h1>) :
        //             (<Pie data={pieChartData} />)}
        //         {/* <Pie data={pieChartData} /> */}
        //     </div>
        //     {product.length > 0 ?
        //         <div className="shadow-lg w-1/2 sm:w=full gap-20 ">
        //             <div>
        //             <Chart1 products={product} /></div>
        //             <div>
        //             <LineChart products={product} /></div>
        //         </div> :
        //         <div>

        //         </div>
        //     }

        // </div>
    )
}

export default Dashboard