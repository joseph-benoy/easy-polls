import User from "../models/user.model";
import { NextFunction, Request,Response } from 'express'
const bcrypt = require('bcrypt');

export default{
       register:async (req:Request,res:Response,next:NextFunction)=>{
              const hash = await bcrypt.hash(req.body.password,10);
              let newUser = new User({
                     firstName: req.body.firstName,
                     lastName:req.body.lastName,
                     email:req.body.email,
                     password:hash
              });
              newUser.save()
              .then((value:any)=>{
                     res.json(value);
              })
              .catch((err:any)=>{
                     next(err);
              })
       }
}