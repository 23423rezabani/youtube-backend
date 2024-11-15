import Video from "../models/videoModel.js";
import Youtuber from "../models/youtuberModel.js";

export const createYoutuber = async (req,res)=>{
  const {name} = req.body;

  try{
   const tuber = await Youtuber.create({
    name:name,
    userId:req.user.id,
   }) 

   res.status(200).json({tuber})

  }catch(err) {
   res.status(500).json({message:err.message})
  }
}

export const youtuberVideo =async (req,res)=>{
  const {videoname,like,comment} =req.body;

  try{

    if(req.user.id !== req.params.id){
     res.status(401).send('you can only create own video')
    }

    const youtuber = await Youtuber.findOne({userId:req.params.id});

    if (!youtuber) {
      return res.status(404).send("Youtuber not found");
    }


    const createVideo = await Video.create({
      name:videoname,
      like:like,
      comment:comment,
      youtuberId:youtuber.userId
     })

     if(createVideo){
      youtuber.videos.push(createVideo._id)
     }
     await youtuber.save();
     res.status(200).json(createVideo);
     
  }catch(err) {
 res.status(500).json({message:err.message})
  }
}


export const findYoutuber = async (req,res)=>{
 try{
 const fYoutuber = await Youtuber.find();
 res.status(200).json(fYoutuber)
 }catch(err){
  res.status(500).json({message:err.message})
 } 
}

export const findVideoByYoutuber = async (req,res)=>{
 const {id}=req.params; 
 
 try{
   const youtuber = await Youtuber.findById(id).populate('videos');
 
  const findYTVideo = await Video.find({youtuberId:youtuber.userId});

  res.status(200).json({findYTVideo});
 }catch(err) {
 res.status(500).json({message:err.message})
 }
}

export const findVIdeoDelete =async(req,res)=>{
 const {id,videoId}  = req.params;

 try{

 const youtuber = await Youtuber.findOne({_id:id});

 if(req.user.id !== youtuber.userId.toString())  return res.status(400).send('you can only delete your own video');
 
 const deleteVideo = await Video.findOneAndDelete(videoId);

 if (deleteVideo) {
   youtuber.videos.pull(videoId);
}

 await youtuber.save();

 res.status(200).json(youtuber);
 
}catch(err){
  console.log(err);
 res.status(500).json({message:err.message})
}
}

