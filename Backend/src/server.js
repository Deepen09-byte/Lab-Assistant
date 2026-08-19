import "dotenv/config";
import app from "./app.js";
import connectDB from "./config/database.js";
import http from "http";
import { initSocket } from "./sockets/server.socket.js";

const httpServer = http.createServer(app)

initSocket(httpServer);

connectDB()

  .catch((error) => {
    console.error("Server error:", error);
    process.exit(1);
  });

      httpServer.listen(process.env.PORT, () => {
      console.log(`\n🚀 Server is running on http://localhost:${process.env.PORT}`);
      console.log(`📚 Lab Assistant API is live\n`);
    });
