import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { serverApp } from '../../../server';
import { UserContext } from '../../App';

const AdminTransactionsPage = () => {
  let { userAuth: { access_token } } = useContext(UserContext)
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await axios.get(`${serverApp}/transactions`, {
          headers: {
            'Authorization': `Bearer ${access_token}`
        }
        });
        setTransactions(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div>
      <h1>Transactions</h1>
      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Status</th>
            <th>Transaction ID</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction._id}>
              <td>{transaction.userId}</td>
              <td>{transaction.status}</td>
              <td>{transaction._id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTransactionsPage;
