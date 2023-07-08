import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name: String,
    email: {type: String, required: true},
    password: {type: String, required: true},
})

export default mongoose.model("User", userSchema);