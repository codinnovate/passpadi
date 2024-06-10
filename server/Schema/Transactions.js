import mongoose, { Schema } from "mongoose";

const transactionSchema = mongoose.Schema({
    transaction_id: {
        type: String,
        required: true,
        unique: true,
    },
    amount: {
        type: String, 
        required: true,
    },
    user: { type: Schema.Types.ObjectId},
    status: {
        type: String,
    },
    access_code:{type:String, unique:true}
    
}, {
    timestamp:true,
})

export const Transaction  = mongoose.model("Transaction", transactionSchema)