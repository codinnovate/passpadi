import mongoose, { Schema } from "mongoose";

const currentYear = new Date().getFullYear();

const questionSchema =mongoose.Schema({
    subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: true,
  },
  questionText: {
    type: String,
    required: true,
  },
  comments: {
        type: [Schema.Types.ObjectId],
        ref: 'comments'
  },
  
  author: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
  options: {
    type: [String],
    required: true,
    },
    examType: {
        type: String,
        required: true,
        enum: ['JAMB', 'NECO', 'WAEC', 'POST_UTME'],
    },
   examYear: {
    type: Number,
    required: true,
    min: 1978,
    max: currentYear,
  },
  answer: {
    type: String,
    required: true,
  },
  answerText: {
    type: String,
  },
}, {
    timestamps: true
})

export const Question = mongoose.model("Question", questionSchema)

