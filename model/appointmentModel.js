const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },

});

const appointment = mongoose.model("appointment", appointmentSchema);
module.exports = appointment;