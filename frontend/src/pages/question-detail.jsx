import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { serverApp } from '../../server';
import toast, { Toaster } from 'react-hot-toast';
import Loader from '../components/loader.component';
import AnimationWrapper from '../common/page-animation';
import Seo from '../components/Seo';
import parse from 'html-react-parser';


const QuestionDetailPage = () => {
    const { question_id } = useParams();
    const [question, setQuestion] = useState('')
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`${serverApp}/questions/one/${question_id}`)
            .then(res => {
                setQuestion(res.data)
                console.log(res.data)
                setLoading(false)
                })
                .catch(err => {
                    console.log(err)
                    setLoading(false)
                })

    }, [])
    const { options, answer } = question;
    if(loading) return <Loader />
    return (
        <AnimationWrapper>
        <Seo 
        title={question.title}
        des ={question.question}
        blogId={question.question_id}
        
        />
        <div className='mx-auto w-full flex max-w-5xl p-2'>
            <Toaster />

                <div className='flex flex-col gap-2 mt-[2em]'>
                    <h3 className='text-sm'>
                        <span className='font-bold'>
                        {question?.instruction && 'Instruction:'}
                    
                        </span>
                     <i className='underline font-medium'>
                         {question?.instruction}
                     </i>
                    </h3>
                    <h1 className='text-black text-3xl font-semibold '>{parse(`${question.question}`)}</h1>
                    <div className='flex items-center justify-between'>
                <div className='flex flex-wrap gap-2'>
                    <button className='bg-purple text-white font-medium p-1 rounded-2xl rounded-tl-3xl'>{question?.examType}</button>
                    <button className='bg-grey text-bold font-medium p-1 rounded-2xl rounded-tl-3xl'>{question?.examYear}</button>
                            <button className='bg-red text-white font-medium p-1 rounded-2xl rounded-tl-3xl'>{question?.subject?.name}</button>
                            {question.school ? (
                                <button className='bg-yellow text-black font-medium p-1 rounded-2xl rounded-tl-3xl'>{ question.school.name}</button>
                            ) : null}
                        </div>
                    {/* <Link to={`/edit-question/${question._id}`} className='text-xl underline font-semibold'>Edit</Link> */}
                    </div>
            <div className="grid grid-cols-1 gap-4 mt-[4em] max-w-[30em]">
                {options && options.map((option, index) => (
                    <button
                    key={index}
                    className={`p-1 flex item-center border border-grey rounded-2xl ${
                        option === answer ? ' bg-green ring-[#38ef7d] text-white' : ' ring-red'
                        }`}
                        >   
                        <div className='flex gap-3 items-center ml-2'>
                            <span className='text-2xl font-bold'>
                            {String.fromCharCode(65 + index)}
                            </span>
                        <span className='font-semibold'> {parse(`${option}`)}</span>
                    </div>
                </button>
                ))}
            </div>
            {question.answerDetail && (
            <div className='mt-[4em]'>
                <h1 className='text-2xl font-semibold'>Answer Detail</h1>
                <p className='font-medium text-xl'>{parse(`${question.answerDetail}`)}</p>
            </div>
            )}
            </div>
        </div>
    </AnimationWrapper>
    )
}

export default QuestionDetailPage
