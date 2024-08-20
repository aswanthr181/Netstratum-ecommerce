type MessageType = {
    text: string;
    sender: string;
    id: string 
    timeStamp: number;
};
type chatDataType={
    sender:string 
    pic:string|undefined
}
type ChatProps = {
    message: string;
    messages: MessageType[];
    setMessage: (message: string) => void
    sendMessage: ()=>void,
    chatData: chatDataType,
    user: string|undefined
};

function Chat({ message, messages, setMessage, sendMessage, chatData, user }: ChatProps) {



    return (
        <div className="flex flex-col flex-auto h-screen  p-6">
            <div
                className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4"
            >
                <div className="flex flex-col h-full overflow-x-auto mb-4">
                    <div className="flex flex-col h-full">
                        <div className="grid grid-cols-12 gap-y-2">

                            {messages.filter((message) => message.id == user).map((message) => {
                                return (
                                    <>
                                        <div className={`p-3 rounded-lg ${message.sender === chatData?.sender ? 'col-start-6 col-end-13 ' : 'col-start-1 col-end-8 '}`} >
                                            <div className={`flex items-center ${message.sender === chatData?.sender ? '  justify-start flex-row-reverse' : ' flex-row '}`} >
                                                <div className="flex items-center justify-center h-10 w-10 rounded-full flex-shrink-0">
                                                    <img
                                                        src={message.sender === chatData?.sender ? chatData.pic : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGlZkIqki43f4vMGa-DljqZBCOr6D6Cm_l_kDM06YEjL2QWlKZY_glSuSJGybsUIHmdpc&usqp=CAU'}
                                                        className="h-full w-full rounded-full"
                                                        alt="" />
                                                </div>
                                                <div className={`relative  text-sm  py-2 px-4 shadow rounded-xl ${message.sender === chatData?.sender ? 'mr-3 bg-indigo-100' : 'ml-3 bg-white'}`}>
                                                    <div>{message.text}</div>
                                                    <small className="text-xs text-gray-400"> {new Date().toLocaleString('en-US', {
                                                        hour: 'numeric',
                                                        minute: 'numeric',
                                                        hour12: true
                                                    })}</small>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">

                    <div className="flex-grow ml-4">
                        <div className="relative w-full">
                            <input type="text" placeholder="Type your message..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        sendMessage()
                                    }

                                }}
                                className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10" />

                        </div>
                    </div>
                    <div className="ml-4">
                        <button onClick={sendMessage} className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0">
                            <span>Send</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chat