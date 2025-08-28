import { Request, Response } from "express"
import Patient from "../models/Pacient"

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