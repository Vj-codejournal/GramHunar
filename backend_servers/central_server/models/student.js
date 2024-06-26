const mongoose = require('mongoose');


const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    rollNumber: {
        type: Number,
        required: true,
        unique: true,
    },
    class: {
        type: String,
        required: true,
    },
    report: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Report',
    },
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;