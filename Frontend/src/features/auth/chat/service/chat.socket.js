import { io } from "socket.io-client";

export const initializeSocket= () => {

    const socket = io("https://lab-assistant-kivm.onrender.com",{
        withCredentials:true
    })

    socket.on("connect", ()=> {
        console.log("connected to Socket.Io server")
    })

    return socket
}