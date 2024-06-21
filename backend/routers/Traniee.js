const {markEventDone  , getTraineeEvents} = require( "../controllers/Trainee.js");
const express = require ("express");

const TraineeRouter = express.Router();

TraineeRouter.get("/:traineeId/", getTraineeEvents);
TraineeRouter.put("/events/:eventId", markEventDone);

module.exports =  TraineeRouter;

