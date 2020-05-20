const express = require('express');
const bodyParser = require('body-parser');

const promorouter = express.Router();

promorouter.use(bodyParser.json());

promorouter.route('/')
.all((req,res,next) => {
      res.statusCode = 200;
      res.setHeader('Content-type','text/plain');
      next();

})
.get((req , res, next) =>{
    res.end("Will send all the promotions to u");
})
.post((req,res,next) =>{
    res.end('Will add the promotion '+ req.body.name + ' with details ' + req.body.description);

})
.put((req,res,next) =>{
    res.statusCode = 403;    
    res.end('PUT operation no defined on /promotions');
})
.delete((req,res,next) =>{
    res.end("All the promotions are deleted");
});

promorouter.route('/:promoid')
.all((req,res,next) =>{
      res.statusCode = 200;
      res.setHeader('Content-type','text/plain');
      next();
})
.get((req , res, next) =>{
       res.end('will send the details of the promotion :' + req.params.promoid + ' to u');

})
.post((req , res, next) =>{
    res.statusCode = 403; 
    res.end("POST operation not defined on /promotions/"+req.params.promoid);

})
.put((req , res, next) =>{
    res.write('updating the promotion : ' + req.params.promoid  +" with ");
    res.end('name of  the promotion ' + req.body.name + ' and its details ' + req.body.description);
})
.delete((req,res,next) =>{
     res.end('deleting the promotion '+ req.params.promoid);
});
module.exports = promorouter;
