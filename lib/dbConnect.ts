import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGO_URI as string;

if (!MONGODB_URI) {
  throw new Error("❌ Faltan variables de entorno: MONGO_URI no está definida.");
}

export const dbConnect = async () => {
  if (mongoose.connection.readyState >= 1) return;
  return mongoose.connect(MONGODB_URI, {
    dbName: "9001app",
  });
};