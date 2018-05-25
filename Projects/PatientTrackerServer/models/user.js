const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var validateEmail = (email) => {
    return (/\S+@\S+\.\S+/).test(email)
}

var userSchema = new Schema({
    name:{
        type: String
    },
    email:{
        type: String,
        unique: true,
        required: 'Email address is required',
        validate:[validateEmail, 'Please enter a valid email']
    },
    password:{
        type: String
    },
    patients: [
        {
        patientName:{
            type: String
        },
        age:{
            type: String
        },
        arrivalDate:{
            type: String
        },
        disease:{
            type: String
        },
        medication:{
            type: String
        },
        appointmentDate:{
            type: String
        },
        appointmentTime:{
            type: String
        },
        contactNo:{
            type: String
        }
    }
    ]
})

var User = mongoose.model('user', userSchema);

module.exports = User;