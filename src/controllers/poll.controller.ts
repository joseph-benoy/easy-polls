import { NextFunction, Request,Response } from 'express'
const bcrypt = require('bcrypt');
import Poll from '../models/poll.model';
import User from '../models/user.model';

export default {
       createPoll:async(req:Request,res:Response,next:NextFunction)=>{
              try{
                     var slag = await bcrypt.hash(req.body.title,1);
                     let poll = new Poll({
                            title:req.body.title,
                            description:req.body.description,
                            expiry:req.body.expiry,
                            options:JSON.parse(req.body.options),
                            // @ts-ignore
                            createdBy:req.id,
                            slag:slag
                     });
                     poll.validate()
                     .then(()=>{
                            poll.save()
                            .then((value:any)=>{
                                   // @ts-ignore
                                   User.updateOne({_id:req.id},
                                          {
                                                 $push:{
                                                        polls:value._id
                                                 }
                                          }
                                   ).
                                   then((value:any)=>{
                                          res.json(value);
                                   }).
                                   catch((err:any)=>{
                                          next(err.message)
                                   })
                            })
                            .catch((err:any)=>{
                                   next(err);
                            })
                     })
                     .catch((err:any)=>{
                            next(err);
                     })
              }
              catch(err){
                     next(err.message);
              }
       }
}