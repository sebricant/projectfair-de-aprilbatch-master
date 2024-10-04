// 1) import mongoose

const mongoose = require("mongoose")

// 2) create schema

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  github: {
    type: String,
  },
  linkedin: {
    type: String,
  },
  profile: {
    type: String,
  },
})

// 3) create Model

const users = mongoose.model("users", userSchema)

// 4) Export the model

module.exports = users
