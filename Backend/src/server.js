import app from "./app.js";
import connectDB from "./config/database.js";
import "dotenv/config";

connectDB()
  .catch((error) => {
    console.error("Server error:", error);
    process.exit(1);
  });

      app.listen(process.env.PORT, () => {
      console.log(`\n🚀 Server is running on http://localhost:${process.env.PORT}`);
      console.log(`📚 Lab Assistant API is live\n`);
    });
