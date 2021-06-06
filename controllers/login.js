const jwt = require('../services/jwt')
try {
    let checkJwt = async function (req, res, next) {
        let token =await req.headers.authorization.split(' ')[1]
        let user = jwt.verify(token, 'privaykey')
        if (user) {
            res.status(200).json({ status: 'login sucssess' })
            next()
        }
        else{
            return res.status(400).json("loggin fail")
        }

    }
} catch (error) {
    console.log('err=', error)
    res.status(400).json('err')
}

module.exports = {
    checkJwt
}





















// JWT MIDDLEWARE
const jwt = require('jsonwebtoken')
const httpError = require('http-errors')

module.exports = (req, res, next) => {
  try {
    const tokenHeader = req.headers.authorization.split('Bearer ')[1]
    const decoded = jwt.verify(tokenHeader, process.env.ACCESS_TOKEN_SECRET)
    req.user = decoded
    next()
  } catch (err) {
    next(httpError(401))
  }
}

