const reservationModel = require('../model/reservationModel');

const createReservation = async (req, res) => {
    console.log(req.body);
    const { userId, eventDate, numberOfGuests } = req.body;

    //user must fill all the fields to make reservation
    if (!userId || !eventDate || !numberOfGuests) {
        return res.json({
            "success": false,
            "message": "please fill up all the Fields.."
        })
    }
    try {
        //two users cannot make reservation for same day
        const existingReservation = await reservationModel.findOne({ eventDate: eventDate });
        if (existingReservation) {
            return res.json({
                "success": false,
                "message": "A reservation for this date already exists."
            })
        }
        //user should select future dates and positive number of guest. 
        if (new Date(eventDate) < new Date() || numberOfGuests < 0) {
            return res.json({
                "success": false,
                "message": "event date must be of future and number of guest should be in positive number"
            })
        }

        const newReservation = new reservationModel({
            userId: userId,
            eventDate: eventDate,
            numberOfGuests: numberOfGuests,
        })

        await newReservation.save()
        res.json({
            "success": true,
            "message": "Your event reservation is successfully booked"
        })
    } catch (error) {
        console.log(error)
        res.json({
            "success": false,
            "message": "Internal Server Error!"
        });

    }
}
module.exports = {
    createReservation
}