const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required : true },
    dob: { type: String, required : false },
    gender: { type: String, required : false },
    profileImage: { type: String, required : false },
    email : { type: String, required : true, unique:true , match: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/},
    password : { type: String, required : true }
});

module.exports = mongoose.model('User', userSchema);