import { NextFunction, Request,Response } from 'express'
import Poll from '../models/poll.model';
import User from '../models/user.model';
const ObjectId = require('bson-objectid');
export default {
       createPoll:async(req:Request,res:Response,next:NextFunction)=>{
              try{
                     var slag = ObjectId(Date.now()).toString();
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
                                   let slagData = value.slag
                                   // @ts-ignore
                                   User.updateOne({_id:req.id},
                                          {
                                                 $push:{
                                                        polls:value._id
                                                 }
                                          }
                                   ).
                                   then((value:any)=>{
                                          res.json({slag:slagData});
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
       },
       getAll:async (req:Request,res:Response,next:NextFunction)=>{
              try{
                     // @ts-ignore
                     Poll.find({createdBy:req.id},'title views').lean()
                     .then((value:[])=>{
                            res.json(value);
                     })
                     .catch((err:any)=>{
                            next(err.message);
                     })
              }
              catch(err){
                     next(err.message);
              }
       },
       updatePoll:async(req:Request,res:Response,next:NextFunction)=>{
              try{
                     Poll.updateOne(
                            // @ts-ignore
                            {slag:req.body.slag},
                            {
                                   $set:{
                                          title:req.body.title,
                                          description:req.body.description,
                                          expiry:req.body.expiry,
                                          options:req.body.options
                                   }
                            }).then((value:any)=>{
                                   res.json({slag:req.body.slag});
                            })
                            .catch((err:any)=>{
                                   next(err.message);
                            })
              }
              catch(err){
                     next(err.message);
              }
       },
       getPollData:async (req:Request,res:Response,next:NextFunction)=>{
              try{
                     Poll.findOne({slag:req.params.slag}).then((value:any)=>{
                            res.json(value);
                     })
                     .catch((err:any)=>{
                            next(err.message);
                     })
              }
              catch(err){
                     next(err.message);
              }
       }
}