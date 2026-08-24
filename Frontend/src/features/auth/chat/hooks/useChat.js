import { initializeSocket } from "../service/chat.socket.js";
import {
  sendMessage,
  getChats,
  getMessages,
  deleteChat,
} from "../service/chat.api.js";
import {
    setChats,
    setMessages,
    setCurrentChatId,
    setError,
    setLoading,
    createNewChat,
    addNewMessage
} from "../chat.slice.js";
import { useDispatch } from "react-redux";

export const useChat = () => {
  const dispatch = useDispatch();

  async function handleSendMessage({ message, chatId }) {
    dispatch(setLoading(true));

    const data = await sendMessage({ message, chatId });

    const { chat, userMessage, aiMessage } = data;

    if (!chatId) {
      dispatch(
        createNewChat({
          chatId: chat._id,
          title: chat.title,
        }),
      );
    }

    dispatch(
      addNewMessage({
        chatId: chat._id,
        content: message,
        role: userMessage.role,
        id: userMessage._id,
      }),
    );

    dispatch(
      addNewMessage({
        chatId: chat._id,
        content: aiMessage.content,
        role: aiMessage.role,
        id: aiMessage._id,
      }),
    );

    dispatch(setCurrentChatId(chat._id));
  }

async function loadChats() {
  try {
    dispatch(setLoading(true));

    const data = await getChats();

    const chatsObject = {};

    data.chats.forEach((chat) => {
      chatsObject[chat._id] = {
        id: chat._id,
        title: chat.title,
        messages: [],
        lastUpdated: chat.updatedAt || chat.createdAt,
      };
    });

    dispatch(setChats(chatsObject));

  } catch (error) {
    console.error("LOAD CHATS ERROR:", error);
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
}

async function loadMessages(chatId) {
  try {
    dispatch(setLoading(true));

    const data = await getMessages(chatId);

    const messages = data.messages.map((msg) => ({
      _id: msg._id,
      content: msg.content,
      role: msg.role,
    }));

    dispatch(
      setMessages({
        chatId,
        messages,
      })
    );

  } catch (error) {
    console.error("LOAD MESSAGES ERROR:", error);

    dispatch(
      setError(
        error.response?.data?.message || error.message
      )
    );
  } finally {
    dispatch(setLoading(false));
  }
}

    async function handleDeleteChat(chatId) {

        try {

            await deleteChat(chatId);

            // Reload chats after deletion
            await loadChats();

            dispatch(setCurrentChatId(null));

        } catch (error) {

            console.error(
                "DELETE CHAT ERROR:",
                error
            );

            dispatch(
                setError(
                    error.response?.data?.message ||
                    error.message
                )
            );
        }
    }


  return {
    initializeSocket,
    handleSendMessage,
    loadChats,
    loadMessages,
    handleDeleteChat
  };
};
