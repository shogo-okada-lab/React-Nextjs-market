import mongoose from "mongoose";

// 非同期処理（ある処理が終わるのを待たずに、別の処理を実行すること）
const connectDB = async() => {
    try {
        await mongoose.connect("mongodb+srv://929shq:yqeGsuGPTjiYxAfy@cluster0.2x35y.mongodb.net/nextAppDataBase?retryWrites=true&w=majority&appName=Cluster0")
        console.log("Success: Connected to MongoDB")
    } catch {
        console.log("Failed: Unconnected to MongoDB")
        throw new Error()
    }
}

export default connectDB