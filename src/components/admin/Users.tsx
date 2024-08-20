import { useSelector } from "react-redux"
import Chat from "../common/Chat"
import { useEffect, useState } from "react"
import { io } from "socket.io-client"
import { RootState } from "../../redux/store"
import {  UserCart } from "../../Types/allType"
const socket = io('ws://localhost:3000')
type MessageType = {
    text: string;
    sender: string;
    id: string
    timeStamp: number;
};

function Users() {
    const [message, setMessage] = useState<string>('')
    const [messages, setMessages] = useState<MessageType[]>([])
    const { cartList } = useSelector((state: RootState) => state.cart)
    const [user, setUser] = useState<string>('')
    const { adminData } = useSelector((state: RootState) => state.adminAuth)

    let chatData = {
        sender: 'admin',
        pic: adminData?.picture
    }

    const selectChat = (email: string) => {
        if (email !== user) {
            setUser(email)
            setMessage('')
            socket.emit('joinRoom', email)
            console.log('setmail', email);
        }
        return () => {
            socket.off('sendMessage')
        }

    }
    useEffect(() => {
        socket.on('sendMessage', (newMessage: MessageType) => {
            setMessages((prevMessage) => [...prevMessage, newMessage])
        })

        return () => {
            socket.off('sendMessage')
        }
    }, [])

    const sendMessage = () => {
        if (message && user) {
            let messageData = {
                text: message,
                sender: "admin",
                id: user,
                timeStamp: Date.now()
            }
            socket.emit('sendMessage', { room: user, messageData })
            setMessages((prevMessage) => [...prevMessage, messageData])
            setMessage('')
        }
    }

    return (
        <div className="flex w-full">
            <div className="flex flex-col justify-center items-center h-screen   ">
                <div className="relative flex max-w-[500px] h-full w-full flex-col rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border   " >
                    <div className="flex  w-full items-center justify-between rounded-t-2xl bg-white px-4 pb-[20px] pt-4 ">
                        <h4 className="text-lg font-bold text-navy-700 ">
                            Users List
                        </h4>

                    </div>
                    <div className="w-full overflow-x-scroll px-4 md:overflow-x-hidden">
                        <table role="table" className="w-full min-w-[500px] overflow-x-scroll">
                            <thead>
                                <tr role="row">
                                    <th className="cursor-pointer">
                                        <div className="flex items-center justify-between pb-2 pt-4 text-start uppercase tracking-wide text-gray-600 sm:text-xs lg:text-xs">
                                            Name
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody role="rowgroup" className="px-4">
                                {cartList.map((cart: UserCart, i: number) => {
                                    return (
                                        <tr key={i} role="row" className={`${cart.user === user ? 'bg-slate-400 ' : ''}`}>
                                            <td onClick={() => selectChat(cart.user)} className="py-3 text-sm rounded-xl" role="cell">
                                                <div className="flex items-center gap-2">
                                                    <div className="h-[30px] w-[30px] rounded-full">
                                                        <img
                                                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGlZkIqki43f4vMGa-DljqZBCOr6D6Cm_l_kDM06YEjL2QWlKZY_glSuSJGybsUIHmdpc&usqp=CAU"
                                                            className="h-full w-full rounded-full"
                                                            alt="" />
                                                    </div>
                                                    <p
                                                        className="text-sm font-medium text-navy-700 "
                                                    >
                                                        {cart.user}
                                                    </p>
                                                </div>
                                            </td>


                                        </tr>
                                    )
                                })}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {user ?
                <div className="w-full">
                    <div className="flex items-center ml-4 mt-4">
                        <div>
                            <img className="w-10 h-10 rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGlZkIqki43f4vMGa-DljqZBCOr6D6Cm_l_kDM06YEjL2QWlKZY_glSuSJGybsUIHmdpc&usqp=CAU" />
                        </div>
                        <div className="ml-4">
                            <p className="text-grey-darkest">
                                {user}
                            </p>

                        </div>
                    </div>
                    <Chat message={message} messages={messages} setMessage={setMessage} sendMessage={sendMessage} chatData={chatData} user={user} />
                </div>
                :
                <div>

                </div>
            }

        </div>



    )
}

export default Users


