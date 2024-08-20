import { generateError } from "../../constants/Alerts"
interface formType {
    setTitle: (title: string) => void
    setPrice: (price: string) => void
    setDescription:(description:string)=>void
    setCategory:(category:string)=>void
    base64: (file:File) => void
    handleSubmission: (e: React.FormEvent<HTMLFormElement>) => void
    description:string
    title:string
    price:string
    image:string

}

function Form({ setTitle, setPrice, base64, handleSubmission, setDescription, title, price, description, setCategory, image }: formType) {
    const handlePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(Number(e.target.value));

        if (typeof (Number(e.target.value)) !== 'number') {
            generateError("please type a number")
        } else {
            setPrice((e.target.value))
        }

    }
    return (<>
        <div className="bg-white py-8 w-full md:w-[90%]  antialiased md:py-16">

            <form onSubmit={handleSubmission} className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
                    <div className="min-w-0 flex-1 space-y-8">
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold text-gray-900 ">Product Details</h2>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <div className="mb-2 flex items-center gap-2">
                                        <label className="block text-sm font-medium text-gray-900 "> Category* </label>
                                    </div>
                                    <select defaultValue="" onChange={(e) => setCategory(e.target.value)} className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 ">
                                        <option value="" disabled hidden>
                                            Select Category
                                        </option>
                                        <option value="MEN'S CLOTHING">MEN'S CLOTHING</option>
                                        <option value="WOMEN'S CLOTHING">WOMEN'S CLOTHING</option>
                                        <option value="JEWELERY">JEWELERY</option>
                                        <option value="ELECTRONICS">ELECTRONICS</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-900 "> Product Name </label>
                                    <input value={title} onChange={(e) => setTitle(e.target.value)} maxLength={50} type="text" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 " placeholder="Product Name" />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-900 "> Price </label>
                                    <input value={price} onChange={handlePrice} maxLength={10} type="text" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 " placeholder="Price" />
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-900 "> Description </label>
                                    <input value={description} onChange={(e) => setDescription(e.target.value)} type="text" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 " placeholder="Description" />
                                </div>

                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="">
                                <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                                    Photo
                                </label>
                                <div className="mt-2 flex items-center gap-x-3">
                                    <button
                                        type="button"
                                        className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                    >
                                        <label
                                            htmlFor="file-upload"
                                            className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                        >
                                            <span>{image ? 'Change Image' : 'Upload Image'} </span>
                                            <input className="sr-only" onChange={(e) => { if (e.target.files && e.target.files[0]) { base64(e.target.files[0]) } }} type="file" id="file-upload" />
                                        </label>
                                    </button>
                                </div>
                            </div>

                            <div className={`mt-8 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 ${image ? 'block' : 'hidden'} `}>
                                {image &&
                                    <div className="mt-4 h-20 flex text-sm leading-6 text-gray-600">
                                        <img className="h-full" src={image} alt="" />
                                    </div>}
                            </div>
                        </div>
                    </div>


                </div>
                <div className="mt-12 sm:flex sm:justify-end">
                    <button  type="submit"
                        className="hover:shadow-form  lg:w-1/8 rounded-md bg-orange-500 hover:bg-orange-400 py-3 px-8 text-center text-base font-semibold text-white outline-none">
                        SUBMIT
                    </button>
                </div>
            </form >
        </div >
        {/* <div className="mx-auto w-full max-w-[550px] bg-white shadow-lg p-10">
            <form className="">
                <div className="mb-5">
                    <label className="mb-3 block text-base font-medium text-[#07074D]">
                        PRODUCT TITLE

                    </label>
                    <input value={title}                        onChange={(e) => setTitle(e.target.value)}
                        type="text" placeholder="PRODUCT TITLE"
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                </div>
                <div className="mb-5">
                    <label className="mb-3 block text-base font-medium text-[#07074D]">
                        PRICE
                    </label>
                    <input value={price} onChange={ handlePrice}

                        type="text" placeholder="Price..."
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                </div>
                <div className="mb-5">
                    <label className="mb-3 block text-base font-medium text-[#07074D]">
                        DESCRIPTION
                    </label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description..."
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                </div>
                <div className="-mx-3 flex flex-wrap">
                    <div className="w-full px-3 sm:w-1/2">
                        <div className="mb-5">
                            <label className="mb-3 block text-base font-medium text-[#07074D]">
                                PHOTO
                            </label>
                            <input onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                    base64(e.target.files[0]);
                                }
                            }}
                                // onChange={handleImageChange} 
                                type="file"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                        </div>
                    </div>
                    <div className="w-full px-3 sm:w-1/2 flex justify-center items-center ">
                        <div className="h-10 w-20">
                            <img src={image} alt="" />
                        </div>
                    </div>
                </div>



                <div className="mt-12">
                    <button onClick={handleSubmission}
                        className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none">
                        SUBMIT
                    </button>
                </div>
            </form>
        </div> */}
    </>

    )
}

export default Form