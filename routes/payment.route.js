const { createPayment, getAllMyPayment, deletePayment, completePayment, updatePayment, findPaymentById, checkPaymentStatus } = require("../controllers/payment.controller")

module.exports = function (app) {
    app.post('/movies/v1/payment/createPayment', createPayment)
    app.get("/movies/v1/payment/getAllMyPayment", getAllMyPayment)
    app.delete("/movies/v1/payment/deletePaymentById/:Id", deletePayment)
    app.put('/movies/v1/payment/completePayment/:Id', completePayment)
    app.put('/movies/v1/payment/updatePayment/:Id', updatePayment)
    app.get('/movies/v1/payment/getPaymentById/:Id', findPaymentById)
    app.get("/movies/v1/payment/checkPaymentStatus/:Id", checkPaymentStatus)
}