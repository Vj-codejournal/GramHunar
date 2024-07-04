const express = require('express');
const { getStudentById , getStudents , addStudents} = require('../controllers/Student.js');
const StudentRouter = express.Router();

StudentRouter.get('/trainee/:id', getStudents);
StudentRouter.post('/add/:id', addStudents);
StudentRouter.get('/:id', getStudentById);

module.exports = StudentRouter;