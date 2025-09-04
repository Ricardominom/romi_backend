import { Request, Response } from "express"
import Patient from "../models/Pacient"
import Doctor from "../models/Doctor"
import { checkPassword, hashPassword } from "../utils/auth"
import { validationResult } from "express-validator"
import { generateJWT } from "../utils/jwt"

export const createDoctor = async (req: Request, res: Response) => {
    
    const { emailDoctor, password } = req.body

    const doctorExists = await Doctor.findOne({emailDoctor})
    if (doctorExists) {
        const error = new Error('El doctor ya está registrado')
        res.status(409).json({error: error.message})
        return
    }

    const doctor = new Doctor(req.body)
    doctor.password = await hashPassword(password)

    await doctor.save()

    res.status(201).send('Usuario de doctor creado correctamente')
}

export const createRecord =  async (req: Request , res: Response) => {

    const { email } = req.body

    const patientExists = await Patient.findOne({email})
    if (patientExists) {
        const error = new Error('El paciente ya está registrado')
        res.status(409).json({error: error.message})
        return
    }

    const patient = new Patient(req.body)

    await patient.save()

    res.status(201).send('Registro de paciente creado correctamente')
}

export const getPatients = async (req: Request, res: Response) => {
    try {
        const patients = await Patient.find()
        res.json(patients)
        return
    } catch (error) {
        res.status(500).json({error: 'No se pueden obtener datos'})
    }
}

export const login = async (req:Request, res: Response) => {

    const { emailDoctor, password } = req.body

    //Manejar errores
    let errors = validationResult(req)
    if(!errors.isEmpty()){
        res.status(400).json({errors: errors.array()})
        return
    }

    //Review if the account exists
    const doctor = await Doctor.findOne({emailDoctor})
    if (!doctor) {
        const error = new Error('La cuenta con la que intentas ingresar no existe')
        res.status(404).json({error: error.message})
        return
    }

    //Review if the password is correct
    const isPasswordCorrect = await checkPassword(password, doctor.password)
    if (!isPasswordCorrect) {
        const error = new Error('Password incorrecto')
        res.status(401).json({error: error.message})
        return
    }

    const token = generateJWT({id: doctor._id})

    res.send(token)
}

export const getDoctor = async(req: Request, res: Response) => {
    res.json(req.doctor)
}