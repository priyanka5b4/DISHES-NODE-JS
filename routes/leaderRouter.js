const express = require('express');
const bodyParser = require('body-parser');

const leaderrouter = express.Router();

leaderrouter.use(bodyParser.json());

leaderrouter.route('/')
.all((req,res,next) =>{
   res.statusCode = 200;
   res.setHeader('Contetnt-type','text/plain');
   next();
})
.get((req,res,next) =>{
      res.end("Will send all the leaders to u");
})
.post((req,res,next) =>{
     res.end("will create a leader "+ req.body.name + " with details " + req.body.description );
})
.put((req,res,next) =>{
    res.statusCode = 403; 
    res.end("PUT operation no defined on / leaders");
})
.delete((req,res,next) =>{
    res.end("Will delete all the leaders for u");
});


leaderrouter.route('/:leaderId')
.all((req,res,next) =>{
   res.statusCode = 200;
   res.setHeader('Contetnt-type','text/plain');
   next();
})
.get((req,res,next) =>{
      res.end("Will send the deatils of leader " + req.params.leaderId + " to u");
})
.post((req,res,next) =>{
    res.statusCode = 403; 
    res.end("POST operation no defined on / leaders");
})
.put((req,res,next) =>{
      res.write("Will update the leader " + req.params.leaderId + " with ")
      res.end(" name of the leader " + req.body.name + " and details " + req.body.description);
})
.delete((req,res,next) =>{
    res.end("Will delete  the leader " +req.params.leaderId + " for u");
});
module.exports = leaderrouter;

