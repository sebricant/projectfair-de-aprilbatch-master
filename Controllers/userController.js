const jwt = require("jsonwebtoken")
const users = require("../Model/userSchema")

exports.register = async (req, res) => {
  // store the user details to DB
  console.log("Inside user register controller")
  const { username, email, password } = req.body

  // check email id present or not

  try {
    const existinguser = await users.findOne({ email: email })
    if (existinguser) {
      res.status(400).json("Account already exist")
    } else {
      const newUser = new users({
        username: username,
        email: email,
        password: password,
        github: "",
        linkedin: "",
        profile: "",
      })
      await newUser.save()
      console.log("Account not exist")
      res.status(200).json("user registration successful")
    }
  } catch (err) {
    res.status(401).json("Register request failed due to ", err)
  }
}

exports.getUserDetails = (req, res) => {
  res.status(200).json("inside the getUserDetails")
}

exports.login = async (req, res) => {
  console.log("inside login controller")
  const { email, password } = req.body
  try {
    const existingUsers = await users.findOne({
      email: email,
      password: password,
    })
    // const existingUsers= users.findOne({email,password) if both the name and value same you can use it like this.
    if (existingUsers) {
      const token = jwt.sign({ userId: existingUsers._id }, "Nice")
      console.log(token)

      res.status(200).json({ data: existingUsers, token: token })
    } else {
      res.status(400).json("Invalid Email or Password")
    }
  } catch (error) {
    res.status(500).json("Internal Server Error")
  }
}
