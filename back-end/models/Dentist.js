const mongoose = require('mongoose');
const {Schema} = mongoose;

const DentistSchema = new Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    dentist: {
        type: String,
        isRequired: true,
    },
    location: {
        type: String,
        isRequired: true,
    },
    photos: {
        type: [String],
        isRequired: true,
    },
    description: {
        type: String,
    },
    services: {
        type: [String],
        isRequired: true,
    },
    timings: {
        type: [String],
        isRequired: true,
    },
    fee: {
        type: Number,
        isRequired: true,
    }
});

const DentistModel = mongoose.model('Dentist', DentistSchema);

module.exports = DentistModel;