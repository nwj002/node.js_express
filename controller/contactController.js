const contactModel = require('../model/contactModel');

const createContact = async (req, res) => {
    console.log(req.body);
    const { name, phone, email } = req.body;

    if (!name || !phone || !email) {
        return res.json({
            "success": false,
            "message": "please fill up all the Fields.."
        })
    }

    try {
        const existingContact = await contactModel.findOne({ phone: phone });

        if (existingContact) {
            return res.json({
                "status": false,
                "message": "contact number is already in use.."
            })
        }
        const newContact = new contactModel({
            name: name,
            phone: phone,
            email: email,
        })
        await newContact.save();

        res.json({
            "success": true,
            "message": "Contact card is created successfully"
        })
    } catch (error) {
        console.log(error)
        res.json({
            "success": false,
            "message": "internal server error"
        })
    }
}

module.exports = {
    createContact
}