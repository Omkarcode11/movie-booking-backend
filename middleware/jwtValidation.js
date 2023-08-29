const Jwt = require('jsonwebtoken')
const { SECRET_KEY } = require('../config/server.config')

exports.jwtValidation = async (req, res, next) => {
    let token = req.headers[0]

    if (!token || token.length < 10) {
        return res.status(300).send('Token is invalid')
    }
    Jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).send("Your token is Wrong or Expire")
        } else {
            req.userId = decoded.id
            req.userType = decoded.userType
            next()
        }
    })
}
