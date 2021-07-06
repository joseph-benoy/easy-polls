const express = require('express');
const cookieParser = require('cookie-parser');
const config = require('./config/config');
import routes from "./routes";

var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/user",routes.userRouter);









































































app.listen(config.PORT||5000,()=>{
       console.log(`Server started : ${config.PORT} .....`);
})