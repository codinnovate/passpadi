import React from 'react'
import { useParams } from 'react-router-dom'

const Transactions = () => {
    const param = useParams();
    return (
        <div>
            {param}
        </div>
    )
}

export default Transactions
