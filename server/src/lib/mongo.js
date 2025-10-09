// Mongo connection helper
const mongoose = require("mongoose");

let isConnected = false;

async function connectMongo() {
  if (isConnected) return;
  const uri = process.env.MONGO_URI || "mongodb://localhost:27017/svelte_todos";
  await mongoose.connect(uri, { dbName: process.env.MONGO_DB || undefined });
  isConnected = true;
  console.log("Connected to MongoDB");
}

module.exports = { connectMongo };
