import Task from "../../model/task.js";

const getTaskById=async(req, res, next)=>{
    const task = await Task.findOne({ where: { id: req.params.id } })
    res.send(task);
}

export default getTaskById