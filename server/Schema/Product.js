import mongoose, { Schema } from "mongoose";

const productSchema = mongoose.Schema({
    product_id: {
          type: String,
        required: true,
        unique:true
    },
    title: {
        type: String,
        required: true,
    },
    banner: {
        type: String,
        required: true,
    },
    des: {
        type: String,
        maxlength: 200,
    },
    categories: {
        type: [String],
    },
    seller: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    activity: {
        total_likes: {
            type: Number,
            default: 0
        },
        total_reviews: {
            type: Number,
            default: 0
        },
        total_views: {
            type: Number,
            default: 0
        },
        total_parent_reviews: {
            type: Number,
            default: 0
        },
    },
    reviews: {
        type: [Schema.Types.ObjectId],
        ref: 'reviews'
    },
    price: {
        type: Number,
        default:500
    },
    draft: {
        type: Boolean,
        default: false
    }

}, 
{ 
    timestamps: {
        createdAt: 'publishedAt'
    } 

})

export default mongoose.model("products", productSchema);