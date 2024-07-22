import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  postId:{ type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
},
{
    timestamps: true
}
)

export default mongoose.model("notification", notificationSchema)