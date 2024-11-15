import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
   name:{
    type:String,
    required:[true,'name is required']
   },
   email:{
    type:String,
    required:[true,'email is required'],
    unique:true
   },
   password:{
    type:String,
    required:[true,'password is required'],
    min:4,
    max:8
   },
   verified:{
      type:Boolean,
      default:false
   },
   role:{
      type:String,
      enum:["user","admin"],
      default:"user"
   }

})

const User = mongoose.model('User',userSchema);

export default User;
