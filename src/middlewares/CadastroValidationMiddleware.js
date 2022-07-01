import { newUserSchema } from "../schema.js"
import { sanit } from "../sanitizing.js"

const cadastroValidationMiddleware = async (req, res, next) => {
    const validationBefore = newUserSchema.validate(req.body)
    if(validationBefore.error) return res.sendStatus(422)
    const newUser = {
        name: sanit(req.body.name),
        email: sanit(req.body.email),
        password: req.body.password
    }
    const validationAfter = newUserSchema.validate(newUser)
    if(validationAfter.error) return res.sendStatus(422)

    res.locals.newUser = newUser
    res.locals.password = newUser.password
    res.locals.email = newUser.email

    next();
}

export {
    cadastroValidationMiddleware
}