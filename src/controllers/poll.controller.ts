import { NextFunction, Request,Response } from 'express'
import Poll from '../models/poll.model';
import User from '../models/user.model';
const ObjectId = require('bson-objectid');
export default {
       createPoll:async(req:Request,res:Response,next:NextFunction)=>{
              try{
                     var slag = ObjectId(Date.now()).toString();
                     console.log(req.body.options);
                     let poll = new Poll({
                            title:req.body.title,
                            description:req.body.description,
                            expiry:req.body.expiry,
                            options:req.body.options,
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