const express = require("express")
const cors = require("cors")
const config = require("./utils/config")

//routers
const billRouter = require("./routers/bill")


const app = express()

app.use(express.json())
app.use(cors())

app.use("/api/bill",billRouter)



app.listen(config.PORT)