const express = require('express');
const bodyParser = require('body-parser');
const Promotions = require('../models/promotions');

const promorouter = express.Router();

promorouter.use(bodyParser.json());
var authenticate = require('../authenticate');

promorouter.route('/')
.get((req,res,next) =>{
    Promotions.find({})
     .then((promotions) =>{
       res.statusCode = 200;
       res.setHeader('Content-Type','application/json');
       res.json(promotions);
     },(err)=> next(err))
     .catch( (err) =>next(err));
    
 
 })
 .post(authenticate.verifyUser,authenticate.verifyAdmin,  (req,res,next) =>{
  Promotions.create(req.body)
  .then((promotion) =>{
   console.log('promotion creaed ',promotion);
   res.statusCode = 200;
   res.setHeader('Content-Type','application/json');
   res.json(promotion);
  },(err)=> next(err))
  .catch( (err) =>next(err));
 
  
  })
 .put(authenticate.verifyUser,authenticate.verifyAdmin,  (req,res,next) =>{
   res.statusCode = 403;
 res.end('PUT operation not defined on /Promotions');
 })
 .delete(authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next) =>{
     Promotions.remove({})
     .then((resp) =>{
       res.statusCode = 200;
       res.setHeader('Content-Type','application/json');
       res.json(resp);
     },(err) => next(err))
     .catch((err) => next(err));
 });
 




promorouter.route('/:promoId')
.get((req,res,next) =>{
    Promotions.findById(req.params.promoId)
    .then((promotion) =>
    {
      res.statusCode = 200;
      res.setHeader('Content-Type','application/json');
      res.json(promotion);

    },(err) =>next(err))
    .catch((err) =>next(err));


})
.post(authenticate.verifyUser,authenticate.verifyAdmin,  (req,res,next) =>{
res.statusCode = 403;
res.end('POST operation not defined on /promotiones/'+ req.params.promotionId);

})
.put(authenticate.verifyUser,authenticate.verifyAdmin,  (req,res,next) =>{
Promotions.findByIdAndUpdate(req.params.promoId,{
  $set:req.body
},{
  new : true
})
.then((promotion) =>{
  res.statusCode = 200;
  res.setHeader('Content-type','application/json');
  res.json(promotion);
},(err)=>next(err))
.catch((err)=>next(err));
})
.delete(authenticate.verifyUser,authenticate.verifyAdmin,  (req,res,next) =>{
    Promotions.findByIdAndDelete(req.params.promoId)
    .then((promotion) =>{
      res.statusCode = 200;
      res.setHeader('Content-Type','application/json');
      res.json(promotion);
    },(err)=>next(err))
    .catch((err)=> next(err));

});

module.exports = promorouter;
