import Task from '../../model/task.js'

const getAllTasks = async (req, res, next) => {
    const result = await Task.findAll()
    res.send(result)
}

export default getAllTasks