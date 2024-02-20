const { Shipment } = require('../models')
const {BadRequestError, NotFoundError} = require('../errors/');

const lookup = async (payload) => {
    const {id} = payload
    const shipment = await Shipment.findOne({ where: { id: id } })
    if (!shipment) {
        throw new NotFoundError('Invalid shipment id');
    }
    return shipment  
}

const getAll = async (qParams) => {
    const shipment = await Shipment.findAndCountAll()
    return shipment
}


const createShipment = async (req, res) => {
    const { isDelivered } = req.body;
    const check = await Shipment.findOne({ where: { isDelivered: isDelivered } });
    if (check){
        throw new BadRequestError('status name has been used')
    } 

    const shipment = await Shipment.create({
        isDelivered
    });

    return shipment;

}

const update = async (shipmentId, payload) => {
    const result = await Shipment.update(payload, {
        where: {
            id: shipmentId,
        },
        individualHooks: true
    })
    return result
};

const destroy = async (id) => {
    const deleteShipment = await Shipment.destroy({
        where: {
            id: id
        }
    })
    return deleteShipment
}

module.exports = {
    getAll,
    createShipment,
    update,
    destroy,
    lookup
    // updateMenu,
    // deleteMenu
}