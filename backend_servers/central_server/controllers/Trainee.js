const Trainee = require( '../models/traniee.js');
const Event = require( '../models/events.js');





exports.markEventDone = async (req, res) => {
    const { eventId  , state} = req.params;
    try {
      const event = await Event.findById(eventId);
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
      // Assuming there's a "done" field to mark completion
      if(state=="false"){ event.done = true;}
      if(state=="true"){ event.done = false;}
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
      console.log(trainee.events)
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

// controller for getting trainnee information though id 

exports.getTraineeById = async (req, res) => {
  const {id} = req.params ; 
  try {
      const user = await Trainee.findById(id) ; 
      if(!user) {
        return res.status(404).json({ message: 'Trainee not found' });
      }
      console.log(user) ; 
      res.status(200).json(user)
  } catch(error){
    res.status(500).json({ message: error.message });
  }
}

exports.add_event = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Trainee.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'Trainee not found' });
    }
    const newEvent = new Event(req.body);
    await newEvent.save();
    user.events.push(newEvent._id);
    await user.save(); 
    res.status(200).json({message:"hi"});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


