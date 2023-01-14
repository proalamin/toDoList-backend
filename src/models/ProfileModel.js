const mongoose = require('mongoose');

const DataSchema = mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    EmailAddress: { type: String },
    MobileNumber: { type: String},
    City: { type: String },
    userName: { type: String , unique:true},
    password: { type: String },

}, { versionKey: false });


const ProfileModel = mongoose.model('profiles', DataSchema);

module.exports = ProfileModel;