import { NextFunction, Request,Response } from 'express'
const bcrypt = require('bcrypt');
import Poll from '../models/poll.model';

export default {
       createPoll:async(req:Request,res:Response,next:NextFunction)=>{
              console.log("###");
              var slag = await bcrypt.hash(req.body.title,1);
              let poll = new Poll({
                     title:req.body.title,
                     description:req.body.description,
                     expiry:req.body.expiry,
                     options:JSON.stringify(req.body.options),
                     // @ts-ignore
                     createdBy:req.id,
                     slag:slag
              });
              poll.validate()
              .then(()=>{
                     poll.save()
                     .then((value:any)=>{
                            res.json(value)
                     })
                     .catch((err:any)=>{
                            next(err);
                     })
              })
              .catch((err:any)=>{
                     next(err);
              })
       }
}