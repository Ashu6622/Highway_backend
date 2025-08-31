const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./routes/commonRoute');
const cookieParser = require("cookie-parser");
require('dotenv').config();
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

app.use(cors({
  origin: ['https://highwaydel.netlify.app', 'http://localhost:5173', 'http://localhost:5174'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(cookieParser());

connectDB();


app.use(router);
app.use(errorHandler);

app.listen(process.env.PORT, (error)=>{
    if(error){
        console.log(error);
    }
    else{
        console.log(`Running on PORT ${process.env.PORT}`)
    }
})