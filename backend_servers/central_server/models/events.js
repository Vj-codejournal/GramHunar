const mongoose = require ( 'mongoose');

const eventSchema = new mongoose.Schema({
    text: String,
    start: String,
    end: String , 
    done : Boolean 
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
