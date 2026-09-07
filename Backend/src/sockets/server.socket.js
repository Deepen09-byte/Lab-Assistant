import {Server} from "socket.io"

let io;

export function initSocket(httpServer){
    io = new Server(httpServer, {
        cors:{
            origin: "https://lab-assistant-1.onrender.com",
            credentials: true,
        }
    })

    console.log("Socket.io server is running")

    io.on("connection", (socket) => {
        console.log("A user is connected:" + socket.id)
    })
}

export function getIo(){
    if(!io){
        throw new Error(("Socket.io not initialized"))
    }

    return io
}