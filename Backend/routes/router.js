const express = require('express');
const router = express.Router(); 
router.use(express.json());
router.use(express.urlencoded({extended:true}));
const employeeModel = require('../model/employeeData');
const jwt= require('jsonwebtoken');


function verifyAdmin(req,res,next){
  let token=req.headers.token;
  try {
    if(!token) throw 'Unauthorised access';
    else{
        let payload=jwt.verify(token,'admin');
        if(!payload) throw 'Unauthorized access';
        next();                                 
    }
  } catch (error) {
    console.log(error);
  }
  
}

/***************************route******************/

router.get('/',verifyAdmin, async (req, res) => {
  try {
    const employeeData = await employeeModel.find();
    res.send(employeeData)
  } catch (error) {
    res.status(404).send('data not found');
  }
});

router.post('/addEmployee',verifyAdmin,async (req,res)=>{ 
                  // console.log(req.body);
              try{
                const item = req.body;
                const employeedata = new employeeModel(item);
                await employeedata.save();
                res.status(200).send({message:'Added'});
              } catch (error) {
                res.status(404).send({message:'add UNSuccessful'});
              }
    
});

/******edit*******/
router.get('/find/:id',verifyAdmin,async (req,res)=>{ 
  try{
  const employee = await employeeModel.findById(req.params.id);
  console.log(employee)
  res.status(200).send({message:'Found',employee});
  } catch (error){
    res.send({message:'Employee not found'});
  }
});

router.put('/edit/:id',verifyAdmin, async (req,res)=>{
    try{
      const employeedata = await employeeModel.findByIdAndUpdate(req.params.id, req.body);
      res.send({message:'updated'});
    } catch (error) {
      res.send('Employee not found');
    }
});


/**** delete employee ***/
router.delete('/delete/:id',verifyAdmin, async (req, res) => {
  try {
    const employeedata = await employeeModel.findByIdAndDelete(req.params.id);
    res.send({message:'Deleted'})
  } catch (error) {
    res.status(404).send({message:'Delete UNSuccessful'});
  }
});

module.exports = router;