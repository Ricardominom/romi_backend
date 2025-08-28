import { Router } from "express";
import { createRecord } from "./handlers";

const router = Router()

/**Authentication and register */
router.post('/auth/register', createRecord)

export default router