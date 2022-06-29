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

export {
    newUserSchema
}