import { db } from "../database/database.connection.js";
import { STATUS_CODE } from "../enums/statusCode.js";

export async function getUserById(req, res) {

    const { authorization } = req.headers;

    if (!authorization) return res.sendStatus(STATUS_CODE.UNAUTHORIZED);

    const token = authorization?.replace('Bearer ', "");

    if (!token) return res.sendStatus(STATUS_CODE.UNAUTHORIZED);

    try {

        const { rows } = await db.query('SELECT * FROM sessions WHERE token = $1', [token]);

        const [session] = rows;

        if (!session) return res.sendStatus(STATUS_CODE.UNAUTHORIZED);

        const { rows: users } = await db.query('SELECT * FROM users WHERE id=$1', [session.userId]);

        const [user] = users;


        const { rows: [visitCount] } = await db.query('SELECT SUM(views) FROM shortens WHERE "userId"=$1', [user.id]);

        const { rows: shortenedUrls } = await db.query('SELECT * FROM shortens WHERE "userId"=$1', [user.id]);

        const object = {

            id: user.id,
            name: user.name,
            visitCount: (visitCount.sum === null ? 0 : Number(visitCount.sum)),
            shortenedUrls: shortenedUrls
        };

        res.status(STATUS_CODE.OK).send(object);

    } catch (error) {

        res.status(STATUS_CODE.SERVER_ERROR).send(error.message);

    }

}