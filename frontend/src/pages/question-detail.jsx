import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { serverApp } from '../../server';
import toast, { Toaster } from 'react-hot-toast';
import Loader from '../components/loader.component';
import AnimationWrapper from '../common/page-animation';

const QuestionDetailPage = () => {
    const { question_id } = useParams();
    const [question, setQuestion] = useState('')
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`${serverApp}/questions/one/${question_id}`)
            .then(res => {
                setQuestion(res.data)
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

        <div className='mx-auto w-full flex max-w-5xl p-2'>
            <Toaster />

            <div className='flex flex-col gap-2 mt-[2em]'>
                <h1 className='text-black text-3xl font-semibold '>{question?.question}</h1>
                <div className='flex flex-wrap gap-2'>
                    <button className='bg-purple text-white font-medium p-1 rounded-2xl rounded-tl-3xl'>{question?.examType}</button>
                    <button className='bg-grey text-bold font-medium p-1 rounded-2xl rounded-tl-3xl'>{question?.examYear}</button>
                    <button className='bg-red text-white font-medium p-1 rounded-2xl rounded-tl-3xl'>{question?.subject?.name}</button>
                    <button className='bg-yellow text-black font-medium p-1 rounded-2xl rounded-tl-3xl'>{question?.school?.name}</button>

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
                        <span className='font-semibold'>{option}</span>
                    </div>
                </button>
                ))}
            </div>
            </div>
        </div>
    </AnimationWrapper>
    )
}

export default QuestionDetailPage
