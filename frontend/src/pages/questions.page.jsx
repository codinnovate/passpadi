import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { serverApp } from '../../server';
import Loader from '../components/loader.component';
import AnimationWrapper from '../common/page-animation';
import parse from 'html-react-parser';
import { UserContext } from '../App';



const Questions = () => {
    const {userAuth:{role}} = useContext(UserContext)
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
        <div className="max-w-5xl mx-auto bg-white w-full p-2">
            <div className='flex justify-between w-full'>
            <h1 className="text-2xl capitalize ubuntu-regular  mb-4">{subject} Past Questions ({questions?.length})</h1>
            <span className='flex items-center justify-center bg-black/10 w-8 h-8 rounded-full p-2'>
            <i className="fi fi-rr-filter"></i>
            </span>
            </div>
            {loading ? <Loader /> : (

                questions && questions.map((question, index) => (
                    <AnimationWrapper key={question._id}  className="border-b border-grey mb-5">
                        <div className="flex  flex-col">
                            <h3 className='text-sm font-bold underline'>
                                <i>
                                    {question?.instruction}
                                </i>
                            </h3>
                        <h2 className="text-xl flex mt-3 ubuntu-regular font-medium">{index + 1}.{parse(`${question.question}`)}
  </h2>
                        <div className='flex flex-wrap gap-2'>
                            {question.options.map((option, index) => (
                                    <div className='flex gap-2'>
                                    <h1 className='font-bold'>{optionLabels[index]}. </h1><p className="ubuntu-regular" key={index}>{option}</p>
                                    </div>
                            ))}
                        </div>
                         <div className='w-full flex items-center my-3 justify-between'>
                                <Link to={`${question._id}`}
                                    className='border bg-black border-grey rounded-2xl p-2'>
                                        <p className='text-sm text-white ubuntu-medium'>View Answer</p>
                                </Link>
                                {role =='admin' || 'superadmin' && (
                                <Link to={`${question._id}/edit-question`} className='link'>
                                Edit Question
                                </Link>
                                )}
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
