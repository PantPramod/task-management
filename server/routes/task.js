import express from 'express'
import getAllTasks from '../controller/task/getAllTasks.js'
import createNewTask from '../controller/task/createNewTask.js'
import getTaskById from '../controller/task/getTaskById.js'
import updateTask from '../controller/task/updateTask.js'
import delateTask from '../controller/task/deleteTask.js'
import asyncHandler from '../helper/asyncHandler.js'

const router = express.Router()


router.get("/", asyncHandler(getAllTasks))

router.post("/", asyncHandler(createNewTask))

router.get("/:id", asyncHandler(getTaskById))

router.put("/:id", asyncHandler(updateTask))

router.delete("/:id", asyncHandler(delateTask))


export default router