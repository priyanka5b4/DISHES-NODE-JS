var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var JWTStratergy = require('passport-jwt').Strategy;
var ExtractJWT = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken'); // used  to create , sign and verify tokens
var config = require('./config');

var User = require('./models/user');
const { PayloadTooLarge, NotExtended } = require('http-errors');



passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



exports.getToken = function(user){

    return jwt.sign(user,config.secretKey,{expiresIn:3600});
}
// options that are created for token
var opts = {};
opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

// configuring the jwt based strategy
exports.jwtPassport = passport.use(new JWTStratergy(opts,(jwt_payload,done) =>{

    console.log("JWT:Payload",jwt_payload);
    User.findOne({_id:jwt_payload._id},(err,user) =>{
                 if(err){
                     return done(err,false);
                 }
                 else if(user){
                     return done(null,user);
                 }
                 else {
                     return done(null,false);
                 }


    });

}));

exports.verifyUser = passport.authenticate('jwt',{session:false});

exports.verifyAdmin = (req, res, next)=>{
           if(req.user.admin == false){
           
                  var err = new Error("You are not authorized to perform this operation!");
                  err.status = 403;
                  return next(err);
           }
           else next();
                    }


