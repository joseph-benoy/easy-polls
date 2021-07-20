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
                     Poll.find({createdBy:req.id},'title views slag').lean()
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
       },
       getPollStats:async(req:Request,res:Response,next:NextFunction)=>{
              try{
                     // @ts-ignore
                     Poll.findOne({slag:req.params.slag})
                     .then((value:any)=>{
                            let resultByOptions:{} = {};
                            for(let key of value.options){
                                   // @ts-ignore
                                   resultByOptions[key] = 0;
                            }
                            let options = Object.keys(resultByOptions); 
                            for(let vote of value.votes){
                                   // @ts-ignore
                                   resultByOptions[vote.option]++;
                            }
                            let resultByCountry = {};
                            let resultByCity = {};
                            for(let vote of value.votes){
                                   // @ts-ignore
                                   if(vote.country in resultByCountry){
                                          // @ts-ignore
                                          resultByCountry[vote.country][vote.option]++;
                                   }
                                   else{
                                          // @ts-ignore
                                          resultByCountry[vote.country] = {};
                                          for(let opt of options){
                                                 // @ts-ignore
                                                 resultByCountry[vote.country][opt] = 0;
                                          }
                                          // @ts-ignore
                                          resultByCountry[vote.country][vote.option]++;
                                   }                
                                   // @ts-ignore
                                   if(vote.city in resultByCity){
                                          // @ts-ignore
                                          resultByCity[vote.city].result[vote.option]++;
                                   }
                                   else{
                                          // @ts-ignore
                                          resultByCity[vote.city] = {};
                                          // @ts-ignore
                                          resultByCity[vote.city].country = vote.country;
                                          // @ts-ignore
                                          resultByCity[vote.city].result = {};
                                          for(let opt of options){
                                                 // @ts-ignore
                                                 resultByCity[vote.city].result[opt] = 0;
                                          }
                                          // @ts-ignore
                                          resultByCity[vote.city].result[vote.option]++;
                                   }
                            }
                            res.json({
                                   title:value.title,
                                   description:value.description,
                                   options:options,
                                   slag:value.slag,
                                   views:value.views,
                                   expiry:value.expiry,
                                   createdAt:value.createdAt,
                                   resultByOptions:resultByOptions,
                                   resultByCountry:resultByCountry,
                                   resultByCity:resultByCity
                            });
                     })
                     .catch((err:any)=>{
                            next(err.message);
                     })
              }
              catch(err){
                     next(err.message);
              }
       },
       deletePoll:async(req:Request,res:Response,next:NextFunction)=>{
              try{
                     Poll.deleteOne({slag:req.query.slag})
                     // @ts-ignore
                     .then((value)=>{
                            res.json(value);
                     })
                     // @ts-ignore
                     .catch((err)=>{
                            next(err.message);
                     })
              }
              catch(err){
                     next(err.message);
              }
       }
}