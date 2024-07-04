const Student = require( '../models/student.js');
const Trainee = require('../models/traniee.js') ; 
const Report = require('../models/reports.js')
const Subject = require('../models/subject.js')
//import Attendence from '../models/attendence.js';

exports.getStudents = async (req, res) => {
  try {
    const { id } = req.params;
    const trainee = await Trainee.findById(id).populate('students');

    if (!trainee) {
      return res.status(404).json({ message: 'Trainee not found' });
    }

    res.status(200).json(trainee.students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.addStudents = async (req, res) => {
  try {
    const StudentData = req.body;
    const {id} = req.params ;  
    const trainee = await Trainee.findById(id) ; 
   // for (let i = 0; i < StudentData.length; i++) {
      const newStudent = new Student(StudentData);
      await newStudent.save();
      trainee.students.push(newStudent._id);
      await trainee.save();
      console.log(newStudent);
   // }

    res.status(201).json({ message: 'Students added successfully' });
  } catch (error) {
    console.log(error)
    res.status(409).json({ message: error.message });
  }
};

exports.getStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findById(id);
    res.status(200).json(student);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

