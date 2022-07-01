import { loginSchema } from "../schema.js"
import { sanit } from "../sanitizing.js"
import bcrypt from 'bcrypt';
import { db } from "../database/mongo.js"

const loginValidationMiddleware = async (req, res, next) => {
    const validationBefore = loginSchema.validate(req.body)
    if(validationBefore.error) return res.sendStatus(422)
    const user = {
        email: sanit(req.body.email),
        password: req.body.password
    }
    const validationAfter = loginSchema.validate(user)
    if(validationAfter.error) return res.sendStatus(422)

    const { email, password } = user;

    try {
        const userLogin = await db.collection('users').findOne({email})
        
        if (!userLogin || !bcrypt.compareSync(password, userLogin.password)) {
            return res.sendStatus(401)
        }

        res.locals.userLogin = userLogin;

        next();
    } catch (error) {
        res.sendStatus(500)
    }
}

export {
    loginValidationMiddleware
}