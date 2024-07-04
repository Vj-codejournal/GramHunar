const {markEventDone  , getTraineeEvents , getTraineeById , add_event} = require( "../controllers/Trainee.js");
const express = require ("express");

const TraineeRouter = express.Router();

TraineeRouter.get("/:traineeId/", getTraineeEvents);
TraineeRouter.get("/events/:eventId/:state", markEventDone);
TraineeRouter.get("/get_trainee_info/:id" , getTraineeById)
TraineeRouter.post("/add_event/:id" , add_event)

module.exports =  TraineeRouter;

