import mongoose from "mongoose";
const { Schema, model } = mongoose;

const clotheSchema = new Schema({
    clotheName:{
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true,
        enum:{
            values: ["Thin","Thick"],
            message: "{VALUE} is not a valid category"
        }
    },
    image:{
        url:{
            type: String
        }
    }
   

});
const clothes=mongoose.model('clothes',clotheSchema)
export default clothes;