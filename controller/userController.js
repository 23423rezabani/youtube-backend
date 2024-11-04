import User from "../models/authModel.js";
import bcrypt from "bcryptjs";


export const updateUser =async (req,res)=>{
 const {email} = req.body
  if(req.user.id !== req.params.id) return res.status(401).send('you can only update your own account')

  try{ 
    
    const userExist = await User.findOne({email});
    
    if(userExist) return res.status(401).send('this email already register');

    const hashpasswordd = await bcrypt.hash(req.body.password,10)

   const userUpdate = await User.findByIdAndUpdate(req.params.id,{
    $set:{
        name:req.body.name,
        email:req.body.email,
        password:hashpasswordd
    }
   },{new:true});

   res.status(200).json(userUpdate);

  }catch(err) {
    console.log(err)
   res.status(400).json({message:err.message});
  }
}



export const loggedout = (req,res)=>{
   res.clearCookie('access_token');
   res.status(200).send('logged out success')
}


export const deleteAccount = async(req,res)=>{

 if(req.user.role !== "admin" && req.user.id !==req.params.id) return res.status(401).send('you can only delete your own account')
 try{
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie('access_token')
 res.status(200).send('user deleted and clear cookie')
}catch(err) {
res.status(401).json({message:err.message}) 
}
}