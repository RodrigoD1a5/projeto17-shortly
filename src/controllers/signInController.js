import { STATUS_CODE } from "../enums/statusCode.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { db } from "../database/database.connection.js";



export async function signIn(req, res) {
    const { email, password } = req.body;



    try {

        const { rows } = await db.query('SELECT * FROM users WHERE email = $1', [email]);

        const [user] = rows;

        if (!user) return res.sendStatus(STATUS_CODE.UNAUTHORIZED);

        if (bcrypt.compareSync(password, user.password)) {

            const token = uuid();

            await db.query(`
                INSERT INTO sessions (token, "userId")
                VALUES($1,$2)
            `, [token, user.id]
            );

            return res.status(STATUS_CODE.OK).send({ token });

        }

        return res.send(STATUS_CODE.UNAUTHORIZED);

    } catch (error) {

        res.status(STATUS_CODE.SERVER_ERROR).send(error.message);

    }
}