import { ObjectId } from "mongodb"

import { db } from "../database/mongo.js"

const homeGet = async (req, res) => {

    const { user } = res.locals

    try {
        const data = await db.collection('values')
            .find({
                userId: user.userId
            })
            .toArray();
            
        res.send([user, data])
    } catch (error) {
        res.sendStatus(500)
    }
}

const homeDelete = async (req, res) => {
    const { itemId } = res.locals

    try {
        await db.collection('values')
            .deleteOne({
                _id: ObjectId(itemId)
            })
            
        res.sendStatus(200)
    } catch (error) {
        res.sendStatus(500)
    }
}

export {
    homeGet,
    homeDelete
}