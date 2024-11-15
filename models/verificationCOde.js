import mongoose from "mongoose";

const verificartioncodeSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    code:{
        type:String,
        required:true
    },
    expiration: {
         type: Date,
         required:true 
    },
});

const verificationCode = mongoose.model('verificationCode',verificartioncodeSchema);

export default verificationCode