const mongoose = require( "mongoose");

const traineeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    emailId: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    events: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    }],
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    }]
});

const Trainee = mongoose.model("Trainee", traineeSchema);

module.exports = Trainee;