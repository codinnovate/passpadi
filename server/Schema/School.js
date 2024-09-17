import mongoose, { Schema } from "mongoose";

const schoolSchema = new mongoose.Schema({
    school_id: {
        type: String,
        required: true,
        unique:true
    },
    shortName: {
        type: String,
        require: true,
        unique:true
    },
    name: {
        type: String,
        require: true,
        unique:true
    },
    logo: {
        type: String,
    },
    about: {
        type: String,
    },
    

})


export const School = mongoose.model("School", schoolSchema);