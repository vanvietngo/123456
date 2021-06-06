const Pet = require('../services/Pet')
const Order = require('../services/Order')



async function CreatePet(req, res) {
    await Pet.createPet(req, res)
    res.status(200).json('sucsess')
}


async function findByStatusPet(req, res) {
    try {
        let pet = await Pet.findAllByStatus(req.query.status)
        res.status(200).json(pet)
    } catch (error) {
        res.status(400).json(error)
        throw error
    }

}

async function findAllByTagName(req, res) {
    try {
        let pet = await Pet.findAllByTagName(req.query.tags)
        return res.status(200).json(pet)
    } catch (error) {
        res.status(400).json(error)
        throw error
    }
}

async function findOneByIdPet(req, res) {
    try {
        let pet = await Pet.findOneByIdPet(req.params.petId)
        return res.status(200).json(pet)
    } catch (error) {
        res.status(400).json(error)
        throw error
    }
}

async function UpdatePetById(req, res) {
    try {
        let pet = await Pet.findOneByIdPet(req.params.petId)
        if (pet === null) {
            return res.status(400).json('pet not found ')
        }
        // else if(pet.status == 'pending'|| pet.status == 'sold'){
        //     return res.status(400).json('pet is processing ! ')
        // }
        else {
            await Pet.UpdatePetById(req.params.petId, req.query.name, req.query.status)
            return res.status(200).json('sucsess')
        }
    } catch (error) {
        res.status(200).json(error)
        throw error
    }
}

async function DeletePetById(req, res) {

    try {

        // check pest is ordered ?
        let check = await Order.checkPetInOrder(req.params.petId)
        if (check) {
            return res.status(400).json("Pet is ordered. Can't delete")
        }
        else {
            let pet = await Pet.findOneByIdPet(req.params.petId)
            if (pet === null) {
                return res.status(400).json('pet not found ')
            }
            else {
                await Pet.DeletePetById(req.params.petId)
                return res.status(200).json('sucsess')
            }
        }

    } catch (error) {
        res.status(400)
        throw error
    }
}

async function PushUlrsPetById(req, res) {
    try {
        let pet = await Pet.findOneByIdPet(req.params.petId)
        if (pet === null) {
            return res.status(400).json('pet not found ')
        }
        else {
            let urlPhoto = req.protocol + '://' + req.get('host') + '/' + req.file.path
            await Pet.PushUlrsPetById(req.params.petId, urlPhoto)
            return res.status(200).json('sucsess')
        }

    } catch (error) {
        res.status(400)
        throw error
    }

}
module.exports = {
    CreatePet,
    findByStatusPet,
    findAllByTagName,
    findOneByIdPet,
    UpdatePetById,
    DeletePetById,
    PushUlrsPetById,
}
