import mongoose, {Schema} from 'mongoose';

const postSchema = new mongoose.Schema({
  content: { type: String },
  image:{type:String},
  user: { type: mongoose.Schema.Types.ObjectId, 
    ref: "users", 
    required: true },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  ],
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
      image: {
        type: String,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Post = mongoose.model("Post", postSchema);

