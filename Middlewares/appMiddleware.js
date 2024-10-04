// sample middleware

const appMiddleware = (req, res, next) => {
  console.log("inside Middleware ")
  next()
}

module.exports = appMiddleware
