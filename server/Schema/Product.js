import mongoose, { Schema } from "mongoose";

const productSchema = mongoose.Schema({
    product_id:{type:String, unique:true},
    name: {
        type: String,
        required: true,
    },
    banner: {
        type: String,
        required: true,
    },
    description: { type: String, required: true },
    seller: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    file: {
        type: String,
        required:true
    },
    
    // activity: {
    //     total_likes: {
    //         type: Number,
    //         default: 0
    //     },
    //     total_reviews: {
    //         type: Number,
    //         default: 0
    //     },
    //     total_views: {
    //         type: Number,
    //         default: 0
    //     },
    //     total_parent_reviews: {
    //         type: Number,
    //         default: 0
    //     },
    // },
    // reviews: {
    //     type: [Schema.Types.ObjectId],
    //     ref: 'reviews'
    // },
    price: {
        type: Number,
        default: 500,
        required:true,
    },


}, 
{ 
    timestamps:true 

})

export default mongoose.model("products", productSchema);