import mongoose from "mongoose";
import { userModel } from "./models/user.js";

mongoose.connect('mongodb+srv://coderhouse:coder123456@coderhouse.z88zdi9.mongodb.net/session?retryWrites=true&w=majority');

export const getAll = async () => {
    let result;
    try {
        result = await userModel.find()
    } catch (error) {
        console.log(error)
    }

    return result;
}

export const getByEmail = async email => {
    let result;
    try {
        result = await userModel.findOne({ email })
    } catch (error) {
        console.log(error)
    }

    return result;
}

export const createUser = async user => {
    let result;
    try {
        result = await userModel.create(user)
    } catch (error) {
        console.log(error)
    }

    return result;
}

