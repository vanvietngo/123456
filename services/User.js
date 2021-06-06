const { User, Address } = require('../models')
const model = require('../models')

async function createUser(req, res) {

    try {

        const result = await model.sequelize.transaction(async (t) => {

            let user = await User.create({
                username: req.body.username,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password,
                phone: req.body.phone,
                Addresses: req.body.address.map(element => { //=> addresses has to tablename 
                    return {
                        street: element.street,
                        city: element.city,
                        state: element.state,
                        zip: element.zip
                    }
                })
            }
                , {
                    include: [
                        Address // model
                    ]
                }, { transaction: t }
            )
        });

        // If the execution reaches this line, the transaction has been committed successfully
        // `result` is whatever was returned from the transaction callback (the `user`, in this case)

    } catch (error) {
        res.status(400).json('stupid input')
        throw (error)
        // If the execution reaches this line, an error occurred.
        // The transaction has already been rolled back automatically by Sequelize!

    }





    //    try {
    //     await User.create({ // => user is table 
    //         username: req.body.username,
    //         firstName: req.body.firstName,
    //         lastName: req.body.lastName,
    //         email: req.body.email,
    //         password: req.body.password,
    //         phone: req.body.phone,
    //         Addresses: req.body.address.map(element => { //=> addresses has to tablename 
    //             return {
    //                 street: element.street,
    //                 city: element.city,
    //                 state: element.state,
    //                 zip: element.zip
    //             }
    //         })
    //     }
    //         , {
    //             include: [
    //                 Address // model
    //             ]
    //         }
    //     )
    //     res.status(200).json('sucsess')
    // }
    // catch (error) {
    //     res.status(500).json({ err: error })
    //     console.log(error)
    //     throw error
    // }
}

async function findOneUserByUsername(username) {
    let user = await User.findOne({
        where: { username: username },
        attributes: ['id', 'username', 'firstName', 'lastName', 'email', 'password', 'phone', 'role'],
        include: [
            {
                model: Address,
                attributes: ['id', 'street', 'city', 'state', 'zip']
            }
        ]
    }
    )
    return user
}


async function findOneUserById(id) {
    return User.findOne({
        where: { id: id }
    },
        { include: [Address] }
    )
}



async function deleteUser(username) {
   User.destroy({where:{username:username}})
}

async function putUserUsername(req){
    let user =await User.findOne({where:{id:req.user.id}})
    user.username = req.params.username
    await user.save()
    return user
}
module.exports = {
    createUser,
    findOneUserByUsername,
    deleteUser,
    findOneUserById,
    putUserUsername
}