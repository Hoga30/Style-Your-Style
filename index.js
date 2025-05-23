import express from "express";
import mongoose from "mongoose";
import route from "./router/index.js";
import errorHandler from "./middleware/errorhandler.js";
import dotenv from "dotenv";
import fs from "fs/promises";
import swaggerUi from "swagger-ui-express";
import cors from "cors";

dotenv.config();

const corsOptions = {
  allowedHeaders: ["Authorization", "Content-Type"],
  methods: ["GET", "POST", "PUT", "UPDATE", "DELETE"],
  origin: "*",
};

// Load Swagger JSON asynchronously
async function loadDocumentation() {
  return JSON.parse(
    await fs.readFile(new URL("./doc/swagger.json", import.meta.url), "utf-8")
  );
}

const app = express();
app.use(cors());
app.use(express.json());

// Use an async function to start the server
async function startServer() {
  try {
    const documentation = await loadDocumentation();
    app.use("/api_docs", swaggerUi.serve, swaggerUi.setup(documentation));

    await
    console.log("MongoDB Connection String:", process.env.db);
      mongoose.connect(`${process.env.db}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000, // 30 seconds timeout
      socketTimeoutMS: 45000, // 45 seconds timeout
      maxPoolSize: 10, // Maintain up to 10 socket connections
    });

    console.log("Connected to DB");

    app.use("/styling", route);
    

    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
  }
}

startServer();
app.use(errorHandler);