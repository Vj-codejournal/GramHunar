const Student = require( '../models/student.js');

//import Attendence from '../models/attendence.js';

exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find();

    res.status(200).json(students);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.addStudents = async (req, res) => {
  try {
    const StudentData = req.body;

   // for (let i = 0; i < StudentData.length; i++) {
      const newStudent = new Student(StudentData);
      await newStudent.save();
      console.log(newStudent);
   // }

    res.status(201).json({ message: 'Students added successfully' });
  } catch (error) {
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

