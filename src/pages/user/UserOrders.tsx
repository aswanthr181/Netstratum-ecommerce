import { useSelector } from "react-redux"
import Navbar from "../../components/common/Navbar"
import Orders from "../../components/common/Orders"
import { RootState } from "../../redux/store"
import { useEffect, useState } from "react"
import { orderDetailsType } from "../../Types/allType"

function UserOrders() {
    const [myOrders, setMyOrders] = useState<orderDetailsType[]>([])
    const { userData } = useSelector((state: RootState) => state.userAuth)
    const { orderList } = useSelector((state: RootState) => state.order)
    useEffect(() => {
        const userOrder = orderList.filter((order: orderDetailsType) => order.user === userData?.email)
        if (userOrder) {
            setMyOrders(userOrder.reverse())
        }
    }, [orderList])

    return (
        <div>
            <Navbar />
            {myOrders.length > 0 ?
                <Orders myOrders={myOrders} /> :
                 <div><h1>order is empty</h1></div>}

        </div>
    )
}

export default UserOrders