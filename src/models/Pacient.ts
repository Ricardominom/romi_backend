import mongoose, { Schema } from "mongoose";

export interface IPatient {
    name: string
    age: number
    symptoms: string
    email: string
}

const patientSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        required: true
    },
    symptoms: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    }
})

const Patient = mongoose.model<IPatient>('Patient', patientSchema)
export default Patient