import Joi from 'joi';

const createUserSchema = Joi.object({
    email: Joy.string().lowercase().email().required(),
    password: Joi.string().min(6).required
})
const loginSchema = Joi.object({
    email: Joy.string().lowercase().email().required(),
    password: Joi.string().min(6).required
})

export default {
    createUserSchema,
    loginSchema
}