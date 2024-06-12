import mongoose,{ Schema, model, mongo } from "mongoose";

const subjectSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true },
    subject_id: { type: String, unique: true },
    

})

export const Subject = mongoose.model('Subject', subjectSchema)