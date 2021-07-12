import { NextFunction, Request,Response } from 'express';
import Poll from '../models/poll.model';
import Vote from '../models/vote.model';
const {promisify} = require('util');

const redis = require("redis");
const client = redis.createClient(process.env.REDIS_PORT);

client.on('error',(err:any)=>{
       console.log("Redis failed!");
})

client.on('connect',(res:any)=>{
       console.log("Redis connected!");
})
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

export default{
       getPollData:async (req:Request,res:Response,next:NextFunction)=>{
              try{
                     let cachedData = await getAsync(req.query.clientid);
                     if(cachedData===null||cachedData!==req.params.slag){
                           Poll.findOne({slag:req.params.slag},'title description expiry options views')
                           .then((value:any)=>{
                                  if(new Date(value.expiry).getTime()<Date.now()){
                                         next("Poll expired");
                                  }
                                  else{
                                         Poll.updateOne({slag:req.params.slag},{
                                                $set:{views:value.views+1}
                                         }).then(()=>{
                                                 res.json({
                                                        title:value.title,
                                                        description:value.description,
                                                        expiry:value.expiry,
                                                        views:value.views,
                                                        options:value.options
                                                 });
                                         })
                                         .catch((err:any)=>{
                                                next(err.message)
                                         })
                                  }
                           })
                           .catch((err:any)=>{
                                  next(err.message);
                           });
                     }
                     else{
                            next("vote already casted");
                     }
              }
              catch(err){
                     next(err.message);
              }
       },
       castVote:async(req:Request,res:Response,next:NextFunction)=>{
              try{
                     let cachedData = await getAsync(req.body.clientid);
                     if(cachedData!==null||cachedData===req.params.slag){
                            next("vote already casted");
                     }
                     let newVote = new Vote({
                            option:req.body.choosen,
                            city:req.body.city,
                            region:req.body.region,
                            country:req.body.country,
                            countryCode:req.body.countryCode
                     });
                     newVote.validate()
                     .then(()=>{
                            Poll.updateOne({
                                   slag:req.params.slag
                            },{
                                   $push:{votes:newVote}
                            })
                            .then((value:any)=>{
                                   setAsync(req.body.clientid,req.params.slag);
                                   res.json(value);
                            })
                            .catch((err:any)=>{
                                   next(err.message);
                            })
                     })
                     .catch((err:any)=>{
                            next(err.message)
                     })
              }
              catch(err){
                     next(err.message);
              }
       }
}