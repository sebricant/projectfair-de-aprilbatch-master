const mongoose = require("mongoose")

const password = process.env.Password
const connectionString = process.env.DATABASE
mongoose
  .connect(connectionString)
  .then((res) => {
    console.log()

    console.log("Mongo DB connected successfully")
  })
  .catch((err) => {
    console.log("MongoDB connection failed")
    console.log(err)
  })
