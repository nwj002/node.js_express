const appointmentModel = require('../model/appointmentModel');

const bookAppointment = async (req, res) => {
    console.log(req.body);
    const { date, time, } = req.body;

    if (!date || !time) {
        return res.json({
            'sucess': false,
            "message": "please fill up all the Fields.."
        })

    }

    if (time == '15:00') {
        return res.json({
            success: false,
            message: 'The slot is unavailable.',
        });
    }

    try {
        const existingAppointment = await appointmentModel.findOne({ date: date, time: time })

        if (existingAppointment) {
            return res.json({
                'status': false,
                'message': 'Booking Already Exist!'
            })
        }

        // Step 5.2 if user is new:
        const newappointment = new appointmentModel({
            date: date,
            time: time,
        })
        await newappointment.save()

        res.json({
            'sucess': true,
            'message': 'Booking Confirmed'
        })

    } catch (error) {
        console.log(error)
        res.json({
            'sucess': false,
            "message": 'Internal Server Error!'
        })

    }
}

module.exports = {
    bookAppointment
};