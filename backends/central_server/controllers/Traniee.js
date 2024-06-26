const Trainee = require( '../models/traniee.js');
const Event = require( '../models/events.js');





exports.markEventDone = async (req, res) => {
    const { eventId } = req.params;
  
    try {
      const event = await Event.findById(eventId);
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
  
      // Assuming there's a "done" field to mark completion
      event.end = true;
      await event.save();
      res.status(200).json({ message: 'Event marked as done' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


exports.getTraineeEvents = async (req, res) => {
    const { traineeId } = req.params;
  
    try {
      const trainee = await Trainee.findById(traineeId).populate('events');
      if (!trainee) {
        return res.status(404).json({ message: 'Trainee not found' });
      }
      res.status(200).json(trainee.events);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  