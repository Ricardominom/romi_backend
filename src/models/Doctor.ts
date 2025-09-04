import mongoose, { Schema } from "mongoose";

export interface IDoctor {
    nameDoctor: string
    emailDoctor: string
    password: string
}

const doctorSchema = new Schema({
    nameDoctor: {
        type: String,
        required: true,
        trim: true
    },
    emailDoctor: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    }
})

const Doctor = mongoose.model<IDoctor>('Doctor', doctorSchema)
export default Doctor