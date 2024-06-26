const express = require('express');
const { getStudentById , getStudents , addStudents} = require('../controllers/Student.js');
const StudentRouter = express.Router();

StudentRouter.get('/', getStudents);
StudentRouter.post('/', addStudents);
StudentRouter.get('/:id', getStudentById);

module.exports = StudentRouter;