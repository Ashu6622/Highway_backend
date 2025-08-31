const errorHandler = (err,req,res,next)=>{
    return res.json({
        status: req.status || 500,
        message: err.message || "Internal Server Error"
    })
}

module.exports = errorHandler;