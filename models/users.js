const mongoose = require('mongoose');
// const validator = require("validator");

const User = new mongoose.Schema({
    name: { type: String, required: true },
    lname: { type: String, required: true },
    email: {
         type: String, 
         required: true, 
         unique: true,
         trim:true
        },
    pass: { type: String
        , required: true },
    quote: { type: String }
}

)


const model = mongoose.model('user-data', User);
module.exports = model