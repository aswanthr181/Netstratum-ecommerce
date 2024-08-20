import { ClipLoader } from 'react-spinners'

function Loader({loading}:{loading:boolean}) {
    return (

        <div className="flex  items-center justify-center h-screen overflow-y-scroll w-full">
            <ClipLoader color="green" loading={loading} size={70} />
        </div>
    )
}

export default Loader