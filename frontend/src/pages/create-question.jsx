import React from 'react'
import { useParams } from 'react-router-dom'

const CreateQuestion = () => {

    const { subject } = useParams();
    return (
        <div>
            <h1>{subject}</h1>
        </div>
    )
}

export default CreateQuestion
