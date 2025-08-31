const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        trim:true,
        required:true,
    },
    email:{
        type:String,
        trim:true,
        lowercase:true,
        unique:true
    },
    birthday:{
        type:String,
    }

},{
    timestamps:true
})

const User = mongoose.model('user', userSchema);

module.exports = User;