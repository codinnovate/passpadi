import React, { useState } from 'react';
import ResultCard from './ResultCard';
import Button from './UI/Button';
import parse from 'html-react-parser';

const Result = ({ userAnswers, questions }) => {
const [currentIndex, setCurrentIndex ] = useState(0);


const correctAnswers = questions.reduce((totalCorrect, question, index) => {
    // Check if the user's answer matches the correct answer for each question
    const userAnswer = userAnswers[index];
    const correctAnswer = question.answer;

    if (userAnswer === correctAnswer) {
      return totalCorrect + 1; // Increment total correct answers
    } else {
      return totalCorrect;
    }
  }, 0);
  let questionLength = questions.length
  const calculateScore = (correctAnswers, questionLength) => {
    return (correctAnswers / questionLength) * 30;
}
  

const handleNext = () => {
  if (currentIndex < questionLength - 1) {
    setCurrentIndex(currentIndex + 1);
  }
};

const handleBack = () => {
  if (currentIndex !== 0) {
    setCurrentIndex(currentIndex - 1);
  }
};
const question = questions[currentIndex];

  return (
    <div className=''>
    <h2 className='mb-1 text-center'>Summary</h2>
      <div className='w-full rounded-3xl h-[6em] bg-[#b8ff8c] flex justify-between p-5'>
      <div className=''>
      <h2 className='text-2xl'>Unilag Real Score: </h2>
      <h1 className='text-black/70 font-semibold'>You got {correctAnswers} out of {questions.length} questions</h1>
        </div>
        <div className='h-full w-[7em] bg-white rounded-3xl  flex items-center justify-center'>
          <h2 className='text-center text-xl ubuntu-semibold'>
        {calculateScore(correctAnswers, questionLength).toFixed(1)} / 30
          </h2>
        </div>
      </div>
{/* 
      <Scrolldiv>
      {questions.map((question, index) => (
        <div key={index} style={styles.questionContainer}>
          <Text style={styles.questionText}>{question.question}</Text>
          {question.options.map((option, idx) => (
            <div key={idx}>
              <Text
                style={{
                  color: userAnswers[index] === option && option !== question.answer ? 'red' : // Incorrect option chosen by user
                         option === question.answer ? 'green' : // Correct option
                         'black' // Other options
                }}
              >
                {option}
              </Text>
            </div>
          ))}
        </div>
      ))}
      </Scrolldiv> */}

      <ResultCard 
       questions={question}
       index={currentIndex} 
       total={questionLength}
       userAnswer={userAnswers[currentIndex]}
       />

        {question?.answerDetail ? (
          <div className=''>
          <div className=''>
            <h1 className='font-semibold'>Basic Explanation</h1>

              <h1>
              {parse(`${question?.answerDetail}`)}
              </h1>

            </div>
          </div>
        ) : (
          <h1 className='my-3  font-medium'>
            {question?.answer} is the answer to this question
          </h1>
        )}
        


        <div className='flex justify-between gap-5'>
            <Button
              onClick={handleBack}
              title="BacK"
              

            />
              <Button
                onClick={handleNext}
                title='Next'
              />

        </div>
        </div>
  );
};


export default Result;
