const express = require("express")
const { authController } = require("../controllers/auth.controller")
const router = express.Router()
// const authContoller = require("../controllers/auth.controller")
const Auth = require('../middleware/auth')

router.route('/register').post(authController.register)// Register user
// router.route('/registerMail').post() // send the email
router.route('/authenticate').post((req, res) => res.end()) // authenticate user
router.route('/login').post(authController.login) // login in app



router.route('/user/:username').get(authController.getUser) // user with username 
router.route('/generateOTP').get(authController.generateOTP) // generate random OTP 
router.route('/verifyOTP').get(authController.verifyOTP) // verify generate OTP
router.route('/createResetSession').get(authController.crateResetSession) // reset all the variable


router.route('/updateUser').put(Auth.Auth, authController.updateUser) // is to use update user profile
router.route('/resetPassworad').put(authController.resetPassword) // use to reset password


module.exports = router;