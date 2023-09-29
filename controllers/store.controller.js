const { addStoreServices, getStoreService, getStoreServiceById, updateStoreService, deleteStoreService } = require("../services/store.service")


module.exports.addStore = async (req, res, next) => {
    console.log(req.body, "dataaaa")
    try {
        const result = await addStoreServices(req.body)

        res.status(200).json({
            status: "success",
            message: "Insert Store info successfully",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Store info couldn't insert successfully",
            error: error.message
        })
    }
}


module.exports.getStore = async (req, res) => {
    try {
        const result = await getStoreService(req.body)

        res.status(200).json({
            status: "success",
            message: "get store successfully",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't get store successfully",
            error: error.message
        })
    }
}

module.exports.getStoreById = async (req, res) => {
    const { id } = (req.params)
    console.log(id)
    try {
        const result = await getStoreServiceById(id)
        res.status(200).json({
            status: "Success",
            message: "Get store by id successfully",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't not get store by id",
            error: error.message
        })
    }
}

exports.updateStore = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await updateStoreService(id, req.body)
        res.status(200).json({
            status: "Success",
            message: "Store Update Successfully",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            message: "Store couldn't Update Successfully",
            error: error.message
        })
        console.log(error, 'error')
    }
}


exports.deleteStore = async (req, res) => {
    try {
        const { id } = req.params
        const result = await deleteStoreService(id)

        if (!result.deletedCount) {
            return res.status(400).json({
                status: "fail",
                error: "Could't delete the store"
            })
        }
        res.status(200).json({
            status: "Success",
            message: "Store Delete Successfully",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            message: "Store couldn't Delete Successfully",
            error: error.message
        })
        console.log(error, 'error')
    }
}