const mongoose = require('mongoose');
import process from "process";
const server = process.env.DB;
const database = "polls";
const url = `mongodb://${server}/${database}`;
// @ts-ignore
mongoose.connect(url,{ useNewUrlParser: true ,useUnifiedTopology: true}).then((value)=>{
       console.log("Database connected");
// @ts-ignore
}).catch((reason)=>{
       console.log("Failed");
});
