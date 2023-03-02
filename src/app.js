import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { signUpRouter } from "./routes/signUpRouter.js";

dotenv.config();


const app = express();
app.use(cors());
app.use(json());

app.use(signUpRouter);

app.listen(process.env.PORT, () => console.log(`Servidor funcionando na porta ${process.env.PORT}`));