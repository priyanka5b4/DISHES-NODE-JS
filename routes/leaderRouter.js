const express = require('express');
const bodyParser = require('body-parser');
const Leaders = require('../models/leaders');
const leaderrouter = express.Router();

leaderrouter.use(bodyParser.json());

leaderrouter.route('/')
.get((req,res,next) =>{
   Leaders.find({})
    .then((Leaders) =>{
      res.statusCode = 200;
      res.setHeader('Content-Type','application/json');
      res.json(Leaders);
    },(err)=> next(err))
    .catch( (err) =>next(err));
   

})
.post((req,res,next) =>{
 Leaders.create(req.body)
 .then((leader) =>{
  console.log('leader creaed ',leader);
  res.statusCode = 200;
  res.setHeader('Content-Type','application/json');
  res.json(leader);
 },(err)=> next(err))
 .catch( (err) =>next(err));

 
 })
.put((req,res,next) =>{
  res.statusCode = 403;
res.end('PUT operation not defined on /Leaders');
})
.delete((req,res,next) =>{
    Leaders.remove({})
    .then((resp) =>{
      res.statusCode = 200;
      res.setHeader('Content-Type','application/json');
      res.json(resp);
    },(err) => next(err))
    .catch((err) => next(err));
});


leaderrouter.route('/:leaderId')
.get((req,res,next) =>{
    Leaders.findById(req.params.leaderId)
    .then((leader) =>
    {
      res.statusCode = 200;
      res.setHeader('Content-Type','application/json');
      res.json(leader);

    },(err) =>next(err))
    .catch((err) =>next(err));


})
.post((req,res,next) =>{
res.statusCode = 403;
res.end('POST operation not defined on /leaderes/'+ req.params.leaderId);

})
.put((req,res,next) =>{
Leaders.findByIdAndUpdate(req.params.leaderId,{
  $set:req.body
},{
  new : true
})
.then((leader) =>{
  res.statusCode = 200;
  res.setHeader('Content-type','application/json');
  res.json(leader);
},(err)=>next(err))
.catch((err)=>next(err));
})
.delete((req,res,next) =>{
    Leaders.findByIdAndDelete(req.params.leaderId)
    .then((leader) =>{
      res.statusCode = 200;
      res.setHeader('Content-Type','application/json');
      res.json(leader);
    },(err)=>next(err))
    .catch((err)=> next(err));

});

module.exports = leaderrouter;

