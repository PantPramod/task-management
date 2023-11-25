import Joi from 'joi'


const createTaskSchema= Joi.object({
    title:Joi.string().required(),
    description:Joi.string().min(20).required(),
    date:Joi.string().required()
})

const updateTaskSchema= Joi.object({
    title:Joi.string(),
    description:Joi.string().min(20),
    date:Joi.string()
})

export {createTaskSchema, updateTaskSchema}