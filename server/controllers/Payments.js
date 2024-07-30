import axios from 'axios';
import { Transaction } from '../Schema/Transactions.js';
const baseUrl = "https://api.paystack.co/transaction";
import User from '../Schema/User.js';

const PAYSTACK_SECRET_KEY = 'sk_test_267518e236e93283c4b7aba71e85f37a4b630dc0';

export const verifyTransaction = async (req, res) => {
    const { reference } = req.body;
    const userId = req.user;

    if(!reference){
        console.log('No reference found')
    }

    try {
        const response = await axios.get(`${baseUrl}/verify/${reference}`, {
            headers: {
                Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`
            }
        });

        const { status, data } = response.data;

        if (status) {
            const { reference, amount, customer, status: transactionStatus } = data;
            console.log(data)

            if (transactionStatus === 'success') {
                const existingTransaction = await Transaction.findOne({ transaction_id: reference });  
                if (existingTransaction && existingTransaction.status === 'success' && existingTransaction.user.toString() === userId) {
                    return res.status(400).json({ error: "This transaction has already been successfully processed." });
                }

                await Transaction.findOneAndUpdate(
                    { transaction_id: reference },
                    { status: transactionStatus, amount: amount, user: userId },
                    { new: true, upsert: true } // upsert will create the transaction if it doesn't exist
                );

                // Update user's points and role
                const user = await User.findById(userId);
                if (user) {
                    // Assuming 1 Naira = 1 point
                    // user.points += amount / 100;
                    user.role == 'paidUser';
                    await user.save();
                }

                return res.status(200).json({ message: 'Transaction processed successfully' });
            } else {
                return res.status(400).json({ error: 'Transaction not successful' });
            }
        } else {
            return res.status(400).json({ error: 'Transaction verification failed' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while verifying the transaction.' });
    }
}


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


export const getTransactions = async (req, res) => {
    const userId = req.user;
    // const userRole = req.userRole;
    // console.log(userRole)
    
    try {
        const transactions = await Transaction.find()
        .sort({ createdAt: -1 })
        .populate('user')
        return res.json(transactions).status(201)

    } catch (error) {
        console.log(error)
        return res.json("Something went wrong!")
        
    }


}