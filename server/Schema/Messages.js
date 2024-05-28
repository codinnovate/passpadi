import mongoose, {Schema} from 'mongoose';

const messageSchema = mongoose.Schema({
    message:String,
    name:String,
    timestamps:String,
    received:Boolean,
})

export default mongoose.model("Messages", messageSchema);