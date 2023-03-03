import { Router } from "express";
import { postUrlShorten } from "../controllers/urlsController.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { postUrlShortenSchema } from "../schemas/postUrlsShortenSchema.js";

const urlsRouter = Router();

urlsRouter.post('/urls/shorten', validateSchema(postUrlShortenSchema), postUrlShorten);

export { urlsRouter };