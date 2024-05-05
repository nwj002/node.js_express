const express = require('express');
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
        const { date, time } = req.body;
        if (!date || !time || !isValidDateFormat(date) || !isValidTimeFormat(time)) {
            return res.json({
                "success": false,
                "message": "Invalid date or time format."
            });
        }
        const existingAppointment = await appointmentModel.findOne({ date: date, time: time })

        if (existingAppointment) {
            return res.json({
                'status': false,
                'message': 'Booking Date and Time Already Exist!'
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

// Function to validate date format 'YYYY-MM-DD'
const isValidDateFormat = (dateString) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(dateString);
};

// Function to validate time format 'HH:mm'
const isValidTimeFormat = (timeString) => {
    const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    return regex.test(timeString);
};

module.exports = {
    bookAppointment
};