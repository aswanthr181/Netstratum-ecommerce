import axios from "axios"
import { useEffect, useState } from "react"
import { Toaster, toast } from 'react-hot-toast'
import { useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'
import Form from "./Form"


function ProductForm({ id }: any) {
    const [loading, setLoading] = useState<boolean>(true)
    const [category, setCategory] = useState<string>()
    const [title, setTitle] = useState<string>()
    const [price, setPrice] = useState<number>()
    const [description, setDescription] = useState<string>()
    const [image, setImage] = useState<any>()
    // const [page,setPage]=useState<number>(1)
    // const [productData, setProductData] = useState<any>()
    const navigate=useNavigate()
console.log(loading);

    const generateError = (err: any) => {
        if (typeof err.message === 'string') {
            toast.error(err.message, { position: "bottom-center" });
        } else {
            toast.error("An unexpected error occurred", { position: "bottom-center" });
        }
    };

    useEffect(() => {
        setLoading(true)

        axios.get(`https://fakestoreapi.com/products/${id}`)
            .then((res) => {
                const response = res.data
                // setProductData(res.data)
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


    const base64 = (img: any) => {
        let reader = new FileReader();
        console.log('first')
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
        if (!description?.trim() || !title?.trim() ) {
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
            let response = await axios.put(`https://fakestoreapi.com/products/${id}`, { title, price, description, image, category })
            let result=response.data
            if(result){
                Toast.fire({
                    icon: "success",
                    title: "PRODUCT UPDATED ",
                  })
            }
            navigate('/portal')
        } catch (error) {
            generateError(error)
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

export default ProductForm