const express = require('express');
const cookieParser = require('cookie-parser');
const config = require('./config/config');
import routes from "./routes";
const db = require('./config/db');


var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/user",routes.userRouter);
app.use("/poll",routes.pollRouter);
app.use("/vote",routes.voteRouter);






































































app.use((err:any,req:any,res:any,next:any)=>{
       res.status(400).json({error:err});
})
app.listen(config.PORT||5000,()=>{
       console.log(`Server started : ${config.PORT} .....`);
})