import mongoose from "mongoose";

export const connectDb = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected DB Succesfully');
    } catch(err) {
        console.log("Error on connecting with database");
        process.exit(1);
    }

}