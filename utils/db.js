import mongoose from "mongoose";

const connectDB = async ()  => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("MongoDB Connected successfully");
    }catch (error){
    console.log(error);
    }
}
export default connectDB;  //export the function to use it in other files