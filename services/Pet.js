const { Pet, Tag, Category, petTag, petCategory } = require('../models')
const models = require('../models');

async function createPet(req, res) {
    const oo = await models.sequelize.transaction();
    try {
        // create Pet
        let pet = await Pet.create({
            name: req.body.name,
            photoUrls: req.body.photoUrls
        }, { transaction: oo })

        // each tagName
        for (i = 0; i < req.body.tags.length; i++) {
            let tagCheck = await Tag.findOne({ where: { name: req.body.tags[i].name } })
            // existed
            if (tagCheck != null) {
                // just create petTag table
                await petTag.create({ PetId: pet.id, TagId: tagCheck.id }, { transaction: oo })
            }
            //not exist
            else {
                // create Tag  
                let tag = await Tag.create({ name: req.body.tags[i].name }, { transaction: oo })
                // create petTag
                await petTag.create({ PetId: pet.id, TagId: tag.id }, { transaction: oo })
            }
        }
        for (j = 0; j < req.body.categories.length; j++) {
            let categoryCheck = await Category.findOne({ where: { name: req.body.categories[j].name } })
            // existed
            if (categoryCheck != null) {
                // just create petCategory table
                await petCategory.create({ PetId: pet.id, CategoryId: categoryCheck.id }, { transaction: oo })
            }
            // not exist
            else {
                // create Category  
                let category = await Category.create({ name: req.body.categories[j].name }, { transaction: oo })
                // create petCategory
                await petCategory.create({ PetId: pet.id, CategoryId: category.id }, { transaction: oo })
            }
        }
        await oo.commit()
    } catch (error) {
        await oo.rollback()
        res.status(400).json('erro input')
        throw error
    }
}

async function findAllByStatus(status) {
    let pet = await Pet.findAll({
        where: { status: status },
        attributes: ['id', 'name', 'photoUrls', 'status'],
        include: [
            {
                model: Tag,
                attributes: ['name'],
                through: { attributes: [] }
            },
            {
                model: Category,
                attributes: ['name'],
                through: { attributes: [] }
            }
        ]
    })
    return pet
}

async function findAllByTagName(tagName) {
    let pet = await Pet.findAll({
        attributes: ['id', 'name', 'photoUrls', 'status'],
        include: [
            {
                model: Tag,
                as: "Tags",
                where: { name: tagName },
                attributes: ['id', 'name'],
                through: { attributes: [] }
            },
            {
                model: Category,
                as: "Categories",
                attributes: ['id', 'name'],
                through: { attributes: [] }
            },
        ]
    })
    return pet
}

async function findOneByIdPet(idPet) {
    let pet = await Pet.findOne(
        {
            where: { id: idPet },
            attributes: ['id', 'name', 'photoUrls', 'status'],
            include: [
                {
                    model: Tag,
                    as: "Tags",
                    attributes: ['id', 'name'],
                    through: { attributes: [] }
                },
                {
                    model: Category,
                    as: "Categories",
                    attributes: ['id', 'name'],
                    through: { attributes: [] }
                },
            ]
        })
    return pet
}


async function UpdatePetById(idPet, name, status) {
    try {
        let pet = await Pet.findOne({
            where: { id: idPet }
        })
        pet.name = name
        pet.status = status
        await pet.save()
    } catch (error) {
        return 400
    }

}

async function DeletePetById(idPet) {
    Pet.destroy({ where: { id: idPet } })
}

async function PushUlrsPetById(petId, urlPhoto) {
    Pet.update(
        { photoUrls: models.Sequelize.fn('array_append', models.Sequelize.col('photoUrls'), urlPhoto) },
        { where: { id: petId } }
    );
}


async function UpdateStatusPetById(petId, status) {
    try {
        let pet = await Pet.findOne({ where: { id: petId } })
        pet.status = status
        pet.save()
    } catch (error) {
        throw error
    }

}

async function CheckPetByIdAndStatus(petId, status) {
    try {
        let pet = await Pet.findOne({ where: { id: petId } })
        if (pet.status == status)
            return true
        else
            return false
    } catch (error) {
        return false
    }

}

async function checkDuplicatePetById(petId1, petId2) {
    // let pet1 =await Pet.findOne({where:{id:petId1}})
    // let pet2 =await Pet.findOne({where:{id:petId2}})
    // if(pet1.)
}




module.exports = {
    createPet,
    findAllByStatus,
    findAllByTagName,
    findOneByIdPet,
    UpdatePetById,
    DeletePetById,
    PushUlrsPetById,
    UpdateStatusPetById,
    CheckPetByIdAndStatus
}