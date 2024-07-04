const Student = require( '../models/student.js');
const mongoose = require( 'mongoose');
const Attendence = require( '../models/attendence.js');
const Trainee = require('../models/traniee.js');
const Subject = require('../models/subject.js');
exports.AddAttendence = async (req, res) => {
    try {
      const { Student_id, Ratings, Attendance  ,traineeID} = req.body;
      const currentDate = new Date().toISOString().split('T')[0];
     
      // Check if attendance has already been entered for the student today
      const existingAttendance = await Attendence.findOne({
        Student : Student_id,
        Date: currentDate,
      });
  
      if (existingAttendance) {
        return res
          .status(409)
          .json({ message: 'Attendance already entered for today' });
      }
  
      const student = await Student.findById(Student_id) ; 

      const trainee = await Trainee.findById(traineeID) ;
      const sumed = 2*(Ratings.ListeningSkills+Ratings.AttentionSpan+Ratings.Curiosity+Ratings.ReflectingAbility ); 
      let g  = 'C'
      if(sumed<11) {g = 'C' ;}
      else if(sumed<31) {g = 'B' ; }
      else         {g = 'A' ; }
      // Create a new attendance record
      const newAttendance = new Attendence({
        Student: new mongoose.Types.ObjectId(Student_id),
        ListeningSkills: Ratings.ListeningSkills,
        AttentionSpan: Ratings.AttentionSpan,
        Curiosity: Ratings.Curiosity,
        ReflectingAbility: Ratings.ReflectingAbility,
        Attendance,
        grade : g,
        Date: currentDate, 
        trainee : new mongoose.Types.ObjectId(traineeID)
      });

      await newAttendance.save();
      
      if(sumed<11) {student.grade = 'C' ;}
      if(sumed<31) {student.grade = 'B' ; }
      else         {student.grade = 'A' ; }
      await newAttendance.save()
      await student.save()

      console.log(student) ;
      res.status(201).json(newAttendance);
    } catch (error) {
      console.log(error) ;
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



exports.get_prev_7_attendence = async (req, res) => {
  try {
    const { id } = req.params; // Get student ID from request parameters

    // Find the student by ID to ensure the student exists
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Calculate the date 7 days ago
    const date7DaysAgo = new Date();
    date7DaysAgo.setDate(date7DaysAgo.getDate() - 7);

    // Find attendance records for the student for the previous 7 days
    const attendenceRecords = await Attendence.find({
      Student: new mongoose.Types.ObjectId(id),
      Date: { $gte: date7DaysAgo.toISOString().split('T')[0] } // Assuming Date is in 'YYYY-MM-DD' format
    })
    .sort({ Date: -1 }) // Sort by date in descending order
    .limit(7); // Limit to the last 7 records

    // If fewer than 7 records are found, return all found records
    if (attendenceRecords.length < 7) {
      const allRecords = await Attendence.find({ Student: new mongoose.Types.ObjectId(id) })
      .sort({ Date: -1 });

      return res.status(200).json(allRecords);
    }

    return res.status(200).json(attendenceRecords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getStudentAttendanceSummary = async (req, res) => {
  try {
    const { id } = req.params; // Get student ID from request parameters
    console.log(id) ;
    // Find the student by ID to ensure the student exists
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Find all attendance records for the student
    const attendenceRecords = await Attendence.find({ Student: new mongoose.Types.ObjectId(id) })
      .sort({ Date: 1 }); // Sort by date in ascending order
    console.log(attendenceRecords)
    // If no attendance records found
    if (attendenceRecords.length === 0) {
      return res.status(404).json({ message: 'No attendance records found for this student' });
    }

    // Calculate the total attendance
    const totalAttendance = attendenceRecords.length;

    // Calculate the difference between today's date and the earliest attendance date
    const earliestDate = new Date(attendenceRecords[0].Date);
    const today = new Date();
    const timeDifference = today - earliestDate;
    const totalDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)); // Convert milliseconds to days

    return res.status(200).json({
      totalAttendance,
      totalDays
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.add_marks = async (req, res) => {
  try {
    const { id } = req.params;
    const newsubject = new Subject({
    Student: new mongoose.Types.ObjectId(id),
    maths: req.body.maths,
    science:req.body.science,
    social: req.body.socialScience,
    english: req.body.english,
    hindi: req.body.hindi,
    Date: req.body.dot
    })

    await newsubject.save() ; 

    res.status(200).json({ message: 'Marks added successfully' , data : newsubject });

    
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.get_recent_marks = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the most recent subject entry for the student
    const recentSubject = await Subject.findOne({ Student: id })
      .sort({ Date: -1 })  // Sort by Date in descending order to get the most recent
      .exec();

    if (!recentSubject) {
      return res.status(404).json({ message: 'No marks found for the student' });
    }

    res.status(200).json({ data: recentSubject });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getDayWiseStudentCount = async (req, res) => {
  const { id } = req.params;

  try {
      // Get the current date
      const currentDate = new Date();

      // Array to store results
      const result = [];

      // Loop to fetch data for last 10 days
      for (let i = 0; i < 10; i++) {
          // Calculate date for each iteration, going back one day at a time
          const date = new Date(currentDate);
          date.setDate(currentDate.getDate() - i);

          // Get the formatted date string (assuming "Date" in the schema is stored as String)
          const formattedDate = formatDate(date);

          // Query to find attendance records for the given traineeId and formatted date
          const attendance = await Attendence.find({ trainee: id, Date: formattedDate });
          console.log(attendance)
          // Calculate counts for each grade
          const count = {
              "a": attendance.filter(att => att.grade === 'A').length,
              "b": attendance.filter(att => att.grade === 'B').length,
              "c": attendance.filter(att => att.grade === 'C').length,
          };

          // Push the count object to the result array
          result.push(count);
      }

      // Send response
      res.json({ data: result });
  } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
  }
};

// Helper function to format date as per schema Date format
const formatDate = (date) => {
  // Format the date as needed, assuming your schema Date field is stored as String
  return date.toISOString().split('T')[0]; // This will return date in "YYYY-MM-DD" format
};
