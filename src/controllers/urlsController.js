import { nanoid } from "nanoid";
import { db } from "../database/database.connection.js";
import { STATUS_CODE } from "../enums/statusCode.js";

export async function postUrlShorten(req, res) {
    const { url } = req.body;

    const { authorization } = req.headers;


    if (!authorization) return res.sendStatus(STATUS_CODE.UNAUTHORIZED);

    const token = authorization?.replace('Bearer ', "");

    if (!token) return res.sendStatus(STATUS_CODE.UNAUTHORIZED);

    try {

        const { rows } = await db.query('SELECT * FROM sessions WHERE token = $1', [token]);

        const [sesssion] = rows;

        if (!sesssion) return res.sendStatus(STATUS_CODE.UNAUTHORIZED);

        const shortUrl = nanoid(8);

        await db.query(`
            INSERT INTO shortens (url, "shortUrl", "userId")
            VALUES ($1,$2,$3)
        `, [url, shortUrl, sesssion.userId]
        );

        const { rows: [shortUrlId] } = await db.query('SELECT * FROM shortens WHERE "shortUrl"=$1', [shortUrl]);


        res.status(STATUS_CODE.CREATED).send({ id: shortUrlId.id, shortUrl });

    } catch (error) {

        res.status(STATUS_CODE.SERVER_ERROR).send(error.message);

    }

}

export async function getUrlsById(req, res) {
    const { id } = req.params;

    try {

        const { rows } = await db.query('SELECT * FROM shortens WHERE id = $1', [id]);

        const [urls] = rows;

        if (!urls) return res.sendStatus(STATUS_CODE.NOT_FOUND);

        const objectUrls = {
            id: urls.id,
            shortUrl: urls.shortUrl,
            url: urls.url
        };

        res.status(STATUS_CODE.OK).send(objectUrls);

    } catch (error) {

        res.status(STATUS_CODE.SERVER_ERROR).send(error.message);

    }
}

export async function getOpenShortUrl(req, res) {
    const { shortUrl } = req.params;

    try {

        const { rows } = await db.query('SELECT * FROM shortens WHERE "shortUrl" = $1', [shortUrl]);

        const [url] = rows;

        if (!url) return res.sendStatus(STATUS_CODE.NOT_FOUND);

        await db.query('UPDATE shortens SET views = views + 1 WHERE id= $1', [url.id]);

        res.redirect(url.url);

    } catch (error) {

        res.status(STATUS_CODE.SERVER_ERROR).send(error.message);

    }

}

export async function deleteUrlsById(req, res) {
    const { id } = req.params;

    const { authorization } = req.headers;

    if (!authorization) return res.sendStatus(STATUS_CODE.UNAUTHORIZED);

    const token = authorization?.replace('Bearer ', "");

    if (!token) return res.sendStatus(STATUS_CODE.UNAUTHORIZED);

    try {

        const { rows } = await db.query('SELECT * FROM sessions WHERE token = $1', [token]);

        const [user] = rows;

        if (!user) return res.sendStatus(STATUS_CODE.UNAUTHORIZED);

        const { rows: shortens } = await db.query('SELECT * FROM shortens WHERE id = $1', [id]);

        const [url] = shortens;

        if (!url) return res.sendStatus(STATUS_CODE.NOT_FOUND);

        if (user.userId != url.userId) return res.sendStatus(STATUS_CODE.UNAUTHORIZED);

        await db.query('DELETE FROM shortens WHERE id= $1', [id]);

        res.sendStatus(STATUS_CODE.NO_CONTENT);

    } catch (error) {

        res.status(STATUS_CODE.SERVER_ERROR).send(error.message);

    }

}