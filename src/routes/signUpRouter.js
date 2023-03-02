import { Router } from "express";
import { signUp } from "../controllers/signUpController.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { signUpSchema } from "../schemas/signUpSchema.js";

const signUpRouter = Router();

signUpRouter.post('/signup', validateSchema(signUpSchema), signUp);

export { signUpRouter };