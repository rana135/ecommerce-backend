// get ,post,getByIds
const express = require("express")
const router = express.Router()
const storeRoute = require("../controllers/store.controller")


router.route('/:id')
    .get(storeRoute.getStoreById)
    .patch(storeRoute.updateStore)
    .delete(storeRoute.deleteStore)



router.route('/')
    .get(storeRoute.getStore)
    .post(storeRoute.addStore)



module.exports = router;
