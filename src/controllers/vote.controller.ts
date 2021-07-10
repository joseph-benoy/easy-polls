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
                     console.log("server");
                     console.log(req.query.ip,req.query.clientid);
                     let cachedData = await getAsync.get(req.query.ip);
                     if(cachedData===null){
                            
                     }
              }
              catch(err){
                     next(err.message);
              }
       }
}