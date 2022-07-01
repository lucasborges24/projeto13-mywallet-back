import { v4 as uuid } from 'uuid';

import { db } from "../database/mongo.js"

const loginPost = async (req, res) => {
    const { userLogin } = res.locals

    try {
        const userLogged = await db.collection('sessions')
            .findOne({
                userId: userLogin._id
            })

        const token = uuid();

        if (userLogged) {
            await db.collection('sessions')
                .updateOne({
                    userId: userLogged.userId
                }, {
                    $set: { token: token }
                })

            console.log('token was switched to ' + token)
        } else {
            await db.collection('sessions')
                .insertOne({
                    name: userLogin.name,
                    userId: userLogin._id,
                    token
                })
        }
        res.send(token)
    } catch (error) {
        res.sendStatus(500)
    }
}

export { loginPost }