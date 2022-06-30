import { db } from "../database/mongo.js"
import { ObjectId } from "mongodb"
import { sanit } from "../sanitizing.js"
import { valueSchema } from "../schema.js"
import dayjs from "dayjs"

const editarPut = async (req, res) => {
    const {authorization} = req.headers
    const {url} = req.params
    if (!authorization) return res.sendStatus(422)
    const validationBefore = valueSchema.validate(req.body)
    if(validationBefore.error) return res.sendStatus(422)
    let newValue = {
        value: req.body.value,
        description: sanit(req.body.description),
        type: sanit(req.body.type),
    }
    const validationAfter = valueSchema.validate(newValue)
    if (validationAfter.error) return res.sendStatus(422)

    const token = authorization.replace('Bearer ', '');

    try {
        const user = await db.collection('sessions').findOne({token})
        
        if (!user) return res.sendStatus(401)

        newValue = {...newValue, userId: user.userId}
        await db.collection('values').updateOne({
            _id: ObjectId(url)
        }, {
            $set: {
                value: newValue.value,
                description: newValue.description,
                type: newValue.type
            }
        })
        
        res.sendStatus(201)
    } catch (error) {
        res.sendStatus(500)
    }
}

export {
    editarPut
}