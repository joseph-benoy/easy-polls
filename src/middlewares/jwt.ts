const {sign,verify,decode} = require('jsonwebtoken');
const config = require('../config/config');

const secret = config.JWT_SECRET;
console.log(config.JWT_SECRET)

const createToken = (payload:Object)=>{
    return sign(payload,secret);
}

const validateToken = (req:any,res:any,next:any)=>{
    const accessToken =  req.cookies['access-token'];
    if(!accessToken){
        return res.status(400).json({error:"user not authenticated"});
    }
    else{
        try{
            const payload = verify(accessToken,secret);
            if(payload){
                req.authenticated = true;
                req.username = payload.username;
                req.id = payload.id;
                return next();
            }
        }
        catch(err){
            res.status(400).json({error:err});
        }
    }
}










module.exports = {createToken,validateToken};