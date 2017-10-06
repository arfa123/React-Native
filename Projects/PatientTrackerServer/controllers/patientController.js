const User = require('../models/user');

exports.addPatient = function(req,res,next){
    var id = req.body.userID;
    var patient = {
        patientName: req.body.patientName,
        age: req.body.age,
        arrivalDate: req.body.arrivalDate,
        disease: req.body.disease,
        medication: req.body.medication,
        appointmentDate: req.body.appointmentDate,
        appointmentTime: req.body.appointmentTime,
        contactNo: req.body.contactNo
    };
    User.findById(id, function(err,user){
        if(err){
            console.log('err:',err);
            return next(err);
        }
        if(user){
            user.patients.push(patient);
            user.save(function(err,patients){
                if(err){
                    console.log('err:',err);
                    return next(err)
                }
                if(patients){
                    console.log('res:',patients);
                    return res.json(patients)
                }
            })
        }
    })
}

exports.savePatient = function(req,res,next){
    var id = req.body.userID;
    var index = undefined;
    var patient = {
        patientName: req.body.patientName,
        age: req.body.age,
        arrivalDate: req.body.arrivalDate,
        disease: req.body.disease,
        medication: req.body.medication,
        appointmentDate: req.body.appointmentDate,
        appointmentTime: req.body.appointmentTime,
        contactNo: req.body.contactNo,
        _id: req.body._id
    };
    User.findById(id, function(err, user){
        if(err){
            console.log('err:',err);
            return next(err);
        }
        if(user){
            var patients = user.patients;
            patients.map((x,y) => {
                if(x._id == patient._id){
                    return index = y;
                }
            });
            patients.splice(index, 1, patient);
            console.log("patients:",patients);
            user.patients = patients;
            user.save(function(err,response){
                if(err){
                    console.log("err:",err);
                    return next(err);
                }
                if(response){
                    return res.json(response.patients);
                }
            })
        }
    })
}

exports.getPatients = function(req,res,next){
    var id = req.query.userID;
    console.log('id:',req.query.userID)
    User.findById(id, function(err,user){
        if(err){
            console.log('err:',err);
            return next(err);
        }
        if(user){
            console.log(user.patients);
            return res.json(user.patients)
        }
    })
}

exports.getPatient = function(req,res,next){
    var id = req.query.userID;
    var patientID = req.query.patientID;
    User.findById(id, function(err, user){
        if(err){
            console.log('err:',err);
            return next(err);
        }
        if(user){
            var patients = user.patients;
            patients.map((x,y) => {
                if(x._id == patientID){
                    console.log('patient:',x);
                    return res.json(x);
                }
            })
        }
    })
}

exports.deletePatient = function(req,res,next){
    var id = req.body.userID;
    var patientID = req.body.patientID;
    var index = undefined;
    User.findById(id,function(err,user){
        if(err){
            console.log('err:',err);
            return next(err);
        }
        if(user){
            var patients = user.patients;
            patients.map((x,y) => {
                if(x._id == patientID){
                    return index = y;
                }
            });
            patients.splice(index,1);
            user.patients = patients;
            user.save(function(err,response){
                if(err){
                    console.log("err:",err);
                    return next(err);
                }
                if(response){
                    return res.json(response.patients);
                }
            })
        }
    })
}