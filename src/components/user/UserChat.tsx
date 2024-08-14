import { useEffect, useState } from 'react'
import { io } from "socket.io-client"
import Chat from '../common/Chat'
import { useSelector } from 'react-redux'

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

    const { userData } = useSelector((state: any) => state.userAuth)
    const chatData = {
        sender: 'user',
        pic: userData.picture
    }
    const handleJoinRoom = () => {
        const room = userData.email;
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
        <div>
            {showChat ?
                <Chat message={message} messages={messages} setMessage={setMessage} sendMessage={sendMessage} chatData={chatData} user={userData.email} />
                : <div><button onClick={handleJoinRoom}>
                    chat</button></div>
            }
        </div>
    )
}

export default UserChat