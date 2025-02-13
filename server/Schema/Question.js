import mongoose, { Schema } from "mongoose";

const currentYear = new Date().getFullYear();

const questionSchema = mongoose.Schema({
    subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: true,
  },
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School',
  },
  instruction: {
    type: String,
    
  },
  question: {
    type: String,
    required: true,
  },
  image:{
    type: String,
    
  },
  question_id: {
    type: String,
    required: true,
    unique:true,
  },
  replies: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
      content: {
        type: String,
        required: true,
      }, 
      replying_to:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
      image: {
        type: String,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  
  author: {
        type: Schema.Types.ObjectId,
        // required: true,
        ref: 'users'
    },
  options: {
    type: [String],
    required: true,
    },
    examType: {
        type: String,
        required: true,
        enum: ['JAMB', 'NECO', 'WAEC', 'POST UTME'],
    },
   examYear: {
    type: Number,
    required: true,
    min: 1978,
    max: currentYear,
  },
  answer: {
    type: String,
    // required: true,
  },
  answerDetail: {
    type: String,
  },
}, {
    timestamps: true
})

export const Question = mongoose.model("Question", questionSchema)

