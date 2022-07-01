
import { ObjectId } from "mongodb"
import { db } from "../database/mongo.js"

const homeGet = async (req, res) => {

    const { user } = res.locals
    
    try {
        const data = await db.collection('values').find({userId: user.userId}).toArray();
        res.send([user, data])
    } catch (error) {
        res.sendStatus(500)
    }
}

const homeDelete = async (req, res) => {
    const {id} = req.params
    const {authorization} = req.headers

    if (!id || !authorization) return res.send(422)
    
    const token = authorization.replace('Bearer ', '');
    try {
        const user = db.collection('sessions').findOne({token})

        if (!user) return res.sendStatus(401)
        await db.collection('values').deleteOne({_id: ObjectId(id)})
        res.sendStatus(200)
    } catch (error) {
        res.sendStatus(500)
    }
    
}

export {
    homeGet,
    homeDelete
}