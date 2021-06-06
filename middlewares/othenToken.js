const {jwt, secret} = require('../services/jwt')
var unless = require('express-unless');

// this is a middleware 
async function loginUser(req, res, next) {
    try {
        let token = await req.headers.authorization.split(' ')[1]
        let user =await jwt.verify(token, secret)
        req.user = user
        next()
    } catch (error) {
        console.log(error)
        return res.status(400).json('You need to login')
    }
}



module.exports = {
    loginUser
}