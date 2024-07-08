import axios from 'axios';
import { Transaction } from '../Schema/Transactions.js';
const baseUrl = "https://api.paystack.co/transaction";
import User from '../Schema/User.js';

export const VerifyTransaction = async (req, res) => {
    const userId = req.user;
    const reference = req.params.reference;
    if (reference) {
        try {
            const response = await axios.get(`${baseUrl}/verify/${reference}`, {
                headers: {
                    'Authorization': `Bearer sk_test_267518e236e93283c4b7aba71e85f37a4b630dc0`,
                    'Content-Type': 'application/json'
                }
            });

            const status = response.data.data.status;
            const amount = response.data.data.amount; // Assuming the amount is returned in the response

            if (status === 'success') {
                const existingTransaction = await Transaction.findOne({ transaction_id: reference });

                if (existingTransaction) {
                    if (existingTransaction.status === 'success' && existingTransaction.user === userId) {
                        return res.status(400).json({ error: "This transaction has already been successfully processed." });
                    }
                }

                const updatedTransaction = await Transaction.findOneAndUpdate(
                    { transaction_id: reference },
                    { status: status, amount: amount },
                    { new: true, upsert: true } // upsert will create the transaction if it doesn't exist
                );

                // Update user's points
                const transaction = await Transaction.findOne({ transaction_id: reference });
                if (transaction && transaction.user === userId) {
                    const user = await User.findById(transaction.user);
                    if (user) {
                        user.points += transaction.amount / 100; // Assuming 1 Naira = 1 point
                        const updatedUser = await user.save();
                        return res.status(200).json(updatedUser)

                    }else {
                        return res.status(500).json({ error: "Transaction not successful, wrong user made this transactions" });
                    }     
                  }

                return res.status(200).json(updatedTransaction);
            } else {
                return res.status(500).json({ error: "Transaction not successful" });
            }
        } catch (error) {
            console.error(error?.response?.data);
            res.status(500).json({ message: "An error occurred while verifying the transaction.", error: error.message });
        }
    } else {
        res.status(400).json({ message: "No reference provided. Are you sure the transaction was successful?" });
    }
};



export const initTransaction = async (req, res) => {
    const userId = req.user;
    const { amount, email } = req.body;
    if (email && amount){
    try {
        const response = await axios.post(`${baseUrl}/initialize`, { amount, email , callback_url:"http://localhost:5173/verify/"},
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
} else {
    return res.status(500).json({"message": "Please Provide the required details"});

}

};
