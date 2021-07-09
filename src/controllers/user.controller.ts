import User from "../models/user.model";
import { NextFunction, Request,Response } from 'express'
const bcrypt = require('bcrypt');
const jwt = require('../middlewares/jwt');


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
                     let user = User.findOne({email:req.body.email},'email password')
                     .then(async (value:any)=>{
                            let match = await bcrypt.compare(req.body.password,value.password);
                            if(match){
                                   let accessToken = jwt.createToken({id:value._id});
                                   res.cookie('access-token',accessToken,{
                                          // @ts-ignore
                                          maxAge:new Date(253402300000000),
                                          httpOnly:true
                                      }).json({status:"success"})
                            }
                            else{
                                   next("Invalid password!");
                            }
                     })
                     .catch((error:any)=>{
                            next(error.name+error.message);
                     })
              } 
              catch(err){
                     next(err);
              }
       },
       getUserData:async(req:Request,res:Response,next:NextFunction)=>{
              try{
                     // @ts-ignore
                     let user = User.findOne({_id:req.id},'firstName lastName email').then((value:Object)=>{
                            res.json(value);
                     }).catch((error:any)=>{
                            next(error.name+error.message);
                     });
              }
              catch(err){
                     next(err);
              }
       },
       updateGeneral:async(req:Request,res:Response,next:NextFunction)=>{
              try{
                     User.updateOne(
                            // @ts-ignore
                            {_id:req.id},
                            {
                                   $set:
                                          {
                                                 // @ts-ignore
                                                 firstName:req.body.firstName,
                                                 lastName:req.body.lastName,
                                                 email:req.body.email
                                          }
                            }
                     
                     )
                     .then((value:any)=>{
                            res.json(value)
                     })
                     .catch((err:any)=>{
                            next(err);
                     })
              }
              catch(err){   
                     next(err);
              }
       },
       updatePassword:async(req:Request,res:Response,next:NextFunction)=>{
              try{
                     // @ts-ignore
                     User.findOne({_id:req.id},"password")
                     .then(async (value:any)=>{
                            let match = await bcrypt.compare(req.body.currentPassword,value.password);
                            if(match){
                                   const newHash = await bcrypt.hash(req.body.newPassword,10);
                                   // @ts-ignore
                                   User.updateOne({_id:req.id},{$set:{password:newHash}}).then((value:any)=>{
                                          res.json(value);
                                   }).catch((err:any)=>{
                                          next(err.message);
                                   })
                            }
                            else{
                                   next("Incorrect password");
                            }
                     })
                     .catch((err:any)=>{
                            next(err.message);
                     })
              }
              catch(err){
                     next(err.message);
              }
       },
       logOut:async(req:Request,res:Response,next:NextFunction)=>{
              try{
                     res.cookie('access-token',"",{
                            // @ts-ignore
                            maxAge:new Date(0),
                            httpOnly:true
                        }).json({status:"logout"})
              }
              catch(err){
                     next(err);
              }
       }
}