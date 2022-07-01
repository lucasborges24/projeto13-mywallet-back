import { db } from "../database/mongo.js"
import { ObjectId } from "mongodb"


const editarPut = async (req, res) => {
    let { newValue } = res.locals
    const { user, itemId } = res.locals
    try {
        newValue = { ...newValue, userId: user.userId }
        await db.collection('values')
            .updateOne({
                _id: ObjectId(itemId)
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