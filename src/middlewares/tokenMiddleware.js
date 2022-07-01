import { db } from "../database/mongo.js"

const tokenMiddleware = async (req, res, next) => {
    const { authorization } = req.headers
    if (!authorization) return res.sendStatus(422)

    const token = authorization.replace('Bearer ', '')
    if (!token) return res.sendStatus(401)

    try {
        const user = await db.collection('sessions')
            .findOne({ token });
        if (!user) return res.sendStatus(401);

        res.locals.user = user;

        next();
    } catch (error) {
        return res.sendStatus(500);
    }
}

export { tokenMiddleware }