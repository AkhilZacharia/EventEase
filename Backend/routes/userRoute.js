const express = require('express');
const userRouter = express.Router(); 
userRouter.use(express.json());
userRouter.use(express.urlencoded({extended:true}));
const userModel = require('../model/userData');
const eventModel = require('../model/eventData');
const jwt= require('jsonwebtoken');

function verifyUser(req,res,next){
  let token=req.headers.token;
  try {
    if(!token) throw 'Unauthorised access';
    else{
        let payload=jwt.verify(token,'User');
        if(!payload) throw 'Unauthorized access';
        next();                                 
    }
  } catch (error) {
    console.log(error);
  }
  
}
/***************************route******************/

userRouter.get('/home/',verifyUser, async (req, res) => {
    //  console.log('userji');  
  try {
     const Data = await eventModel.find({approved:true});
    //  console.log(Data)
     res.send(Data)
  } catch (error) {
    res.status(404).send('data not found');
  }
});


module.exports = userRouter;