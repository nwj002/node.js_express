const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    userId: {
        type: Number,
        required: true,
    },
    eventDate: {
        type: Date,
        required: true,
    },
    numberOfGuests: {
        type: Number,
        required: true,
    },
});

const Reservation = mongoose.model("reservation", reservationSchema);
module.exports = Reservation;