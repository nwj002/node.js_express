const router = require('express').Router();
const contactController = require('../controller/contactController')

router.post('/create', contactController.createContact);

module.exports = router;