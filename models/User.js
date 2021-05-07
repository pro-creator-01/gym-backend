const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
    firstName: { type: String, trim: true, required: true },
    lastName: { type: String, trim: true, required: true },
    email: String,
    phone: {type: Number, trim: true, required: true},
    paymentPlan: {type: Number, trim: true, required: true},
    paymentPending: Number,
    startDate: Date,
    startDay: String,
    paymentCycle: Number,
    // Choose between 1 month, 3 months, 6 months, 12 months payment cycle for each user.
    // Calculate next Payment Date based on that. 
    nextPaymentDate: Date,
    lastPaymentDate: Date,
})

module.exports = mongoose.model('User', schema)