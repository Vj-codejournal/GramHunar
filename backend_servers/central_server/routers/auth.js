const {signin , signup , signout , google} = require('../controllers/Auth')
const express = require ("express");

const AuthRouter = express.Router();

AuthRouter.post('/signin' , signin) ; 
AuthRouter.post('/signup' , signup) ;
AuthRouter.get('/signout' , signout) ; 
AuthRouter.post('/google' , google) ;  

module.exports =  AuthRouter;