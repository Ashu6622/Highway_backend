const jwt = require('jsonwebtoken')

const jwtAuth = (req, res, next)=>{

    try{

        const token = req.cookies.token;

        if(!token){
            req.status = 401;
            throw new Error('Token not found');
        }

        try{
            const verifyToken = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
            req.userId = verifyToken.id;
            next();
        }
        catch(error){
            throw new Error('Token is not valid');
        }

    }
    catch(error){
        next(error)
    }

}

const generateToken = (payload)=>{
    return jwt.sign(payload, process.env.JWT_SECRET_TOKEN, {expiresIn:600});
}

module.exports = {jwtAuth, generateToken}