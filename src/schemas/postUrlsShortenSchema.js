import joi from "joi";

export const postUrlShortenSchema = joi.object({
    url: joi.string().required().uri()
});