import User from "../models/user.model";
import { NextFunction, Request,Response } from 'express'
const bcrypt = require('bcrypt');

export default{
       register:async (req:Request,res:Response,next:NextFunction)=>{
              try{
                     if(req.body.password.length<8){
                            throw new Error(`Invalid password`);
                     }
                     const hash = await bcrypt.hash(req.body.password,10);
                     let newUser = new User({
                            firstName: req.body.firstName,
                            lastName:req.body.lastName,
                            email:req.body.email,
                            password:hash
                     });
                     newUser.validate().then(()=>{
                            newUser.save()
                            .then((value:any)=>{
                                   res.json({status:"success"});
                            })
                            .catch((error:any)=>{
                                   if(error.name === 'MongoError' && error.code === 11000){
                                          next("Email already in use");
                                   }
                                   else{
                                          next("Something went wrong with db")
                                   }
                            })     
                     }).catch((error:any)=>{
                            next(error);
                     });
              }
              catch(error){
                     next(error.message);
              }
       },
       login:async(req:Request,res:Response,next:NextFunction)=>{
              try{
                     if(req.body.username===""){
                            throw new Error(`email can't be empty`);
                     }
                     if(req.body.password===""){
                            throw new Error(`password can't be empty`);
                     }
                     const hash = await bcrypt.hash(req.body.password,10);
                     let user = User.findOne({email:req.body.email},'email password')
                     .then(async (value:any)=>{
                            let match = await bcrypt.compare(req.body.password,value.password);
                            if(match){
                                   res.json({status:"success"})
                            }
                            else{
                                   next("Invalid password!");
                            }
                     })
                     .catch((error:any)=>{
                            next("Invalid username");
                     })
              } 
              catch(err){
                     next(err);
              }
       }
}