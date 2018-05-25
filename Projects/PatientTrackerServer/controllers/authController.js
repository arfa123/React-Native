const User = require('../models/user');

exports.signin = function(req,res,next){
    var email = req.body.email;
    var password = req.body.password;
    console.log('req',req.body);
    if(!email || !password){
        return res.status(422).json({error: "You must provide email and password"});
    }
    User.findOne({email: email}, function(err, existingUser){
        if(err){
            return next(err);
        }
        if(existingUser){
            if(password === existingUser.password){
                return res.json(existingUser);
            }
        }
        return res.status(422).json({error: "Email is not registered, You need to signup"})
    })
}

exports.signup = function(req,res,next){
    var name = req.body.name
    var email = req.body.email;
    var password = req.body.password;
    console.log('req',req.body);
    if(!email || !password || !name){
        return res.status(422).json({error: "You must provide email and password"});
    }
    User.findOne({email: email}, function(err, existingUser){
        if(err){
            return next(err);
        }
        if(existingUser){
            return res.status(422).json({error: "Email already taken"})
        }
        var user = new User({
            name: name,
            email: email,
            password: password
        });
        user.save(function(err){
            if(err){
                return next(err);
            }
            res.json(user);
        })
    })
}