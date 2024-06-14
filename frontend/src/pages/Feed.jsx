import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { serverApp } from '../../server';
import AnimationWrapper from '../common/page-animation';
import SubjectCard from '../components/SubjectCard';

const Feed = () => {
    const [subjects, setSubject] = useState('');
    const [questions, setQuestion] = useState('');
    
    const fetchSubject = async () => {
    try {
      const response = await axios.get(`${serverApp}/api/subjects/`);
        console.log(response.data)
        setSubject(response.data)
    } catch (error) {
      console.error('Error fetching subject:', error);
    }
    };
    const fetchQuestions = async () => {
        try {
          const response = await axios.get(`${serverApp}/api/questions/`);
            console.log(response.data)
            setQuestion(response.data)
        } catch (error) {
          console.error('Error fetching subject:', error);
        }
        };

    
    useEffect(() => {
        fetchSubject();
        fetchQuestions();
    },[])
    
    return (
        <div className='flex w-full flex-col'>
            <div className=''>
                <h3 className='font-gelasio'>Now Let's Start Studying with ease</h3>
                <p>We have all you need in one place and it's free 😀😋😍😎</p>
            </div>

            <div className='mt-5 w-full'>
                <AnimationWrapper className="flex gap-3">
                    {subjects && subjects.map((item) => (
                            <SubjectCard
                                key={item.subject_id}
                                id={item.subject_id}
                                name={item.name}
                            />
                        )
                    )}
                </AnimationWrapper>
            </div>
           
           <div className='w-full mt-3'>
            <AnimationWrapper>
                <div className='w-full flex flex-col gap-3'>
                {questions && questions.map((item, index) => (
                    <h4 className='font-gelasio text-xl'>{index + 1}.{item.question}</h4>
                )
            )}
            </div>
            </AnimationWrapper>
           </div>
           

        </div>
    )
}

export default Feed
