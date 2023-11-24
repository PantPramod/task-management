import  sequelize  from "../helper/dbConnection.js";
import {DataTypes} from 'sequelize'

 const Task = sequelize.define("tasks", {
   title: {
     type: DataTypes.STRING,
     allowNull: false
   },
   description: {
    type: DataTypes.STRING,
  },
   date: {
     type: DataTypes.DATEONLY,
   },
});



sequelize.sync().then(() => {
   console.log('Task table created successfully!');
   
}).catch((error) => {
   console.error('Task to create table : ', error);
});

export default Task
