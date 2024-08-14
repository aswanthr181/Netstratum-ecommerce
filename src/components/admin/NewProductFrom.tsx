import axios from "axios"
import { useState } from "react"
import Form from "./Form"
import { useNavigate } from "react-router-dom"

function NewProductFrom() {
    const [category, setCategory] = useState<string>()
    const [title, setTitle] = useState<string>()
    const [price, setPrice] = useState<number>()
    const [description, setDescription] = useState<string>()
    const [image, setImage] = useState<any>()

    const navigate = useNavigate()
    const base64 = (img: any) => {
        let reader = new FileReader();
        reader.readAsDataURL(img)
        reader.onload = () => {
            setImage(reader.result);
        };
        reader.onerror = (error) => {
            console.log("Error: ", error);
        };
    }

    const handleSubmission = async (e: any) => {
        e.preventDefault()
        try {
            let response = await axios.post(`https://fakestoreapi.com/products`, { title, price, description, image, category })
            let result = response.data
            console.log(result);

            if (result) {
                navigate('/portal')
            }
        } catch (error) {
            console.log(error);

        }
    }

    return (
        <div className="flex justify-center items-center h-screen ">
            <div className="flex items-center justify-center p-12 bg-white shadow-lg overflow-y-scroll ">
                <Form
                    setTitle={setTitle} setPrice={setPrice} base64={base64} handleSubmission={handleSubmission} setDescription={setDescription}
                    title={title} price={price} description={description} image={image} />
            </div>
        </div>
    )
}

export default NewProductFrom