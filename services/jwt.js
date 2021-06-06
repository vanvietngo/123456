const jwt = require('jsonwebtoken');
const secret = "thisIsSeCretKey"

async function createTokenUser(username, role, id) {
    return jwt.sign({
        username: username,
        role: role,
        id:id
    },
        secret);
}


module.exports = {
    createTokenUser,
    secret,
    jwt
}