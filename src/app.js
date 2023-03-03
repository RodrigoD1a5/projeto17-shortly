import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { signUpRouter } from "./routes/signUpRouter.js";
import { signInRouter } from "./routes/signInRouter.js";
import { urlsRouter } from "./routes/urlsRouter.js";
import { userRouter } from "./routes/userRouter.js";
import { rankingRouter } from "./routes/rankingRouter.js";

dotenv.config();


const app = express();
app.use(cors());
app.use(json());

app.use(signUpRouter);
app.use(signInRouter);
app.use(urlsRouter);
app.use(userRouter);
app.use(rankingRouter);

app.listen(process.env.PORT, () => console.log(`Servidor funcionando na porta ${process.env.PORT}`));