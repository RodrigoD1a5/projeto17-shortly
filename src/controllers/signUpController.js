import { db } from "../database/database.connection.js";
import { STATUS_CODE } from "../enums/statusCode.js";
import bcrypt from "bcrypt";

export async function signUp(req, res) {

    const { name, email, password, } = req.body;

    try {

        const checkEmail = await db.query('SELECT * FROM users WHERE email=$1', [email]);

        if (checkEmail.rowCount != 0) return res.sendStatus(STATUS_CODE.CONFLICT);

        const passwordHash = bcrypt.hashSync(password, 10);

        await db.query(`
            INSERT INTO users (name,email,password) 
            VALUES ($1,$2,$3)
            `
            , [name, email, passwordHash]
        );

        res.sendStatus(STATUS_CODE.CREATED);

    } catch (error) {

        res.status(STATUS_CODE.SERVER_ERROR).send(error.message);

    }

}