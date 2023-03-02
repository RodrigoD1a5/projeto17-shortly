import joi from "joi";

export const signInSchema = joi.object({
    email: joi.string().trim().required().email(),
    password: joi.string().trim().required(),
});