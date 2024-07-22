import mongoose, {Schema} from 'mongoose';

const messageSchema = new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true,
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true,
    },
    message:{
        type:String,
        required:true
    },
    received:Boolean,
}, {timestamps:true})

export default mongoose.model("Messages", messageSchema);