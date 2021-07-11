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
                     if(cachedData===null){
                           let newData = await setAsync(req.query.clientid,req.query.ip);
                           Poll.findOne({slag:req.params.slag},'title description expiry options views')
                           .then((value:any)=>{
                                  if(new Date(value.expiry).getTime()<Date.now()){
                                         next("Poll expired");
                                  }
                                  else{
                                         res.json({
                                                title:value.title,
                                                description:value.description,
                                                expiry:value.expiry,
                                                views:value.views,
                                                options:value.options
                                         });
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
       }
}