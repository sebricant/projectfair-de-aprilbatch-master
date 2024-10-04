// const appMiddleware = require("./Middlewares/appMiddleware")

const router = require("./Router/router")

// 1) import dotenv module
require("dotenv").config()

// 2) import express module
const express = require("express")

require("./DB/connections")

// 3) import cors module
const cors = require("cors")

// 4) create server using express
const pfServer = express()

// 5) inject cors into pfserver
pfServer.use(cors())

// 6) use middle were to convert JSON data to js Object
pfServer.use(express.json())

// pf server 
pfServer.use("/uploads",express.static("./uploads"))

// pfServer.use(appMiddleware)

pfServer.use(router)
// 7) Provide PORT
const PORT = 4001

// 8) run the server

pfServer.listen(PORT, () => {
  console.log(`pfServer is running in PORT ${PORT}`)
})

pfServer.get("/", (req, res) => {
  res.send("port local host 4000 is live now and active")
})
