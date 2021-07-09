import {Schema,model} from "mongoose";

let schema = new Schema({
       option:{
              type:String,
              required:true
       },
       region:{
              type:String,
              required:true
       }
});

const Vote = model('Vote',schema);

export default Vote;
