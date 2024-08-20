import axios from "axios"
import { useEffect, useState } from "react"
import { Toaster } from 'react-hot-toast'
import { useNavigate } from "react-router-dom"
import Form from "./Form"
import { generateError, Toast } from "../../constants/Alerts"
import Loader from "../common/Loader"
import { productApi } from "../../constants/api"


function ProductForm({ id }: { id: string|undefined }) {
    const [loading, setLoading] = useState<boolean>(true)
    const [category, setCategory] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const [price, setPrice] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [image, setImage] = useState<string>('')
    const navigate = useNavigate()
    console.log(loading);


    useEffect(() => {
        setLoading(true)

        axios.get(`${productApi}/${id}`)
            .then((res) => {
                const response = res.data
                setTitle(response.title)
                setPrice(response.price)
                setDescription(response.description)
                setImage(response.image)
                setCategory(response.category)
                setLoading(false)
            }).catch((err) => {
                console.log(err)
            })
    }, [])


    const handleImageUpload=(img: File)=>{
        const allowedTypes = ['image/jpeg', 'image/png'];
        if(allowedTypes.includes(img.type)){
            setImage(URL.createObjectURL(img))
        }else{
            generateError("Please select a valid image")
        }
    }

    const handleSubmission = async (e:  React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!description?.trim() || !title?.trim() || !category.trim()) {
            generateError('enter all fields')
            return
        }
        try {
            let response = await axios.put(`${productApi}/${id}`, { title, price, description, image, category })
            let result = response.data
            if (result) {
                Toast.fire({
                    icon: "success",
                    title: "PRODUCT UPDATED ",
                })
            }
            navigate('/portal')
        } catch (error) {
            console.log(error);
            generateError(String(error))
        }
    }

    return (
        <>

            {loading ?
                <Loader loading={loading} />
                :
                <div className="flex justify-center  w-full h-screen ">
            <Toaster />

            <div className="flex  justify-center w-full bg-white   ">
                        <Form
                            setTitle={setTitle} setPrice={setPrice} base64={handleImageUpload} handleSubmission={handleSubmission} setDescription={setDescription}
                            title={title} price={price} description={description} image={image} setCategory={setCategory} />
                    </div>
                </div>
            }
        </>
    )
}

export default ProductForm