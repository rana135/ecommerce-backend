const Store = require('../model/Store')


module.exports.addStoreServices = async (data) => {
    const result = await Store.create(data)
    console.log(result,"dataa")
    return result;
}

module.exports.getStoreService = async (data) => {
    const result = await Store.find({})
    return result;
}

module.exports.getStoreServiceById = async (id) => {
    const result = await Store.findOne({ _id: id })
    console.log(result)
    return result;
}

module.exports.updateStoreService = async (storeId, data) => {
    console.log(data,"Update")
    const result = await Store.updateOne({ _id: storeId }, { $set: data }, { runValidators: true })

    // const product =await Product.findById(productId)
    // const result = await product.set(data).save()

    return result;
}

exports.deleteStoreService = async (id) => {
    const result = await Store.deleteOne({ _id: id })

    return result
}