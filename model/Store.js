const mongoose = require('mongoose')
// const validator = require("validator")
const { ObjectId } = mongoose.Schema.Types


const storeSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a Store name"],
        maxLength: [30, "Name is too learge"],
        trim: true
    },
    description: {
        type: String,
        maxLength: [200, "Name is too learge"],
    },
    category: {
        type: String,
        required: [true, "Category is required"],
        enum: [
            "Art and Crafts",
            "Automotive",
            "Baby and Kids",
            "Beauty and Personal Care",
            "Books and Media",
            "Electronics",
            "Electronics Accessories",
            "Fashion and Apparel",
            "Garden and Outdoor",
            "Grocery and Food",
            "Health and Wellness",
            "Home and Furniture",
            "Home Improvement",
            "Hobbies and Collectibles",
            "Jewelry and Watches",
            "Office Supplies",
            "Pet Supplies",
            "Sports and Outdoors",
            "Toys and Games",
            "Travel and Luggage"
        ]
    },
    storeImg:{
      type:String,
      required: [true, "Image url is required"],
    },
    status: {
        type: String,
        enum: ["active", "in-active"],
        default: "active"
    },
    totalOrders: {
        type: Number
    },
    pendingOrders: {
        type: Number
    }
}, {
    tymestamps: true
})

const Store = mongoose.model('Store', storeSchema)

module.exports = Store;
