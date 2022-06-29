import bcrypt from 'bcrypt'

import { newUserSchema } from "../schema.js"
import { sanit } from "../sanitizing.js"
import { db } from "../database/mongo.js"

const cadastroPost = async (req, res) => {
    const validationBefore = newUserSchema.validate(req.body)
    if(validationBefore.error) return res.sendStatus(422)
    const newUser = {
        name: sanit(req.body.name),
        email: sanit(req.body.email),
        password: req.body.password
    }
    const validationAfter = newUserSchema.validate(newUser)
    if(validationAfter.error) return res.sendStatus(422)

    const {name, email, password} = newUser;
    const passwordCrypt = bcrypt.hashSync(password, 10);
    
    try {
        const emailAlreadyExist = await db.collection('users').findOne({email})
        if(emailAlreadyExist) return res.sendStatus(409)

        await db.collection('users').insertOne({...newUser, password: passwordCrypt})
        
        res.status(201).send('OK')
    } catch (error) {
        res.status(500).send(error)
    }

}

export {
    cadastroPost
}