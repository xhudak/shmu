import mongoose from "mongoose";
import { IUser } from "../Interfaces";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 256
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 256
    },
    password: {
        type: String,
        required: true,
        min: 12,
        max: 256
    },
    registrationDate: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model<IUser>('User', userSchema);
export default User;