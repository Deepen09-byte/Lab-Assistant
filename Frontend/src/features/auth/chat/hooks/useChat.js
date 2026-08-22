import {initializeSocket} from "../service/chat.socket.js"
import { sendMessage, getChats, getMessages, deleteChat} from "../service/chat.api.js"
import { setChats, setCurrentChatId, setError, setLoading , createNewChat, addNewMessage} from "../chat.slice.js"
import {useDispatch} from "react-redux"

export const useChat = () => {

    const dispatch = useDispatch()

    async function handleSendMessage({message, chatId}){
        
        dispatch(setLoading(true))
        
        const data = await sendMessage({message, chatId})
        
        const {chat,userMessage, aiMessage} = data
        
        if(!chatId){dispatch(createNewChat({
            chatId: chat._id,
            title: chat.title,
        }))}

        dispatch(addNewMessage({
            chatId: chat._id,
            content: message,
            role: userMessage.role,
            id: userMessage._id,
        }))

        dispatch(addNewMessage({
            chatId: chat._id,
            content: aiMessage.content,
            role: aiMessage.role,
            id: aiMessage._id
        }))

        dispatch(setCurrentChatId(chat._id))
    }



    return {
        initializeSocket,
        handleSendMessage,
    }
}