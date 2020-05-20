const express = require('express');
const bodyParser = require('body-parser');

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());



dishRouter.route('/')
.all((req,res,next) =>{
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    next();

})
.get((req,res,next) =>{
      
      res.end("We will send all the dishes to u");

})
.post((req,res,next) =>{
    res.end('will create dish ' + req.body.name + " with details " + req.body.description);
   
   })
.put((req,res,next) =>{
    res.statusCode = 403;
  res.end('PUT operation not defined on /dishes');
})
.delete((req,res,next) =>{
  res.end('all the dishes are deleted');

});


dishRouter.route('/:dishId')
.all((req,res,next) =>{
  res.statusCode = 200;
  res.setHeader('Content-Type','text/plain');
  next();

})
.get((req,res,next) =>{
  res.end("We will send  the details of dish " + req.params.dishId + " to you!");

})
.post((req,res,next) =>{
  res.statusCode = 403;
  res.end('POST operation not defined on /dishes/'+ req.params.dishId);
 
 })
.put((req,res,next) =>{
   res.write('updating the dish : ' + req.params.dishId  +" with ");
  res.end('name of  the dish ' + req.body.name + ' and its details ' + req.body.description);
})
.delete((req,res,next) =>{
res.end('dish with name '+ req.params.dishId + " is deleted");

});

module.exports = dishRouter;