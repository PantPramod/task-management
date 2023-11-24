import Task from "../../model/task.js"

const createNewTask=async(req, res, next)=>{
    const { title, description, date } = req.body
    const newTask = await Task.create({
      title,
      description,
      date
    })
    res.send(newTask)
    
}

export default createNewTask