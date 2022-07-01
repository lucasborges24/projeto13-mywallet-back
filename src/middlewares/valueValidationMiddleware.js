import { valueSchema } from "../schema.js"
import { sanit } from "../sanitizing.js"


const valueValidationMiddleware = async (req, res, next) => {
    const validationBefore = valueSchema.validate(req.body)
    if(validationBefore.error) return res.sendStatus(422);
    let newValue = {
        value: req.body.value,
        description: sanit(req.body.description),
        type: sanit(req.body.type),
    }
    if (typeof newValue.value === 'string') {
        newValue.value = Number(newValue.value)
    }
    const validationAfter = valueSchema.validate(newValue)
    if (validationAfter.error) return res.sendStatus(422);

    res.locals.newValue = newValue;

    next();
}

export {
    valueValidationMiddleware
}