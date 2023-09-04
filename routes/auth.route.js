const { createUser, login } = require("../controllers/auth.controller")
const { loginValidation } = require("../middleware/loginValidation")
const { userValidate } = require("../middleware/userValidation")

module.exports = function(app){
    app.post('/movies/v1/auth/create',[userValidate],createUser)
    app.post('/movies/v1/auth/login',[loginValidation],login)
}