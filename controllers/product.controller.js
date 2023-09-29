const pick = require('../middleware/pick');
const {
    getProductService,
    addProductService,
    updateProductService,
    bulkUpdateProductService,
    deleteProductService,
    bulkDeleteProductService,
    getProductServiceById
} = require('../services/product.services')

module.exports.getProducts = async (req, res, next) => {
    try {


        // const paginationOptions = {
        //     page: Number(req.query.page),
        //     limit: Number(req.query.limit),
        //     sortBy: req.query.sortBy,
        //     sortOrder: req.query.sortOrder
        // }

        const paginationOptions = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);

        const filters = pick(req.query, ['searchTerm',])

        console.log(paginationOptions)
        const products = await getProductService(filters, paginationOptions)
        res.status(200).json({
            status: "Success",
            message: "Product find Successfully",
            meta: products.meta,
            data: products.data
        })

    } catch (error) {
        res.status(400).json({
            status: "Fail",
            message: "Product couldn't found Successfully",
            error: error.message
        })
    }
}




module.exports.addProduct = async (req, res, next) => {
    try {
        const result = await addProductService(req.body)

        res.status(200).json({
            status: "Success",
            message: "Product insert Successfully",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            message: "Product couldn't insert Successfully",
            error: error.message
        })
        console.log(error, 'error')
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await updateProductService(id, req.body)
        res.status(200).json({
            status: "Success",
            message: "Product Update Successfully",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            message: "Data couldn't Update Successfully",
            error: error.message
        })
        console.log(error, 'error')
    }
}

exports.bulkUpdateProduct = async (req, res) => {
    try {
        const result = await bulkUpdateProductService(req.body)

        res.status(200).json({
            status: "Success",
            message: "Product Update Successfully",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            message: "Data couldn't Update Successfully",
            error: error.message
        })
        console.log(error, 'error')
    }
}

module.exports.getProductById = async (req, res) => {
    const { id } = (req.params)
    try {
        const result = await getProductServiceById(id)
        res.status(200).json({
            status: "Success",
            message: "Get Product by id successfully",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Faild to get product by id",
            error: error.message
        })
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params
        const result = await deleteProductService(id)

        if (!result.deletedCount) {
            return res.status(400).json({
                status: "fail",
                error: "Could't delete the product"
            })
        }
        res.status(200).json({
            status: "Success",
            message: "Product Delete Successfully",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            message: "Product couldn't Delete Successfully",
            error: error.message
        })
        console.log(error, 'error')
    }
}


exports.bulkDeleteProduct = async (req, res) => {
    try {
        const result = await bulkDeleteProductService(req.body.ids)
        // const result = await Product.deleteMany({ ids })

        res.status(200).json({
            status: "Success",
            message: "Successfully given the deleted products",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            message: "Couldn't delete the given products",
            error: error.message
        })
        console.log(error, 'error')
    }
}


exports.fileUpload = async (req, res) => {
    try {
        res.status(200).json(req.files)
    } catch (error) {

    }
}

