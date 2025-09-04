import type { Request, Response, NextFunction } from "express"
import Doctor, { IDoctor } from "../models/Doctor"
import jwt from 'jsonwebtoken'

declare global {
    namespace Express {
        interface Request {
            doctor?: IDoctor
        }
    }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const bearer = req.headers.authorization

    if (!bearer) {
        const error = new Error('No autorizado')
        res.status(401).json({error: error.message})
        return
    }

    const [, token] = bearer.split(' ')

    if (!token) {
        const error = new Error('No autorizado')
        res.status(401).json({error: error.message})
        return
    }

    try {
        const result = jwt.verify(token, process.env.JWT_SECRET)
        if (typeof result === 'object' && result.id) {
            const doctor = await Doctor.findById(result.id).select('-password')
            if (!doctor) {
                const error = new Error('El doctor no existe')
                res.status(404).json({error: error.message})
                return
            }

            req.doctor = doctor
            next()
        }
    } catch (error) {
        res.status(500).json({error: 'Token no válido'})
    }
}