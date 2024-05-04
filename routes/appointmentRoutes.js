const router = require('express').Router();
const appointmentControllers = require('../controller/appointmentController')

router.post('/book', appointmentControllers.bookAppointment)

module.exports = router;