import React from 'react'
import { useParams } from 'react-router-dom'

const CreateQuestion = () => {

    const { params } = useParams();
    return (
        <div>
            <h1>{params}</h1>
        </div>
    )
}

export default CreateQuestion
