const { decrypt } = require("dotenv")
const jwt = require("jsonwebtoken")

const jwtMiddleware = (req, res, next) => {
  console.log("inside JWTmiddleware")
  const token = req.headers["authorization"].split(" ")[1]

  console.log("token:", token)
  try {
    //  jwt.verify() method is is used to decrypt the token
    const jwtResponse = jwt.verify(token, "Nice")
    console.log(jwtResponse)
    req.payload = jwtResponse.userId
    next()
  } catch (err) {
    console.log(err)
    res.status(401).json("Authorization failed , Please login")
  }
}

module.exports = jwtMiddleware
