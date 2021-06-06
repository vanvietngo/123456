const express = require('express')
const router = express.Router()
const set = require('../middlewares/upload')


//
const Pet = require('../controllers/Pet');
const User = require('../controllers/User');
const Order = require('../controllers/Order');

const othenToken = require('../middlewares/othenToken')
const roleAdmin = require('../middlewares/roleAdmin');

//

// --------- Pets ----------
router.post('/pets',
    othenToken.loginUser,
    roleAdmin.checkRole,
    async (req, res, next) => {
        Pet.CreatePet(req, res)
    })

// // recive value on query
router.get('/pets/findByStatus', othenToken.loginUser, async (req, res, next) => {
    Pet.findByStatusPet(req, res)
})


router.get('/pets/findByTags', othenToken.loginUser, async (req, res, next) => {
    Pet.findAllByTagName(req, res)
})

router.get('/pets/:petId', othenToken.loginUser, async (req, res, next) => {
    Pet.findOneByIdPet(req, res)
})

router.put('/pets/:petId', othenToken.loginUser, async (req, res, next) => {
    Pet.UpdatePetById(req, res)
})

router.delete('/pets/:petId', othenToken.loginUser, roleAdmin.checkRole, async (req, res, next) => {
    Pet.DeletePetById(req, res)
})

router.post('/pets/:petId/uploadImage', othenToken.loginUser, roleAdmin.checkRole, set.upload.single('image'), (req, res) => {
    Pet.PushUlrsPetById(req, res)
})





// // -------- Uers -----------
router.post('/user/register', async (req, res, next) => {
    User.createUser(req, res)

})

router.post('/user/login', async (req, res, next) => {
    User.getTokenUser(req, res)
})

router.get('/user/:username', othenToken.loginUser, roleAdmin.checkRole, async (req, res, next) => {
    User.getUser(req, res)
})

router.put('/user/:username', othenToken.loginUser, async (req, res, next) => {
    User.putUserUsername(req, res)
})



// ------- order -----------
router.post('/orders', othenToken.loginUser, async (req, res, next) => {
    Order.createOrder(req, res)
})

router.get('/orders/:orderId', othenToken.loginUser, async (req, res, next) => {
    Order.getOrder(req, res)
})

router.put('/orders/:orderId', othenToken.loginUser, async (req, res, next) => {
    Order.updateOrder(req, res)
})

router.delete('/orders/:orderId', othenToken.loginUser, async (req, res, next) => {
    Order.deleteOrder(req, res)
})


module.exports = router


