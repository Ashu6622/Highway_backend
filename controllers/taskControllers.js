const Task = require('../models/taskSchema');


const addTask = async (req, res, next)=>{

    try{

        const {task} = req.body;

        if(!task || task === "" || task.length < 3){
            req.status = 400;
            throw new Error('Please enter valid task');
        }

        const userId = req.userId;

        const newTask = new Task({task, userId});
        await newTask.save();
        return res.status(201).json({message:'Task added successfully', id:newTask._id, status:200});

    }
    catch(error){
        next(error);
    }

}

const allTask = async (req, res, next)=>{

    try{

        const id = req.userId;
        // const data = await Task.find({userId:id}).populate('userId', 'name email');
        const data = await Task.find({userId:id});

        return res.status(200).json({data, status:200});

    }
    catch(error){
        next(error);
    }
}

const deleteTask = async(req, res, next)=>{
    try{

        const {id} = req.params;

        if(!id){
            throw new Error('Please enter valid id');
        }
        
        await Task.findByIdAndDelete(id);
        return res.json({message:"Task Deleted", status:200});

    }
    catch(error){
        next(error)
    }

}

module.exports = {addTask, deleteTask, allTask}