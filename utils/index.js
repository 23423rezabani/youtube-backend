import JWT from "jsonwebtoken";

export const VerifyToken = (req,res,next)=>{
  const token = req.cookies.access_token;
  
  if(!token) return res.status(401).send('access denied')
  
  JWT.verify(token,process.env.SECRET_KEY,(err,user)=>{
   if(err){
    console.log(err)
    res.status(400).send('access denied')
   }else{
    req.user = user;
    next()
   }
  })
}

export const AdminMiddelware = (req,res,next)=>{
  if(req.user.role !== "admin") return res.status(403).send('youn dont have access')
  next()
}

// export const isVerified = (req,res,next)=>{
//    console.log(req.user.verified);

//     if(req.user.verified !== true){
//       res.status(404).send('you not verified your account')
//     }
//      next()
  
  
// }