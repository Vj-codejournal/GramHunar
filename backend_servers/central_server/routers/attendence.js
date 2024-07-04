const { GetAttendence,AddAttendence,GetAttendenceById ,getDayWiseStudentCount  , getStudentAttendanceSummary ,get_recent_marks , add_marks,  get_prev_7_attendence} = require( "../controllers/Attendence.js");
const express = require ("express");

const AttendenceRouter = express.Router();

AttendenceRouter.get("/", GetAttendence);
AttendenceRouter.post("/", AddAttendence);
AttendenceRouter.get("/:id", GetAttendenceById);
AttendenceRouter.get("/7/:id" , get_prev_7_attendence)
AttendenceRouter.get("/sum/:id" , getStudentAttendanceSummary)
AttendenceRouter.post("/subject/:id" ,add_marks ) ;
AttendenceRouter.get("/recent/:id" , get_recent_marks)
AttendenceRouter.get("/day/:id" , getDayWiseStudentCount)

module.exports = AttendenceRouter;
