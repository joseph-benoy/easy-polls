import mongoose,{Schema,model} from "mongoose";

const schema = new Schema({
       firstName:{
              type:String,
              required:true
       },
       lastName:{
              type:String,
              required:true
       },
       email:{
              type:String,
              required:true,
              unique:true,
              lowercase:true,
              validate:(value:string)=>{
                     return (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i).test(value);
              }
       },
       password:{
              type:String,
              required:true,
              validate:(value:string)=>{
                     return (value.length>7?true:false);
              }
       },
       polls:{
              type:Array,
              default:[]
       },
       settings:{
              type:Object,
              default:{}
       }
},{timestamps:true});

const User = model('User',schema);

export default User;