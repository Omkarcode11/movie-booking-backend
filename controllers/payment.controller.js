const Payment = require("../models/Payment");
const { paymentStatus } = require("../utils/constants");

exports.createPayment = async (req, res) => {
    try {
        let payment = await Payment.create(req.body);
        if (payment) {
            return res.status(200).send({ msg: "Payment created Successfully" });
        } else {
            return res.status(400).send({ msg: "Payment is not created" });
        }
    } catch (err) {
        return res.status(500).send({ msg: "Internal Error", err });
    }
};

exports.getPayment = async (req, res) => {
    try {
        let payment = await Payment.findById(req.params.Id);
        if (payment) {
            return res.status(200).send({ msg: payment });
        }
    } catch (err) {
        return res.status(500).send({ msg: "Internal Error", err });
    }
};
exports.getAllMyPayment = async (req, res) => {
    try {
        let myPayments = await Payment.find({ userId: req.body.userId });
        if (myPayments) {
            return res.status(200).send({ msg: myPayments });
        } else {
            return res.status(404).send({ msg: "Not found" });
        }
    } catch (err) {
        return res.status(500).send({ msg: "Internal Error", err });
    }
};

exports.deletePayment = async (req, res) => {
    try {
        let payment = await Payment.deleteOne({ _id: req.params.Id });
        if (payment) {
            return res.status(200).send({ msg: "Successful" });
        } else {
            return res.status(404).send("Not found");
        }
    } catch (err) {
        return res.status(500).send({ msg: "Internal Error", err });
    }
};
exports.completePayment = async (req, res) => {
    try {
        let body = req.body;

        let payment = await Payment.findById(req.params.Id);
        if (!payment) {
            return res.status(404).send({ msg: "Payment Not Found" });
        } else {
            if (payment.status == paymentStatus.pending) {
                payment.status = body.status;
                await payment.save();
                return res.status(200).send({ msg: "Payment is Successfully Completed" })
            } else {
                return res.status(400).send({ msg: `your payment status is ${payment.status} that's why we cannot complete` })
            }
        }
    } catch (err) {
        return res.status(500).send({ msg: "Internal Error", err });
    }
};
