const mongoose = require('mongoose');

const attendenceSchema = new mongoose.Schema({
    Student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true,
    },
    ListeningSkills: {
        type: Number,
        required: true,
    },
    AttentionSpan: {
        type: Number,
        required: true,
    },
    Curiosity: {
        type: Number,
        required: true,
    },
    ReflectingAbility: {
        type: Number,
        required: true,
    },
    Attendance: {
        type: String,
        enum: ['Yes', 'No'],
        default: 'No',
    },
    Date: {
        type: String,
        required: true,
    },
    traniee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Traniee',
        required: true,
    },
});

const Attendence = mongoose.model('Attendence', attendenceSchema);

module.exports = Attendence;