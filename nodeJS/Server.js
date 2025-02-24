import express from "express";
import mongoose from "mongoose";
import { routes } from "./Routes/products.routes.js";
import cors from "cors";
import { fetchAndStoreProducts } from "./Model/products.model.js";
import process from "process";
import dotenv from "dotenv";
dotenv.config();
const server = express();
server.use(cors()); // Allow cross-origin requests
server.use(express.json()); // JSON parsing for incoming requests

const port = 4000;

server.listen(port, () => {
  console.log(`Server is running at port ---- ${port}`);
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Database connection successful");
    fetchAndStoreProducts();
  })
  .catch((err) => console.log({ message: err.message }));

// Set up the routes
routes(server);
