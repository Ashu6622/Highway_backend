const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({

    task:{
        type: String,
        required:true,
        trim:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }

},{
    timestamps:true
})

const Task = mongoose.model('task', taskSchema);

module.exports = Task;