import express from 'express'
import getAllTasks from '../controller/task/getAllTasks.js'
import createNewTask from '../controller/task/createNewTask.js'
import getTaskById from '../controller/task/getTaskById.js'
import updateTask from '../controller/task/updateTask.js'
import delateTask from '../controller/task/deleteTask.js'
import asyncHandler from '../helper/asyncHandler.js'
import { createTaskSchema, updateTaskSchema } from '../helper/types.js'
import validator from '../middlewares/validator.js'

const router = express.Router()


router.get("/", asyncHandler(getAllTasks))

router.post("/", validator(createTaskSchema), asyncHandler(createNewTask))

router.get("/:id", asyncHandler(getTaskById))

router.patch("/:id", validator(updateTaskSchema), asyncHandler(updateTask))

router.delete("/:id", asyncHandler(delateTask))


export default router