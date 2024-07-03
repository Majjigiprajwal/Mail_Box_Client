const dotenv = require('dotenv')
dotenv.config()
const express = require('express');
const mongoose = require('mongoose')
const path = require('path')
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');


const app = express();
const PORT = process.env.PORT;



app.use(cors());
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use(cookieParser())



app.use('/api/user', require('./Routes/user'));
app.use('/api/mail', require('./Routes/mail'));


const connectDb = async ()=>{
    try{
            await mongoose.connect(process.env.MONGOOSE_URL)
            app.listen(PORT)
            console.log('connected')
          }
    catch(error){
            console.log(error)
          }
      }

connectDb()