const { GetAttendence,AddAttendence,GetAttendenceById  , addAttendance } = require( "../controllers/Attendence.js");
const express = require ("express");

const AttendenceRouter = express.Router();

AttendenceRouter.get("/", GetAttendence);
AttendenceRouter.post("/", AddAttendence);
AttendenceRouter.get("/:id", GetAttendenceById);
AttendenceRouter.post("/add", addAttendance);

module.exports = AttendenceRouter;
