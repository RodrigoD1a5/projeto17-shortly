import { db } from "../database/database.connection.js";
import { STATUS_CODE } from "../enums/statusCode.js";

export async function getRanking(req, res) {
    try {

        const { rows } = await db.query(`
        SELECT 
            users.id,
            users.name,
            COUNT(shortens.id) AS "linksCount",
            COALESCE(SUM(shortens.views),0) AS "visitCount"
        FROM users
        LEFT JOIN shortens ON shortens."userId"=users.id
        GROUP BY users.id
        ORDER BY "visitCount" DESC
        LIMIT 10
        `);

        res.status(STATUS_CODE.OK).send(rows);

    } catch (error) {

        res.status(STATUS_CODE.SERVER_ERROR).send(error.message);

    }

}