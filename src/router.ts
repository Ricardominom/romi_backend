import { Router } from "express";
import { body } from "express-validator";
import { createDoctor, createRecord, getDoctor, getPatients, login } from "./controllers/RomiController";
import { handleInputErrors } from "./middleware/validation";
import { authenticate } from "./middleware/auth";

const router = Router()

/**Create Record */
router.post('/register-patient', 
    body('name')
        .notEmpty()
        .withMessage('El campo de nombre no puede ir vacío'),
    body('age')
        .notEmpty()
        .withMessage('El campo de edad de paciente no puede ir vacío'),
    body('symptoms')
        .isLength({min: 8})
        .withMessage('La explicación de los síntomas es insuficiente, por favor de más detalles'),
    body('email')
        .isEmail()
        .withMessage('El email no es válido'),
    handleInputErrors,
    createRecord
)
/**Authentication and register */
router.post('/auth/register-doctor', 
    body('nameDoctor')
        .notEmpty()
        .withMessage('El campo de nombre no puede ir vacío'),
    body('emailDoctor')
        .isEmail()
        .withMessage('El email no es válido'),
    body('password')
        .isLength({min: 8})
        .withMessage('El password es corto, deben ser mínimo 8 caracteres'),
    handleInputErrors,
    createDoctor
)

router.post('/auth/login',
    body('emailDoctor')
        .isEmail()
        .withMessage('El email no es válido'),
    body('password')
        .notEmpty()
        .withMessage('El password es obligatorio'),
    handleInputErrors,
    login
)

router.get('/doctor', authenticate, getDoctor)

router.get('/patients', authenticate, getPatients)

export default router