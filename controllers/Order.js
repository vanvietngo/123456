const Pet = require('../services/Pet')
const Order = require('../services/Order')


async function createOrder(req, res) {
    if (await Pet.CheckPetByIdAndStatus(req.body.petId, "available")) {
        await Order.createOrder(req, res)
        await Pet.UpdateStatusPetById(req.body.petId, "pending")
        return res.status(200).json("sucsess")
    }
    return res.status(400).json("Invalid input")
}

async function getOrder(req, res) {
    try {
        let order = await Order.findOrderById(req.params.orderId)
        console.log("oder = ", order)
        if (req.user.id == order.userId || req.user.role == "admin")
            return res.status(200).json(order)
        return res.status(400).json("Order not found")
    } catch (error) {
        return res.status(400).json("Invalid Input")
    }

}

async function updateOrder(req, res) {
    try {
        let order = await Order.findOrderById(req.params.orderId)
        let petNew = await Pet.findOneByIdPet(req.body.petId)
        let petOld = await Pet.findOneByIdPet(order.petId)
        // check true order  ; true user; true pet ; status order 
        if (order == null || order.userId != req.user.id || petNew == null || petOld == null || order.status == "delivered") {
            return res.status(400).json("Invalid Input or order is delivered")
        } else {
            // all data true
            // petNew = petOld
            if (petOld.id == petNew.id) {
                if (req.body.status == "place") {
                    await Order.updateOrder(order, req)
                    return res.status(200).json("sucsess")
                } else
                    if (req.body.status == "approved") {
                        await Pet.UpdateStatusPetById(req.body.petId, "sold") // new pet
                        await Order.updateOrder(order, req)
                        return res.status(200).json("sucsess")
                    }
                else {
                    return res.status(400).json("Invalid Input ")
                }
            }
            // pet new # pet old 
            else
                if (petOld.id != petNew.id && petNew.status == "available") {
                    await Pet.UpdateStatusPetById(order.petId, "available") // old pet
                    await Pet.UpdateStatusPetById(req.petId, "sold") // new pet
                    await Order.updateOrder(order, req)
                    return res.status(200).json("sucsess")
                }
                else {
                    return res.status(400).json("Invalid Input 2")
                }
        }

    } catch (error) {
        console.log(error)
        return res.status(400).json("Invalid Input 1")
    }
}

async function deleteOrder(req, res) {
    try {
            let order = await Order.findOrderById(req.params.orderId)
    // check order == null
    if (order == null) {
        return res.status(404).json("Order not found")
        // order not null
    } else// check true user
        if (order.userId == req.user.id) {
            // check status order 
            if (order.status == "placed") {
                await Pet.UpdateStatusPetById(order.petId, "available")
                await Order.deleteOrderById(req.params.orderId)
                return res.status(200).json("sucsess")
            }
            else {
                return res.status(200).json("Invalid ID supplied")
            }
        }
        else {
            return res.status(200).json("not permission delete order")
        }
    } catch (error) {
        return res.status(200).json("Invalid ID supplied")
    }

}
module.exports = {
    createOrder,
    getOrder,
    updateOrder,
    deleteOrder
}