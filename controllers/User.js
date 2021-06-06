const User = require('../services/User')
const jwt = require('../services/jwt')


async function createUser(req, res) {
     await User.createUser(req, res)
     return res.status(200).json("successful operation")
}

// login for get token
async function getTokenUser(req, res) {
    try {
        let user = await User.findOneUserByUsername(req.body.username)
        if (user == null) {
            return res.status(400).json("User not found")
        }
        else
            if (user.password === req.body.password) {
                let token = await jwt.createTokenUser(user.username, user.role, user.id)

                return res.status(200).json({ token })
            }
            else {
                return res.status(400).json("Invalid username/password supplied")
            }
    } catch (error) {
        console.log(error)
        return res.status(500).json("Server error")
    }

}



async function getUser(req, res) {
    try {
        let user = await User.findOneUserByUsername(req.params.username)
        if (user == null) {
            res.status(400).json('User not found')

        } else {
            res.json(user)
        }
    } catch (error) {
        res.status(500).json("server error")
        throw error
    }

}


async function deleteUser(req, res) {
    try {
        let user = await User.findOneUserByUsername(req.params.username)
        if (req.user.username === req.params.username) {
            await User.deleteUser(user.username)
            return res.status(200).json("successful operation")
        }
        else {
            res.status(500).json("you can't permission")
        }

    } catch (error) {
        res.status(500).json("server error")
        throw error
    }

}

async function putUserUsername(req, res) {
    try {
        let user = await User.putUserUsername(req)
        return res.status(200).json(user)
    } catch (error) {
        res.status(400).json("Invalid Input")
    }

}
module.exports = {
    createUser,
    getTokenUser,
    getUser,
    deleteUser,
    putUserUsername
}