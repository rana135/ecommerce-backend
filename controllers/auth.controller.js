const UserModel = require('../model/auth')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const env = require('../.env')
const otpGenerator = require('otp-generator')

const register = async (req, res, next) => {

    // export async function register(req, res) {

    try {
        const { username, password, email, profile, } = req.body

        // Check  the existing user
        const existUsername = new Promise((resolve, reject) => {
            UserModel.findOne({ username }, function (err, user) {
                if (err) reject(new Error(err))
                if (user) reject({ error: "Please use unique username" })
                resolve()
            })
        })

        // Check for existing email
        const existEmail = new Promise((resolve, reject) => {
            UserModel.findOne({ email }, function (err, email) {
                if (err) reject(new Error(err))
                if (email) reject({ error: "Please use unique email" })
                resolve()
            })
        })


        Promise.all([existUsername, existEmail])
            .then(() => {
                if (password) {
                    bcrypt.hash(password, 10)
                        .then(hashedPassword => {

                            const user = new UserModel({
                                username,
                                password: hashedPassword,
                                profile: profile || '',
                                email,

                            })
                            // return save result as a response
                            user.save()
                                .then(result => res.status(201).send({ msg: "User register successfully" }))
                                .catch(error => res.status(500).send({ error }))
                        }).catch(error => {
                            return res.status(500).send({
                                error: "Enabled to hash password"
                            })
                        })
                }
            }).catch(error => {
                return res.status(500).send({ error })
            })


    } catch (error) {
        return res.status(500).send(error)
    }
}



const login = async (req, res, next) => {
    const { username, password } = req.body
    try {
        UserModel.findOne({ username })
            .then(user => {
                console.log("User found:", user);

                bcrypt.compare(password, user.password)
                    .then(passwordCheck => {

                        if (!passwordCheck) return res.status(400).send({ error: "Don't have password" })

                        // Create jwt token
                        const token = jwt.sign({
                            userId: user._id,
                            username: user.username
                        }, process.env.JWT_SECRET, { expiresIn: "24h" })
                        return res.status(200).send({
                            mgs: "Login successful...!",
                            username: user.username,
                            token
                        })

                    })
                    .catch(error => {
                        return res.status(404).send({ error: "Password doesn't match" })
                    })
            })
            .catch(error => {
                return res.status(404).send({ error: "Username not found" })
            })


    } catch (error) {
        return res.status(500).send(error)
    }
}


const getUser = async (req, res, next) => {

    const { username } = req.params;

    try {

        if (!username) return res.status(501).send({ error: "Invalid Username" });

        UserModel.findOne({ username }, function (err, user) {
            if (err) return res.status(500).send({ err });
            if (!user) return res.status(501).send({ error: "Couldn't Find the User" });

            /** remove password from user */
            // mongoose return unnecessary data with object so convert it into json
            const { password, ...rest } = Object.assign({}, user.toJSON());

            return res.status(201).send(rest);
        })

    } catch (error) {
        return res.status(404).send({ error: "Cannot Find User Data" });
    }

}


async function updateUser(req, res) {
    try {
        
        // const id = req.query.id;
        const { userId } = req.user;

        if(userId){
            const body = req.body;

            // update the data
            UserModel.updateOne({ _id : userId }, body, function(err, data){
                if(err) throw err;

                return res.status(201).send({ msg : "Record Updated...!"});
            })

        }else{
            return res.status(401).send({ error : "User Not Found...!"});
        }

    } catch (error) {
        return res.status(401).send({ error });
    }
}


async function generateOTP(req, res) {
    // req.app.locals.OTP = await otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false })
    // res.status(201).send({ code: req.app.locals.OTP })
}


async function verifyOTP(req, res) {

}


async function crateResetSession(req, res) {

}

async function resetPassword(req, res) {

}


module.exports.authController = {
    register,
    login,
    getUser,
    updateUser,
    generateOTP,
    verifyOTP,
    crateResetSession,
    resetPassword
};
