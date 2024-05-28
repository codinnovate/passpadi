import mongoose, {Schema} from 'mongoose';

const postSchema = mongoose.Schema({
    content:[],
    attachments:String,
    author:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'users'
    },
    



})