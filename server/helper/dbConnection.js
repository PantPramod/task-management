import  Sequelize from "sequelize";
import envConfig from "../config/index.js";

  export const sequelize = new Sequelize(
    envConfig.DB_NAME,
    envConfig.USER_NAME,
    envConfig.PASSWORD,
     {
       host: 'localhost',
       dialect: 'mysql' 
     }
   );
   
sequelize.authenticate().then(() => {
   console.log('Connection has been established successfully.');
}).catch((error) => {
   console.error('Unable to connect to the database: ', error);
});

export default sequelize