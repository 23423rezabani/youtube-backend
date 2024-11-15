import User from "../models/authModel.js";
import Jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import verificationCode from "../models/verificationCOde.js"
import nodemailer from "nodemailer"
import dotenv from "dotenv"

dotenv.config();



const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS);


const sendVerificationEmail = (email, code) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'code verification',
    text: `this is your verify code: ${code}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};





export const signup = async (req,res)=>{
   const {name,email,password,role} = req.body;

   try{
  const existuser = await User.findOne({email});
  
  if(existuser) return res.status(404).send("this email is already register")
  const hashpassword = await bcrypt.hash(password,10);

    const newuser = await User.create({
        name:name,
        email:email,
        password:hashpassword,
        role: role || "user" 
    })
   
    const generatedCode = Math.floor(100000+Math.random()*900000);

 
    const expirationCode = new Date;
    expirationCode.setMinutes(expirationCode.getMinutes()+15);

    const verificationCodeCreate = await verificationCode.create({
      email:newuser.email,
      code:generatedCode,
      expiration:expirationCode
    });

  const token = Jwt.sign({email:newuser.email},process.env.SECRET_KEY,{expiresIn:'1d'});
   
  res.cookie("access_token",token,{httpOnly:true})
   
    sendVerificationEmail(email,generatedCode)
    res.status(200).json({message:'we sent you verify code ',token})
}catch(err) {
 res.status(401).json({message:err.message})
}
}

export const verifycode =async (req,res)=>{
 const {code} =  req.body;
 const token = req.cookies.access_token

 try{

  const decode = Jwt.verify(token,process.env.SECRET_KEY)
    const email = decode.email;
  



  const verificationCodefind = await verificationCode.findOne({email});
    if(!verificationCodefind) return res.status(404).send('verify code not found');

    const currentTime = Date.now();
    if(verificationCodefind.expiration < currentTime) return res.status(404).json({message:"code is burning"})

    if(verificationCodefind.code !== code) return res.status(404).json({message:'code is not true'})
   
    const user = await User.findOne({email})
    if(user){ 
     user.verified = true,
     await user.save();
    }

   
   await verificationCode.deleteOne({email});

   res.status(200).json({message:"register is  verified"})

 }catch(err) {
  res.status(500).json({message:err.message})
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

   if(user.verified !== true){
    res.status(404).json({message:"you are not verified"})
   }

   res.status(200).json(user)

  }catch(err) {
  res.status(500).json({message:err.message});
  }
}


