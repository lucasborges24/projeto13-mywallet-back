import { db } from "../database/mongo.js"
import { sanit } from "../sanitizing.js"
import { valueSchema } from "../schema.js"
import dayjs from "dayjs"

const saidaPost = async (req, res) => {
    const { user } = res.locals
    let { newValue } = res.locals
    newValue = {
        ...newValue,
        dateNow: Date.now(),
        day: dayjs().format('DD/MM'),
        userId: user.userId
    }
    try {
        await db.collection('values')
            .insertOne(newValue)
        const valueToSend = await db.collection('values')
            .findOne(newValue)
        res.status(201).send(valueToSend)
    } catch (error) {
        res.sendStatus(500)
    }
}

export {
    saidaPost
}