import express from 'express';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

import { loginSchema } from "../schema.js"
import { sanit } from "../sanitizing.js"
import { db } from "../database/mongo.js"
import { compareSync } from 'bcrypt';

const loginPost =  async (req, res) => {
    const validationBefore = loginSchema.validate(req.body)
    if(validationBefore.error) return res.sendStatus(422)
    const user = {
        email: sanit(req.body.email),
        password: req.body.password
    }
    const validationAfter = loginSchema.validate(user)
    if(validationAfter.error) return res.sendStatus(422)

    const {email, password} = user;

    try {
        const emailExists = await db.collection('users').findOne({email})

        if (!emailExists || !bcrypt.compareSync(password, emailExists.password)) {
            return res.sendStatus(401)
        }

        const userLogged = await db.collection('sessions').findOne({userId: emailExists._id})

        const token = uuid();
        if (userLogged) {
            await db.collection('sessions').updateOne({
                userId: userLogged.userId
            }, {
                $set: { token: token}
            })
            console.log('token was switched to ' + token)
        } else {
            await db.collection('sessions').insertOne({
                userId: emailExists._id,
                token
            })
        }

        res.send(token)
    } catch (error) {
        res.sendStatus(500)
    }
}

export { loginPost }