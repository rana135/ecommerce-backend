const express = require('express')
const router = express.Router()
const productController = require('../controllers/product.controller')
const multer = require('multer');
const uploader = require('../middleware/uploader')


router.post('/file-upload', uploader.array("image"), productController.fileUpload)


router.route('/bulk-update').patch(productController.bulkUpdateProduct)
router.route('/bulk-delete').delete(productController.bulkUpdateProduct)



router.route('/:id')
    .get(productController.getProductById)
    .patch(productController.updateProduct)
    .delete(productController.deleteProduct)

    
router.route('/')
    .get(productController.getProducts)
    .post(productController.addProduct)


module.exports = router;
