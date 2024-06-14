import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { serverApp } from '../../server';
import Loader from '../components/loader.component';

const Questions = () => {
    const { subject} = useParams();
    const [subjectId, setSubjectId] = useState('')
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchId = async () => {
        try {
            const response = await axios.get(`${serverApp}/api/subjects/${subject}`);
            setSubjectId(response.data._id)
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        fetchId();
        const fetchQuestions = async () => {
            if(subjectId){
                try {
                    const response = await axios.get(`${serverApp}/api/questions/${subjectId}`);
                    setQuestions(response.data);
                } catch (err) {
                    setError(err.response ? err.response.data.error : 'An error occurred');
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchQuestions();
    }, [subject]);

    if (loading) return <Loader />;
    if (error) return <div>{error}</div>;
    const optionLabels = ['A', 'B', 'C', 'D', 'E', 'F'];

    return (
        <div className="max-w-5xl mx-auto bg-white w-full">
            <h1 className="text-2xl capitalize  mb-4">{subject} Past Questions</h1>
            {questions.length > 0 ? (
                questions.map((question, index) => (
                    <div key={question._id} className="mb-4">
                        <h2 className="text-xl font-medium">{index + 1}. {question.question}</h2>
                        <ul>
                            {question.options.map((option, index) => (
                                <div className='flex gap-2'>
                                <span className='font-bold '>{optionLabels[index]}. </span><li key={index}>{option}</li>
                                </div>
                            ))}
                        </ul>
                    </div>
                ))
            ) : (
                <p>No questions found for this subject.</p>
            )}
        </div>
    );
};

export default Questions;
