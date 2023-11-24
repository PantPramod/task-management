import Task from "../../model/task.js"

const delateTask=async(req, res, next)=>{
     await Task.destroy({
        where: {
          id: req.params.id
        }
      })
      res.send("deleted")
}

export default delateTask