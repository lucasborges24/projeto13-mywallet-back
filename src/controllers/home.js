

import { db } from "../database/mongo.js"

const homeGet = async (req, res) => {
    const {authorization} = req.headers
    if (!authorization) return res.sendStatus(422)
    const token = authorization.replace('Bearer ', '')

    try {
        const user = await db.collection('sessions').findOne({token})

        if(!user) return res.sendStatus(401)
        const data = await db.collection('values').find({userId: user.userId}).toArray();
        
        res.sendStatus(200)
    } catch (error) {
        res.sendStatus(500)
    }
}

const homeDelete = async (req, res) => {
    console.log('deleting here')
    res.send('deleted')
}

export {
    homeGet,
    homeDelete
}