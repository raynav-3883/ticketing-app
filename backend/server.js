// backend/server.js
import dotenv from "dotenv";
dotenv.config();

console.log("SERVER: API KEY =", process.env.OPENAI_API_KEY);


import express from "express";
import cors from "cors";

import * as cheapestPkg from "./routes/cheapest.js";
import * as fastestPkg from "./routes/fastest.js";
import * as balancedPkg from "./routes/balanced.js";
import { chatHandler } from "./routes/chat.js";

const { getCheapest } = cheapestPkg;
const { getFastest } = fastestPkg;
const { getBalanced } = balancedPkg;

const app = express();
app.use(cors());
app.use(express.json());

console.log("SERVER LOADED");

// Travel route APIs
app.get("/api/cheapest", getCheapest);
app.get("/api/fastest", getFastest);
app.get("/api/balanced", getBalanced);

// Chatbot API
app.post("/api/chat", chatHandler);

// Start server
app.listen(process.env.PORT || 5000, () => {
  console.log("Backend running at http://localhost:5000");
});
