import Joi from 'joi'


const createTaskSchema= Joi.object({
    title:Joi.string().required(),
    description:Joi.string().optional().min(20),
    date:Joi.string().required()
})

const updateTaskSchema= Joi.object({
    title:Joi.string(),
    description:Joi.string().optional().min(0),
    date:Joi.string() 
})

export {createTaskSchema, updateTaskSchema}