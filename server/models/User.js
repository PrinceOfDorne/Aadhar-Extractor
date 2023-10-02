const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    name: String,
    gender: String,
    dob : String
})

const User = mongoose.model('aadhar-data', UserSchema)

module.exports = User