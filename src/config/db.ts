const mongoose = require('mongoose');
import process from "process";
const server = process.env.DB;
const database = "polls";
const url = `mongodb://${server}/${database}`;
// @ts-ignore
mongoose.connect(url,{ useNewUrlParser: true ,useUnifiedTopology: true,useCreateIndex:true}).then((value)=>{
       console.log("Database connected");
// @ts-ignore
}).catch((reason)=>{
       console.log("Failed");
});
const redis = require("redis");
const client = redis.createClient(config.REDIS_PORT);

client.on('error',(err:any)=>{
       console.log("Redis failed!");
})