import { newUserSchema } from "../schema.js"
import { sanit } from "../sanitizing.js"
import { db } from "../database/mongo.js"

const cadastroGet = async (req, res) => {
    console.log('cadastro')
    res.send('cadastro feito')
}

const cadastroPost = async (req, res) => {
    const validationBefore = newUserSchema.validate(req.body)
    if(validationBefore.error) return res.status(422).send('n deu bom')
    const newUser = {
        name: sanit(req.body.name),
        email: sanit(req.body.email),
        password: sanit(req.body.password)
    }
    const validationAfter = newUserSchema.validate(newUser)
    if(validationAfter.error) return res.sendStatus(422)

    try {
        const a = await db.collection('users').find().toArray()
        console.log(a)
    } catch (error) {
        
    }

    res.send('deu bao')
}

export {
    cadastroGet,
    cadastroPost
}