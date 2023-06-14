const mongoose = require('mongoose');
const {Schema} = mongoose;

const bookingSchema = new Schema({
    dentistId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Dentist',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    userEmail: {
        type: String,
        required: true,
    },
    dentistInfo: {
        type: String,
        required: true,
    },
    service: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
}, {timestamps: true});

const bookingModel = mongoose.model('bookings', bookingSchema);

module.exports = bookingModel;