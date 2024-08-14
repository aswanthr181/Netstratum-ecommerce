
function Form({setTitle,setPrice,base64,handleSubmission,setDescription,title,price,description,image}:any) {
    return (<>
        <div className="mx-auto w-full max-w-[550px] bg-white shadow-lg p-10">
            <form className="">
                <div className="mb-5">
                    <label className="mb-3 block text-base font-medium text-[#07074D]">
                        PRODUCT TITLE 

                    </label>
                    <input value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        type="text" placeholder="PRODUCT TITLE"
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                </div>
                <div className="mb-5">
                    <label className="mb-3 block text-base font-medium text-[#07074D]">
                        PRICE
                    </label>
                    <input value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        type="number" placeholder="Price..."
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                </div>
                <div className="mb-5">
                    <label className="mb-3 block text-base font-medium text-[#07074D]">
                        DESCRIPTION
                    </label>
                    <textarea value={description}
                    onChange={(e)=>setDescription(e.target.value)}
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
        </div>
    </>

    )
}

export default Form