import express from 'express'
import cors from 'cors'
import envConfig from './config/index.js'
import allRoutes from './routes/index.js'
import errorHandler from './middlewares/errorHandler.js'


const app = express()
const PORT = envConfig.PORT || 4000

//middlewares
app.use(cors())
app.use(express.json())

//routes
app.use("/api", allRoutes)

app.use("/", (req, res)=>{
       res.send("You are on backend")
})

app.use(errorHandler)

app.listen(PORT, () => {
    console.log("App listening at PORT : ", PORT)
})