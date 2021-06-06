const { Order, Pet, User } = require('../models')

async function createOrder(req, res) {
    // check status pet available ? 
    try {
        let order = await Order.create({
            userId: req.user.id,
            petId: req.body.petId,
            quantity: req.body.quantity,
            shipDate: req.body.shipDate,
            status: "placed",
            complete: "false"
        })
        return order
    } catch (error) {
        res.status(400).json("stupid input")
        throw error
    }

}

async function findOrderById(idOrder) {
    return Order.findOne({ where: { id: idOrder } })
}

async function updateOrder(order, req) {
    order.userId = req.user.id,
        order.petId = req.body.petId,
        order.quantity = req.body.quantity,
        order.shipDate = req.body.shipDate,
        order.status = req.body.status, // just placed or approved
        order.complete = req.body.complete
    await order.save()
    return order
}


async function checkStatusOrderById(orderId) {
    let order = await Order.findOne({ where: { id: orderId } })
    if (order != null) {
        if (order.status == "placed")
            return "placed"
        else
            if (order.status == "approved")
                return "approved"
            else
                return "delivered"
    }
    else
        return null
}

async function findOrderById(idOrder) {
    let order = await Order.findOne({ where: { id: idOrder } })
    return order
}

async function checkPetInOrder(petId) {
    let check = await Order.findOne({ where: { petId: petId } })
    if (check == null)
        return false
    else
        return true
}
async function deleteOrderById(idOrder){
    let order =await Order.findOne({where:{id:idOrder}})
    await order.destroy()
}



module.exports = {
    createOrder,
    updateOrder,
    findOrderById,
    checkStatusOrderById,
    checkPetInOrder,
    deleteOrderById
}