import User from "../models/authModel.js";
import JWT from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const forgotPassword = async (req,res)=>{
 const {email} = req.body;
  try{
  const user = await User.findOne({email});

  if(!user) return res.status(404).send('user not found');

  const token = JWT.sign({id:user._id},process.env.SECRET_KEY,{expiresIn:'1d'});
 const URL = `localhost:3000/api/forgotPassword/${user._id}/${token}`;

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'rezzrg439@gmail.com',
      pass: 'reds@@@@@@999'
    }
  });
  
  var mailOptions = {
    from: 'rezzrg439@gmail.com',
    to: 'myfriend@yahoo.com',
    subject: 'Sending Email using Node.js',
    text: `That was easy!click the link${URL}`
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  }catch(err) {
     res.status(500).json({message:err.message});
  }
}


export const resetpassword = async (req,res)=>{
  const {id,token} = req.params;
  const {password} = req.body;

  try{
    JWT.verify(token,process.env.SECRET_KEY,(err,user)=>{
        if(err){
            return res.status(404).send('access denied')
        }else{
            req.user = user
        }
    })
  const hashpassword = bcrypt.hash(password,10);
    const user = await User.findByIdAndUpdate(id,{
        password:hashpassword
    });
    await user.save();
  }catch(err) {
 res.status(500).json({message:err.message})
  }
}
