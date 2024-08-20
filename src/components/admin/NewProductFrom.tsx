import axios from "axios"
import { useState } from "react"
import Form from "./Form"
import { useNavigate } from "react-router-dom"
import { Toaster} from 'react-hot-toast'
import { productApi } from "../../constants/api"
import { generateError, Toast } from "../../constants/Alerts"



function NewProductFrom() {
    const [category, setCategory] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const [price, setPrice] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [image, setImage] = useState<string>('')

    const navigate = useNavigate()
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
        console.log(typeof(Number(price)));
        
        if (!description?.trim() || !title?.trim() ||!image.trim() || price === undefined || price === null) {
            generateError("enter all fields")
            return
        }
        if(typeof(Number(price))!=='number'){
            generateError("enter a valid price")
            return
        }
        
        try {
            let response = await axios.post(`${productApi}`, { title, price, description, image, category })
            let result = response.data
            console.log(result);

            if (result) {
                Toast.fire({
                    icon: "success",
                    title: "PRODUCT UPDATED ",
                })
                navigate('/portal')
            }
        } catch (error) {
            generateError(error+'erer')
            console.log('errorr=>', error);

        }
    }

    return (
        <div className="flex justify-center  w-full h-screen ">
            <Toaster />

            <div className="flex  justify-center w-full bg-white   ">
                <Form
                    setTitle={setTitle} setPrice={setPrice} base64={handleImageUpload} handleSubmission={handleSubmission} setDescription={setDescription}
                    title={title} price={price} description={description} setCategory={setCategory} image={image} />
            </div>
        </div>
    )
}

export default NewProductFrom