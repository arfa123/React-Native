var router = require('express').Router();
var authController = require('../controllers/authController');
var patientController = require('../controllers/patientController');

function protected(req,res,next){
    res.send("pagal");
}
router.route('/').get(protected);

router.route('/signup').post(authController.signup);
router.route('/signin').post(authController.signin);

router.route('/addpatient').post(patientController.addPatient);
router.route('/getpatients').get(patientController.getPatients);
router.route('/deletepatient').post(patientController.deletePatient);

module.exports = router;