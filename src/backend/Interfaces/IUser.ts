import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
    username: string;
    email: string;
    password: string;
    registrationDate: Date;
};