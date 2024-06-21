//const Student = require( '../models/student.js');
const mongoose = require( 'mongoose');
const Attendence = require( '../models/attendence.js');

exports.AddAttendence = async (req, res) => {
    try {
      const { Student, Ratings, Attendance } = req.body;
      const currentDate = new Date().toISOString().split('T')[0];
  
      // Check if attendance has already been entered for the student today
      const existingAttendance = await Attendence.findOne({
        Student,
        Date: currentDate,
      });
  
      if (existingAttendance) {
        return res
          .status(409)
          .json({ message: 'Attendance already entered for today' });
      }
  
      // Create a new attendance record
      const newAttendance = new Attendence({
        Student: new mongoose.Types.ObjectId(Student),
        Ratings: {
          ListeningSkills: Ratings.ListeningSkills,
          AttentionSpan: Ratings.AttentionSpan,
          Curiosity: Ratings.Curiosity,
          ReflectingAbility: Ratings.ReflectingAbility,
        },
        Attendance,
        Date: currentDate, // Add date field to store the date of the attendance entry
      });
  
      await newAttendance.save();
  
      res.status(201).json(newAttendance);
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  };

exports.GetAttendence = async (req, res) => {
  try {
    
    const Attendences = await Attendence.find();
    
    res.status(200).json(Attendences);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.GetAttendenceById = async (req, res) => {
  try {
    const { id } = req.params;
    const Attendence = await Attendence.findById(id).populate('Student');

    res.status(200).json(Attendence);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};




exports.addAttendance = async (req, res) => {
  try {
    const { traniee } = req.body;

    // Find all attendance entries for the same trainee
    const traineeAttendance = await Attendence.find({ traniee });

    // Sum up the values for the same trainee
    let sumListeningSkills = 0;
    let sumAttentionSpan = 0;
    let sumCuriosity = 0;
    let sumReflectingAbility = 0;

    traineeAttendance.forEach(att => {
      sumListeningSkills += parseFloat(att.ListeningSkills) || 0;
      sumAttentionSpan += parseFloat(att.AttentionSpan) || 0;
      sumCuriosity += parseFloat(att.Curiosity) || 0;
      sumReflectingAbility += att.ReflectingAbility || 0;
    });
     const ok = (sumListeningSkills + sumAttentionSpan + sumCuriosity + sumReflectingAbility)/4
    // Return the sum values
    res.status(200).json({
      message: 'Attendance added successfully',
      results: {
         ok
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


