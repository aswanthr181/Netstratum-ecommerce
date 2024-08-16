import axios from "axios"
import { useState } from "react"
import Form from "./Form"
import { useNavigate } from "react-router-dom"
import { Toaster, toast } from 'react-hot-toast'
import Swal from 'sweetalert2'


function NewProductFrom() {
    const [category, setCategory] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const [price, setPrice] = useState<number>(0)
    const [description, setDescription] = useState<string>('')
    const [image, setImage] = useState<any>('')

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
        if (!description?.trim() || !title?.trim()  ) {
            alert('enter all fields')
            return
        }
        const Toast = Swal.mixin({
            toast: true,
            position: "top-right",
            showConfirmButton: false,
            timer: 1000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener("mouseenter", Swal.stopTimer);
                toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
        });
        try {
            let response = await axios.post(`https://fakestoreapi.com/products`, { title, price, description, image, category })
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
            console.log('errorr=>',error);

        }
    }

    return (
        <div className="flex justify-center items-center h-screen ">
            <Toaster />

            <div className="flex items-center justify-center p-12 bg-white shadow-lg overflow-y-scroll ">
                <Form
                    setTitle={setTitle} setPrice={setPrice} base64={base64} handleSubmission={handleSubmission} setDescription={setDescription}
                    title={title} price={price} description={description} image={image} />
            </div>
        </div>
    )
}

export default NewProductFrom