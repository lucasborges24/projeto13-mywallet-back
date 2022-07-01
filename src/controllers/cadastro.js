import bcrypt from 'bcrypt'

import { db } from "../database/mongo.js"

const cadastroPost = async (req, res) => {
    const { email, password, newUser } = res.locals
    
    const passwordCrypt = bcrypt.hashSync(password, 10);

    try {
        const emailAlreadyExist = await db.collection('users')
            .findOne({ email })
        if (emailAlreadyExist) return res.sendStatus(409)
        
        await db.collection('users')
            .insertOne({
                ...newUser, password: passwordCrypt
            })

        res.status(201).send('OK')
    } catch (error) {
        res.status(500).send(error)
    }
}

export {
    cadastroPost
}