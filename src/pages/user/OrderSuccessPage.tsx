import Navbar from "../../components/common/Navbar"
import { FaCheckCircle } from 'react-icons/fa';
import { PDFDownloadLink } from '@react-pdf/renderer';
import OrderPdf from "../../components/user/OrderPdf";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";


function OrderSuccessPage() {
    const { orderList } = useSelector((state: RootState) => state.order)
    console.log(orderList, 'orrrrrrrrrrrrrrrr');
    const orderDetails = {
        
        date: orderList[orderList.length - 1].date,
        invoiceNumber: 'INV12345',
        billTo: {
            name: orderList[orderList.length - 1].name,
            address: orderList[orderList.length - 1].address,
            email: 'johndoe@example.com',
        },
        products: orderList[orderList.length - 1].products,
        subtotal: (orderList[orderList.length - 1].total).toFixed(3),
        tax: (orderList[orderList.length - 1].total*0.10).toFixed(3),
        total: (orderList[orderList.length - 1].total*1.10).toFixed(3),
    };

    return (
        <div>
            <Navbar />
            <div className=" h-screen">
                <div className="bg-white p-6  md:mx-auto">
                    <FaCheckCircle className="text-green-600 w-16 h-16 mx-auto my-6" />
                    <div className="text-center">
                        <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">Order Success!</h3>
                        <p className="text-gray-600 my-2">Thank you for completing your online shopping.</p>
                        <div className="bg-white py-8 antialiased  md:py-4">
                            <div className="mx-auto max-w-2xl px-4 2xl:px-0">
                                <p className="text-gray-500 dark:text-gray-400 mb-6 md:mb-8">Your order <a href="#" className="font-medium text-gray-900  hover:underline">#7564804</a> will be processed within 24 hours during working days. We will notify you by email once your order has been shipped.</p>
                                <div className="space-y-4 sm:space-y-2 rounded-lg border border-gray-100 bg-gray-50 p-6 dark:border-gray-700  mb-6 md:mb-8">
                                    <div className="sm:flex items-center justify-between gap-4">
                                        <div className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">Date</div>
                                        <div className="font-medium text-gray-900  sm:text-end">{orderList[orderList.length - 1].date} </div>
                                    </div>
                                    <div className="sm:flex items-center justify-between gap-4">
                                        <div className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">Payment Method</div>
                                        <div className="font-medium text-gray-900  sm:text-end">{orderList[orderList.length - 1].paymentType} </div>
                                    </div>
                                    <div className="sm:flex items-center justify-between gap-4">
                                        <div className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">Name</div>
                                        <div className="font-medium text-gray-900  sm:text-end">{orderList[orderList.length - 1].name}</div>
                                    </div>
                                    <div className="sm:flex items-center justify-between gap-4">
                                        <div className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">Adivress</div>
                                        <div className="font-medium text-gray-900  sm:text-end">{orderList[orderList.length - 1].address}</div>
                                    </div>
                                    <div className="sm:flex items-center justify-between gap-4">
                                        <div className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">Phone</div>
                                        <div className="font-medium text-gray-900  sm:text-end">{orderList[orderList.length - 1].phone}</div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <button className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 ">Track Your Order</button>
                                    <PDFDownloadLink
                                        document={<OrderPdf {...orderDetails} />}
                                        fileName="invoice.pdf"
                                        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                                    >
                                        Download Invoice as PDF
                                    </PDFDownloadLink>

                                    <button className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 ">Return to shopping</button>
                                </div>
                            </div>
                        </div>
                        {/* <div className="py-10 text-center">
                            <Link to='/'>
                                <button className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3">
                                    GO BACK
                                </button>
                            </Link>

                        </div> */}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default OrderSuccessPage