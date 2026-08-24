import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chats: {},
    currentChatId: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    createNewChat: (state, action) => {
      const { chatId, title } = action.payload;

      if (!state.chats[chatId]) {
        state.chats[chatId] = {
          id: chatId,
          title,
          messages: [],
          lastUpdated: new Date().toISOString(),
        };
      }
      state.currentChatId = chatId;
    },

addNewMessage: (state, action) => {
  const { chatId, content, role, id } = action.payload;

  if (!state.chats[chatId]) {
    state.chats[chatId] = {
      id: chatId,
      title: "New conversation",
      messages: [],
      lastUpdated: new Date().toISOString(),
    };
  }

  state.chats[chatId].messages.push({
    _id: id,
    content,
    role,
  });

  state.chats[chatId].lastUpdated =
    new Date().toISOString();
},

    setChats: (state, action) => {
      state.chats = action.payload;
    },

    setMessages: (state, action) => {
      const { chatId, messages } = action.payload;

      if (!state.chats[chatId]) return;

      state.chats[chatId].messages = messages;
    },

    setCurrentChatId: (state, action) => {
      state.currentChatId = action.payload;
    },

    clearCurrentChat: (state) => {
    state.currentChatId = null;
    },

    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setChats,
  setMessages,
  setCurrentChatId,
  clearCurrentChat,
  setLoading,
  setError,
  createNewChat,
  addNewMessage,
} = chatSlice.actions;

export default chatSlice.reducer;
