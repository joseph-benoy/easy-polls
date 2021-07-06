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
              required:true
       },
       password:{
              type:String,
              required:true
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