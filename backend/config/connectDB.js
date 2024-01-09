import mongoose from "mongoose";

const connectDB = () => {
    mongoose.connect(process.env.MONGO_URL).then(()=>{
        console.log('Connected to MongoDB');
    }).catch(()=>{
        console.log("Not Connected to MongoDB")
    })
}

export default connectDB