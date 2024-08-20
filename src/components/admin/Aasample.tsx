import { PhotoIcon, } from '@heroicons/react/24/solid'
function Aasample() {

    return (
        <>
            <div className="bg-white py-8 antialiased md:py-16">

                <form className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                    <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
                        <div className="min-w-0 flex-1 space-y-8">
                            <div className="space-y-4">
                                <h2 className="text-xl font-semibold text-gray-900 ">Delivery Details</h2>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <div className="mb-2 flex items-center gap-2">
                                            <label className="block text-sm font-medium text-gray-900 "> Category* </label>
                                        </div>
                                        <select id="select-city-input-3" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 ">
                                            <option value="" disabled hidden>
                                                Select Category
                                            </option>
                                            <option value="MEN'S CLOTHING">MEN'S CLOTHING</option>
                                            <option value="WOMEN'S CLOTHING">WOMEN'S CLOTHING</option>
                                            <option value="WOMEN'S CLOTHING">WOMEN'S CLOTHING</option>
                                            <option value="ELECTRONICS">ELECTRONICS</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-900 "> Product Name </label>
                                        <input maxLength={25} type="text" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 " placeholder="Product Name" />
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-900 "> Price </label>
                                        <input maxLength={10} type="text" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 " placeholder="Price" />
                                    </div>
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-900 "> Description </label>
                                        <input maxLength={25} type="text" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 " placeholder="Description" />
                                    </div>




                                </div>
                            </div>
                            <div className="col-span-full">
                                <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                                    Cover photo
                                </label>
                                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                    <div className="text-center">
                                        <PhotoIcon aria-hidden="true" className="mx-auto h-12 w-12 text-gray-300" />
                                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                            <label
                                                htmlFor="file-upload"
                                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                            >
                                                <span>Upload a file</span>
                                                <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        
                    </div>
                </form >
            </div >

        </>
    )
}

export default Aasample