import { useEffect, useState } from 'react'
import { io } from "socket.io-client"
import Chat from '../common/Chat'
import { useSelector } from 'react-redux'
import Navbar from '../common/Navbar'
import { RootState } from '../../redux/store'

const socket = io('ws://localhost:3000')
type MessageType = {
    text: string;
    sender: string;
    id: string
    timeStamp: number;
};

function UserChat() {
    const [message, setMessage] = useState<string>('')
    const [messages, setMessages] = useState<MessageType[]>([])
    const [showChat, setShowChat] = useState<boolean>(false)

    const { userData } = useSelector((state: RootState) => state.userAuth)
    const chatData = {
        sender: 'user',
        pic: userData?.picture
    }
    const handleJoinRoom = () => {
        const room = userData?.email;
        socket.emit('joinRoom', room);
        setShowChat(true)
    }
    // useEffect(() => {
    //     const room = userData.email;
    //     socket.emit('joinRoom', room);
    // }, [userData.email])

    useEffect(() => {
        socket.on('sendMessage', (newMessage: MessageType) => {
            setMessages((prevMessage) => [...prevMessage, newMessage])
        })

        return () => {
            socket.off('sendMessage')
        }
    }, [])
    const sendMessage = () => {
        if (message && userData) {
            const room = userData.email
            let messageData = {
                text: message,
                sender: "user",
                id: room,
                timeStamp: Date.now()
            }
            socket.emit('sendMessage', { room, messageData })
            setMessages((prevMessage) => [...prevMessage, messageData])
            setMessage('')
        }
    }
    return (
        <>
            <Navbar/>
            {showChat ?
                <Chat message={message} messages={messages} setMessage={setMessage} sendMessage={sendMessage} chatData={chatData} user={userData?.email} />
                : <div>
                    {/* <button onClick={handleJoinRoom}>
                    chat</button> */}

                    <div className=" h-screen">
                        <div className="bg-white p-6  md:mx-auto">
                            <div className="text-center">
                                <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">Order Success!</h3>
                                <p className="text-gray-600 my-2">Thank you for completing your online shopping.</p>
                                <p> Have a great day!  </p>
                                <div className="py-10 text-center">
                                    <button onClick={handleJoinRoom} className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3">
                                        Start a Conversation
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default UserChat