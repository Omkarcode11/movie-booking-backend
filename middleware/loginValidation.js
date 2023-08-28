const { isValidPassword } = require("../utils/isString")

exports.loginValidation = (req, res, next) => {
    let body = req.body
    //body will be {cred : 'email/phone' , password :'w3342sdf'}

    if (isNaN(body.cred)) {
        body.type = 'email'
    } else {
        body.type = 'phone'
    }

    if (!isValidPassword(body.password)) {
        return res.status(300).send("Password is incorrect")
    }

    next()
}