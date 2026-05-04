import mongoose from "mongoose";

const ConnectDb = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/userDB");
    console.log("DB Connected");
  } catch (err) {
    console.error(err);
  }
};

export default ConnectDb;