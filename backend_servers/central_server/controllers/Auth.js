const Trainee = require("../models/traniee");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req,res) => {
   const {name, emailId, password } = req.body;
   
   //hash password
   const hashedPassword = await bcryptjs.hashSync(password, 10);

   const newTrainee = new Trainee({
           name,emailId,password:hashedPassword
       });
       
   //send in dB async
   try{
       await newTrainee.save();
       res.status(201).json( newTrainee );
   }
   catch(error){//if same username again throw error
       consol.log(error); //automatic error
       //res.status(500).json(error.message);
       //next(errorHandler(300,"something went wrong"));//custom error
    }
};

exports.signin = async (req,res) => {
   const {emailId, password} = req.body;
   try{
      console.log(password)
      console.log(emailId) ;
       const validUser = await Trainee.findOne({emailId});
       console.log(validUser)
       if(!validUser){
           console.log("User not found");
       }
       const validPassword = bcryptjs.compareSync(password, validUser.password);
       if(!validPassword){
           console.log("Wrong Credintials");
       }
       const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET);//create a token
       const {password:hashedPassword, ...rest} = validUser._doc;//seperated password from it send rest part
       const expiryDate = new Date(Date.now() + 3600000);
       res.cookie("access_token", token, {httpOnly: true, expires: expiryDate}).status(200).json(rest); //send token in cookie//user used in client side to fill data
       //have to remove password from it
       
   }
   catch(error){
      res.status(500)
     console.log(error)
    }
}

exports.signout = async(req,res) => {
   res.clearCookie("access_token").status(200).json("Signout successfully");
}


exports.google = async(req,res) => {
   try{
       const traniee = await Trainee.findOne({emailId: req.body.emailId});
       
       if(traniee){//if user already exist
           //create token
           const token = jwt.sign({id: traniee._id}, process.env.JWT_SECRET);

           const {password:hashedPassword, ...rest} = traniee._doc;//seperated password from it send rest part
           const expiryDate = new Date(Date.now() + 3600000);
           res.cookie("access_token", token, {httpOnly: true, expires: expiryDate}).status(200).json(rest);
       }

       //if new user google give no password so we have to create it
       //and also photo link
       else{
           const generatedPassword = Math.random().toString(36).slice(-8);//36 is 0-9 and a-z //keeo last 8 digits
           const hashedPassword = await bcryptjs.hashSync(generatedPassword, 10);
           //have to create a unique username too
           const newTraniee = new Trainee({
               name: req.body.name ,
               emailId: req.body.emailId,
               password: hashedPassword,
               
           });
           await newTraniee.save();
           const token = jwt.sign({id: newTraniee._id}, process.env.JWT_SECRET);
           const {password:hashedPassword2, ...rest} = newTraniee._doc;//seperated password from it send rest part
           const expiryDate = new Date(Date.now() + 3600000);
           res.cookie("access_token", token, {httpOnly: true, expires: expiryDate}).status(200).json(rest);
       }
   }
   catch(error){
       console.log(error)
      
    }
}