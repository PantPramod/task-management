import dotenv from 'dotenv'

dotenv.config()


const envConfig = {
    PORT: process.env.PORT,
    DB_NAME:process.env.DB_NAME,
    USER_NAME:process.env.USER_NAME,
    PASSWORD:process.env.PASSWORD

}

export default envConfig