import { STATUS_CODE } from "../enums/statusCode.js";

export function validateSchema(schema) {
    return (req, res, next) => {

        const { error } = schema.validate(req.body, { abortEarly: false });

        if (error) {
            const errorMessages = error.details.map(error => error.message);
            return res.status(STATUS_CODE.UNPROCESSABLE_ENTITY).send(errorMessages);
        }
        next();
    };
}