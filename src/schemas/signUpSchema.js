import joi from "joi";

export const signUpSchema = joi.object({
    name: joi.string().trim().required(),
    email: joi.string().trim().required().email(),
    password: joi.string().trim().required(),
    confirmPassword: joi.ref("password")
});