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
                    index = y;
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