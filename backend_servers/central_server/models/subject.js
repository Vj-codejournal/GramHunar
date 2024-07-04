const mongoose = require('mongoose');

const SubjectSchema = new mongoose.Schema({
    Student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true,
    },
    maths: {
        type: Number,
        required: true,
    },
    science: {
        type: Number,
        required: true,
    },
    social: {
        type: Number,
        required: true,
    },
    english: {
        type: Number,
        required: true,
    },
    hindi: {
      type: Number,
      required: true,
    },
    Date: {
        type: String,
        required: true,
    },
});

const Subject = mongoose.model('Subject', SubjectSchema);

module.exports = Subject;