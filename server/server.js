import app from './app.js';
import { config } from 'dotenv';
import mongoose from 'mongoose';
import {v2 as cloudinary} from 'cloudinary';
import nodeCron from "node-cron";
import StatsModel from './models/stats.js';

config({
    path:'./config/config.env'
})
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API,
  api_secret: process.env.CLOUDINARY_SECRET
});

nodeCron.schedule("0 0 0 1 * *", async ()=>{
    try {
        await StatsModel.create({});
    } catch (error) {
        console.log(error);
    }
})

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(5000, ()=>{
        console.log("The server and database is successfully running")
    })
})
.catch((err)=>{
    console.log(err)
})

