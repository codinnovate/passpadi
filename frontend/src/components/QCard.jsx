import React, { useState } from 'react'
import Button from './UI/Button';
import Loader from './loader.component';
import parse from 'html-react-parser';


const Questions = ({ question, onAnswerClicked, index, total }) => {
  const [pressed, setPressed] = useState();
  const handleAnswer = (option) => {
    onAnswerClicked(option);
  };

  if(!question)
    return <Loader />;
  return (
    <div>
      <div className='mt-5 bg-white p-5 rounded-3xl'>
        <div className='w-full flex flex-row items-center justify-between'>
          <h1 className='font-semibold'>Question {index + 1} of {total} </h1>
          <div className='bg-gray-300 w-[50px] text-center rounded-2xl'>
            <h2 className='text-xl '>{question?.examYear}</h2>
          </div>
        </div>
        {question?.instruction && (
          <h2 className='text-xl'>{question?.instruction}</h2>
        )}
        <div className='w-full h-[100px] rounded-md'>
         <h2 className="text-xl flex mt-3 ubuntu-regular font-medium">{parse(`${question.question}`)}</h2>
        </div>
        <div className='mt-2.5 flex flex-col gap-2'>
          {question?.options.map((option, index) => (
            <Button
              hover='border-green'
              onClick={() => {
                setPressed(true)
                handleAnswer(option)}
              }
              key={index}
              title={option}
              
           />
          ))}
        </div>
      </div>
    </div>
  );
};


export default Questions
