const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");
const User = require('../models/userSchema');
const {generateToken} = require('../middleware/jwt');


// Setup transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  secure:"true",
  host:"smtp.gmail.com",
  auth: {
    user: "rashu2879@gmail.com",
    pass: "gzltidtialvzxaee",
  },
});

let otpStore = {};

// function generateOTP() {
//   return otpGenerator.generate(6, {
//     digits: true,    
//     upperCase: false,   
//     specialChars: false,
//     alphabets: false,  
//   });
// }

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Send OTP
async function sendOTP(email, otp) {
    
  await transporter.sendMail({
    from: 'rashu2879@gmail.com',
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
  });
}


const userOTP = async (req, res, next)=>{


    try{
        const {email} = req.body;
      
        if(!email){
            req.status = 400;
            throw new Error("Email fields is required");
        }

        // generate the token and check the token
        const otp = generateOTP();
        otpStore[email] = { otp, expiresAt: Date.now() + 5 * 60 * 1000 };
        // console.log(otp);
        await sendOTP(email, otp);
       

        res.json({ message: "OTP sent successfully" });

    }
    catch(error){
        next(error);
    }

}

const registerUser = async (req, res, next)=>{

    // here first we will verify the otp

    try{

            const {email, name, birthday, otp} = req.body;
            // console.log(otp);
            if(!otpStore[email] || otp != otpStore[email].otp){
                return res.json({message:'Otp not Matched or Expired', status:400});
            }
        

        if(!email || !name || !birthday){
            req.status = 400;
            throw new Error("All fields are required");
        }

        const userExit = await User.findOne({email});

        if(userExit){
            req.status = 400;
            throw new Error('Email Already used');
        }

        const newUser = new User({email, name, birthday});
        await newUser.save();

        // console.log(newUser);

        const token = generateToken({id:newUser._id});

       return res.cookie('token', token, {httpOnly:true, maxAge:600*1000}).status(201).json({message:'Successfully Login', status:201});

    }
    catch(error){
        next(error);
    }
}

const loginUser = async (req, res, next)=>{

     // here first we will verify the otp

    try{

        const {email, otp} = req.body;

        if(!otpStore[email] || otp != otpStore[email].otp){
            return res.json({message:'Otp not Matched or Expired', status:400});
        }

        // check if the email is present or not
        const userExit = await User.findOne({email});

        if(!userExit){
            throw new Error('Email not exit');
        }

        const token = generateToken({id:userExit._id});

        return res.cookie('token', token, {httpOnly:true, maxAge:600*1000}).status(200).json({message:'Successfully Login', status:200});
    }
    catch(error){
        next(error);
    }

}

// const resendOtp = (req, res, next)=>{

//     try{

//         const {email} = req.body;

//     }
//     catch(error){
//         next(error);
//     }

// }

const isLoggedIn = async (req, res, next)=>{

    try{
        const id = req.userId;

        const data = await User.findById(id).select('name email');
        return res.json({data, status:200});
    }
    catch(error){
        next(error);
    }
}

const logoutUser = async (req, res, next)=>{
    
    try{

        res.clearCookie('token');
        res.json({ message: "Logged out successfully", status:200 });

    }
    catch(error){
        next(error);
    }

   
}

module.exports = {registerUser, loginUser, userOTP, isLoggedIn, logoutUser};