import User from "../models/authModel.js";
import Jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const signup = async (req,res)=>{
   const {name,email,password,role} = req.body;

  const hashpassword = await bcrypt.hash(password,10);
try{
    const newuser = await User.create({
        name:name,
        email:email,
        password:hashpassword,
        role: role || "user" 
    })
    // if(newuser){
    //     // Jwt.sign({id:newuser._id},'')
    // }
    console.log(newuser)
    res.status(201).json(newuser);  
}catch(err) {
 res.status(401).json({message:err.message})
}
}

export const login =async (req,res)=>{ 
  const {email,password} = req.body;

  try{
   const user = await User.findOne({email});

   if(!user) return res.status(404).send('email or password is wrong')

   const isMatch = bcrypt.compare(user.password,password);
    
   if(!isMatch) return res.status(404).send('email or password is wrong');

   const token = Jwt.sign({id:user._id, role: user.role },process.env.SECRET_KEY,{expiresIn:'1d'});

   res.cookie('access_token',token,{httpOnly:true})

   res.status(200).json(user)

  }catch(err) {
  res.status(404).json({message:err.message});
  }
}


