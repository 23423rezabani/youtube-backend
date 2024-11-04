import mongoose from "mongoose";

const youtuberSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name of the youtuber is required"]
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    videos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video"
    }]
});

const Youtuber = mongoose.model('Youtuber', youtuberSchema);

export default Youtuber;
