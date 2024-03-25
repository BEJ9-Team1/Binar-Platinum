const { Payment } = require('../models')

const getAll = async(none)=>{
    const payment = await Payment.findAndCountAll()
    return payment
}

const lookup = async(params)=>{
    const payment = Payment.findOne({where:{name:params}})
    return payment
}

const getbyId = async(params)=>{
    const payment = Payment.findOne({where:{id:params}})
    return payment
}

const createPayment = async (payload) => {
    const { ...payment } = payload
    const createPayment = await Payment.create({
        ...payment
    });

    return createPayment;
}
const update = async (PaymentId, payload) => {
    const result = await Payment.update(payload, {
        where: {
            id: PaymentId,
        },
        individualHooks: true
    })
    return result
};

const destroy = async (PaymentId) => {
    const result = await Payment.destroy({
        where: {
            id: PaymentId,
        },
        individualHooks: true
    })
    return result
};
module.exports=
{
    lookup,
    getAll,
    createPayment,
    update,
    destroy,
    getbyId
}