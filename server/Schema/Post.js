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
      ref: "User",
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

