import React, { useState } from 'react';
import Loader from './loader.component';
import Button from './UI/Button';
import parse from 'html-react-parser';

const ResultCard = ({ questions, index, total, userAnswer}) => {


  if(!questions)
 return <Loader />

  return (
      <div className='mt-5 p-5 rounded-3xl'>
        <div className='w-full flex items-center justify-between'>
          <h1 className='font-semibold'>Question {index + 1} of {total} </h1>
            <h1 className='font-semibold bg-yellow px-4 rounded-full '>{questions?.examYear}</h1>
        </div>
        {questions?.instruction && (
          <h1 className='text-xl '>{questions?.instruction}</h1>
        )}
        <div className='mb-3 w-full mt-10'>
        <h2 className="text-xl flex mt-3 ubuntu-regular font-medium">{parse(`${questions?.question}`)}</h2>
        </div>
        <div className='flex flex-col gap-2'>
          {questions?.options.map((option, index) => (
            <Button
             title={option}
              key={index}
              className={userAnswer === option && option !== questions.answer ? 'bg-red' : option === questions.answer ? 'bg-green' : 'bg-white'}
            //   className={
            //     backgroundColor: userAnswer === option && option !== questions.answer ? 'red' : // Incorrect option chosen by user
            //            option === questions.answer ? Colors.yellow : 'white' // Other options
              
            />
          ))}
        </div>

        {/* buttons for previous and next */}
        
      </div>
  );
};

export default ResultCard;
