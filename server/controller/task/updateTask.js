import Task from "../../model/task.js";

const updateTask = async (req, res, next) => {
    const { title, description, date } = req.body
    await Task.update(
        {
            title,
            description,
            date
        },
        { where: { id: req.params.id } }
    )
    res.send("Updated");
}


export default updateTask