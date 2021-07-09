import mongoose,{Schema,model} from "mongoose";

const schema = new Schema({
       title:{
              type:String,
              required:true
       },
       description:{
              type:String,
              required:true
       },
       expiry:{
              type:Date,
              required:true
       },
       options:{
              type:Array,
              required:true,
              validate:(value:[])=>{
                     return (value.length>1)?true:false;
              }
       },
       createdBy:{
              type:Schema.Types.ObjectId,
              required:true
       },
       createdOn:{
              type:Date,
              required:true
       },
       slag:{
              type:String,
              required:true
       }
});

const Poll = model('Poll',schema);

export default Poll;