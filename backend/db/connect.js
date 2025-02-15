import mongoose from "mongoose";

export default async function dbConnect(url) {
  try {
    mongoose.connect(url);
    console.log("Connected");
  } catch {
    console.log("DB not connected");
  }
}
