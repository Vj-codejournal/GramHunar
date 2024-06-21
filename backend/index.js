const express = require('express');
const cors = require('cors')
const app = express();
 
app.use(express.json());
app.use(cors()) ;
app.use(express.urlencoded({ extended: true })); 

const a_router = require('./routers/attendence')
const t_router = require('./routers/Trainee');
const s_router = require('./routers/Student');
const moment = require('moment');


app.use('/attendence', a_router);
app.use('/event', t_router);
app.use('/student', s_router);

const dotenv = require('dotenv') ; 
dotenv.config() ;

const db = require("./config/database");
db.connect();



  app.listen(5000, (req, res) => {
      console.log("server has been started at port: " + 5000  + ` created on : ${moment().format('YYYY-MM-DD')}`);
  });