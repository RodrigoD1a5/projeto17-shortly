import { Router } from "express";
import { deleteUrlsById, getOpenShortUrl, getUrlsById, postUrlShorten } from "../controllers/urlsController.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { postUrlShortenSchema } from "../schemas/postUrlsShortenSchema.js";

const urlsRouter = Router();

urlsRouter.post('/urls/shorten', validateSchema(postUrlShortenSchema), postUrlShorten);
urlsRouter.get('/urls/:id', getUrlsById);
urlsRouter.get('/urls/open/:shortUrl', getOpenShortUrl);
urlsRouter.delete('/urls/:id', deleteUrlsById);

export { urlsRouter };