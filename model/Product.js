const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema.Types;


// Schema Design
const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name for this product"],
        trim: true,
        minLength: [3, "Name must be at list 3 characters"],
        maxLength: [100, "Name is too learge"]
    },
    price: {
        type: Number,
        required: true,
        min: [0, "Price can't be negative"],
        max: 1000000,
    },
    description: {
        type: String,
        required: true,
        // maxLength: [500, "Description is too learge"]
    },
    unit: {
        type: String,
        required: true,
        enum: {
            values: [
                'Kg',
                'Liters',
                'Pcs',
                'Bag',
                'Boxes',
                'Centimeters',
                'Dozens',
                'Gallons',
                'Grams',
                'Inches',
                'Meters',
                'Milliliters',
                'Ounces',
                'Pairs',
                'Pieces',
                'Sets',
            ],
            message: "unit value can't be {VALUE}, must be kg/liters/bg /pcs"
        }
    },
    imageUrls: {
        type: String,
        required: true,
        // validate: {
        //     validator: (values) => {
        //         if (!Array.isArray(values)) {
        //             return false;
        //         }
        //         let isValid = true;
        //         values.forEach(url => {
        //             if (!validator.isURL(url)) {
        //                 isValid = false;
        //             }
        //         })
        //         return isValid;
        //     },
        //     message: "Please provide a valid message"
        // }
    },
    category: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: [0, "Quantity can't be negative"],
        validate: {
            validator: (value) => {
                const isInteger = Number.isInteger(value)
                if (isInteger) {
                    return true
                } else {
                    return false
                }
            }
        },
        message: "Quantity must  be an integer"
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ["in-stock", "out-of-stock", "Discontinuted"],
            message: "User can't be {VALUE}"
        }
    },
    color: {
        type: String,
        required: true,
    },
    sellCount: {
        type: Number
    },
    size: {
        type: String,
    },
    storeRef: {
        type: String,
    },
    rating: {
        type: Number
    },
    review: {
        type: String
    },
    order: {
        type: Number
    },
    discount: {
        type: Number
    },
    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Store"
    },
    store: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Supplier"
    }
}, {
    timestamps: true
})

// mongoose middleware for saving data
productSchema.pre('save', function (next) {

    if (this.quantity == 0) {
        this.status = 'out-of-stock'
    }
    next()
})


// productSchema.post('save', function (doc, next) {
//     console.log('after saving data')
//     next()
// })


// Our build in instance method
// productSchema.methods = {
//     findUnitByKg: function () {
//         return Product.find({ unit: 'kg' })
//     }
// }




const Product = mongoose.model('Product', productSchema)

module.exports = Product;