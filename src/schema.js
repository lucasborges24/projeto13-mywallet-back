import joi from 'joi'

const newUserSchema = joi.object({
    name: joi.string()
        .required()
        .trim(),
    email: joi.string()
        .email()
        .required()
        .trim(),
    password: joi.string()
        .min(8)
        .max(30)
        .required()
})

const loginSchema = joi.object({
    email: joi.string()
        .email()
        .required()
        .trim(),
    password: joi.string()
        .min(8)
        .max(30)
        .required()
})
const numberMethod = (value, helpers) => {
    if (typeof value !== 'number') {
        return helpers.error('any.invalid')
    }
    return value;
}
const valueSchema = joi.object({
    value: joi.number()
        .precision(2)
        .required(),
    description: joi.string()
        .required()
        .trim(),
    type: joi.string()
        .valid('in', 'out')
        .required()
}).unknown()

export {
    newUserSchema,
    loginSchema,
    valueSchema
}