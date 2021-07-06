require('dotenv').config();
import process from "process";

var config = {
       PORT:process.env.PORT,
       ORIGIN1:process.env.ORIGIN1,
       SECRET:process.env.SESSION_SECRET,
       ENV:process.env.NODE_ENV
};


module.exports = config;