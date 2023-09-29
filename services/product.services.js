const paginationHelpers = require('../helpers/paginationHelpers')
const Product = require('../model/Product')


exports.getProductService = async (filters, paginationOptions) => {


    const { searchTerm } = filters
    // const andConditons = [
    //   {
    //     $or: [
    //       {
    //         name: {
    //           $regex: searchTerm,
    //           $options: 'i',
    //         },
    //       },
    //       {
    //         year: {
    //           $regex: searchTerm,
    //           $options: 'i',
    //         },
    //       },
    //     ],
    //   },
    // ];
    const productsSearchAbleFields = ['name', 'category', 'brand'];
    const andConditions = [];

    // Add a default condition if andConditions is empty
    if (andConditions.length === 0) {
        andConditions.push({});
    }

    if (searchTerm) {
        andConditions.push({
            $or: productsSearchAbleFields.map(field => ({
                [field]: { $regex: searchTerm, $options: 'i' },
            })),
        });
    }

    // const { page = 1, limit = 10 } = paginationOptions
    // const skip = (page - 1) * limit

    const { page, limit, skip, sortBy, sortOrder } = paginationHelpers.calculatePagination(paginationOptions)

    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }

    const products = await Product.find({ $and: andConditions }).sort(sortConditions).skip(skip).limit(limit)
    console.log(products)
    const total = await Product.estimatedDocumentCount()
    return {
        meta: {
            page,
            limit,
            total
        },
        data: products
    };
}
// desc/asc


exports.addProductService = async (data) => {
    // const product = new Product(req.body)
    // if (product.quantity == 0) {
    //     product.status = 'out-of-stock'
    // }
    // const result = await product.save()

    const product = await Product.create(data)
    // const { _id: productId, brand } = product;

    // const res = await Brand.updateOne(
    //     { _id: brand.id },
    //     { $push: { products: productId } }
    // )
    // console.log(res.nModified)
    return product;
}


exports.updateProductService = async (productId, data) => {
    const result = await Product.updateOne({ _id: productId }, { $set: data }, { runValidators: true })

    // const product =await Product.findById(productId)
    // const result = await product.set(data).save()

    return result;
}

exports.bulkUpdateProductService = async (data) => {
    // console.log(data.ids, 'ids')
    // const result = await Product.updateMany({ _id: data.ids }, { $set: data.data }, { runValidators: true })

    const products = [];
    data.ids.forEach(product => {
        products.push(Product.updateOne({ _id: product.id }, { $set: product.data }))
    })
    const result = await Promise.all(products)

    console.log(result)
    return result;
}

module.exports.getProductServiceById = async (id) => {
    const result = await Product.findOne({ _id: id })
    // console.log(result)
    return result;
}

exports.deleteProductService = async (id) => {
    const result = await Product.deleteOne({ _id: id })

    return result
}

exports.bulkDeleteProductService = async (ids) => {
    console.log(data.ids, 'ids')
    const result = await Product.deleteMany({ ids })

    console.log(result)
    return result;
}
