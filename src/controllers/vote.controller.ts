import { NextFunction, Request,Response } from 'express';
import Poll from '../models/poll.model';
import Vote from '../models/vote.model';

export default{
       getPollData:(req:Request,res:Response,next:NextFunction)=>{
              try{
                     Poll.findOne({slag:req.params.slag},'title description expiry options views')
                     .then((value:any)=>{
                            if(new Date(value.expiry).getTime()<Date.now()){
                                   next("Poll expired");
                            }
                            else{
                                   res.json(value);
                            }
                     })
                     .catch((err:any)=>{
                            next(err.message);
                     });
              }
              catch(err){
                     next(err.message);
              }
       }
}