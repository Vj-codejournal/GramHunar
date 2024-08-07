const express = require('express');
const cors = require('cors')
const app = express();
const morgan = require('morgan')
app.use(express.json());
app.use(cors()) ;
app.use(express.urlencoded({ extended: true })); 

const a_router = require('./routers/attendence')
const auth_router = require('./routers/auth')
const t_router = require('./routers/Trainee');
const s_router = require('./routers/Student');
const moment = require('moment');

app.use(morgan('dev'))
app.use('/auth' , auth_router) ;
app.use('/attendence', a_router);
app.use('/trainee', t_router);
app.use('/student', s_router);

const dotenv = require('dotenv') ; 
dotenv.config() ;

const db = require("./config/database");
db.connect();
console.log(db.connect())


  app.listen(7000, (req, res) => {
      console.log("server has been started at port: " + 7000  + ` created on : ${moment().format('YYYY-MM-DD')}`);
  });