import mongoose from "mongoose";

const videoSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"name video is required"]
    },
    like:{
        type:Boolean,
    },
    comment:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    youtuberId:{type:mongoose.Schema.Types.ObjectId,ref:"Youtuber"}
});

const Video = mongoose.model('Video',videoSchema);

export default Video