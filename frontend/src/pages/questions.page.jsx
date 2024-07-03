import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { serverApp } from '../../server';
import Loader from '../components/loader.component';
import AnimationWrapper from '../common/page-animation';
import parse from 'html-react-parser';



const Questions = () => {
    const {subject} = useParams();
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // const fetchId = async () => {
    //     try {
    //         const response = await axios.get(`${serverApp}/subjects/${subject}`);
    //         setSubjectId(response.data._id)
    //     } catch (error) {
    //         console.error(error)
    //     }
    // }
    useEffect(() => {
                    axios.get(`${serverApp}/questions/v1/${subject}`)
                        .then(res => {
                            setLoading(false)
                            setQuestions(res.data);
                            console.log(res)
                    })
                        .catch(err => {
                            setLoading(false)
                            console.log(err)
                            setError(err.response ? err.response.data.error : 'An error occurred')
                        }) 
        
    }, []);

    if (error) return <div>{error}</div>;
    const optionLabels = ['A', 'B', 'C', 'D', 'E', 'F'];

    return (
        <div className="max-w-5xl mx-auto bg-white w-full">
            <h1 className="text-2xl capitalize  mb-4">{subject} Past Questions</h1>
            {loading ? <Loader /> : (

                questions && questions.map((question, index) => (
                    <AnimationWrapper key={question._id}  className="border-b border-grey mb-5">
                        <div className="flex  flex-col">
                            <h3 className='text-sm font-bold underline'>
                                <i>
                                    {question?.instruction}
                                </i>
                            </h3>
                        <h2 className="text-xl font-medium">{index + 1}.{parse(`${question.question}`)}
  </h2>
                        <div className='flex flex-wrap gap-2'>
                            {question.options.map((option, index) => (
                                    <div className='flex gap-2'>
                                    <span className='font-bold '>{optionLabels[index]}. </span><p key={index}>{option}</p>
                                    </div>
                            ))}
                        </div>
                         <div className='w-full flex items-center my-3 justify-between'>
                                <Link to={`${question._id}`}
                                    className='border bg-black border-grey rounded-md p-2'>
                                        <p className='text-sm text-white font-medium'>View Answer</p>
                                </Link>
                                <Link to={`${question._id}/edit-question`} className='link'>
                                Edit Question
                                </Link>
                                <span className='bg-green p-1 text-white flex items-center rounded-tl-2xl  rounded'>
                                    {question.examType}
                                    <span className='ml-3'>{question.examYear}</span>
                                </span>
                            </div>

                        
                        </div>
                        </AnimationWrapper>

                ))
            )}
        </div>
    );
};

export default Questions;
