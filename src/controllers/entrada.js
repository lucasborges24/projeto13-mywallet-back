
import { db } from "../database/mongo.js"
import { sanit } from "../sanitizing.js"
import { valueSchema } from "../schema.js"
import dayjs from "dayjs"

const entradaPost = async (req, res) => {
    const {authorization} = req.headers
    const validationBefore = valueSchema.validate(req.body)
    if(validationBefore.error) return res.sendStatus(422)
    let newValue = {
        value: req.body.value,
        description: sanit(req.body.description),
        type: sanit(req.body.type),
        dateNow: Date.now(),
        day: dayjs().format('DD/MM')
    }
    const validationAfter = valueSchema.validate(newValue)
    if (validationAfter.error) return res.sendStatus(422)


    const token = authorization.replace('Bearer ', '')
    
    try {
        const user = await db.collection('sessions').findOne({token})
        
        if (!user) return res.sendStatus(401)

        newValue = {...newValue, userId: user.userId}
        await db.collection('values').insertOne(newValue)
        const valueToSend = await db.collection('values').findOne(newValue)
        res.status(201).send(valueToSend)
    } catch (error) {
        res.sendStatus(500)
    }
}

export {
    entradaPost
}