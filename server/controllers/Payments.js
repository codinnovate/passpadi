import axios from 'axios';
import { Transaction } from '../Schema/Transactions.js';
const baseUrl = "https://api.paystack.co/transaction";

export const VerifyTransaction = async (req, res) => {
    const reference = req.params.reference;
    // const userId = req.user;
    if (reference) {
        try {
            const response = await axios.get(`${baseUrl}/verify/${reference}`, {
                headers: {
                    'Authorization': `Bearer sk_test_267518e236e93283c4b7aba71e85f37a4b630dc0`,
                    'Content-Type': 'application/json'
                }
            });
            const status = response.data.data.status;
            if (status) {
                const updatedTransaction = await Transaction.findOneAndUpdate({ transaction_id: reference }, { status: status }, { new: true })
                return res.status(200).json(updatedTransaction)
            }
             else {
                 return res.status(500).json({error: err.message})
             }
         
        } catch (error) {
            console.error(error);
            res.status(500).json({ "message": "An error occurred while verifying the transaction.", "error": error.message });
        }
    } else {
        res.status(400).json({ "message": "No reference provided. Are you sure the transaction was successful?" });
    }
};



export const initTransaction = async (req, res) => {
    const userId = req.user;
    const { amount, email,  } = req.body;
    try {
        const response = await axios.post(`${baseUrl}/initialize`, { amount, email , callback_url:"http://localhost:5173/transactions/"},
            {
                headers: {
                    'Authorization': `Bearer sk_test_267518e236e93283c4b7aba71e85f37a4b630dc0`,
                    'Content-Type': 'application/json'
                }
            });
        let access_code = response.data.data.access_code;
        let reference = response.data.data.reference;
        if (!reference) {
            return res.status(500).json({"error": "Something went wrong!"});
        }
        
        const newTransaction = new Transaction({
            transaction_id: reference,
            access_code,
            amount,
            user: userId,
        });
        
        newTransaction.save()
            .then(() => {
                return res.status(200).json(newTransaction);
            })
            .catch(err => {
                return res.status(500).json({error: err.message});
            });
    } catch (error) {
        console.error(error);
        return res.status(500).json({"message": "An error occurred"});
    }
};
