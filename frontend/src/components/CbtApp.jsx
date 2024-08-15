import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Button from '../components/UI/Button';
import Questions from './QCard';
import Results from './Result';
import { serverApp } from '../../server';


const CbtApp = ({ settings }) => {
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timer, setTimer] = useState(settings.time * 60 + 10);
  const [submitted, setSubmitted] = useState(false);
  const [correctionsMode, setCorrectionsMode] = useState(false);
  const timerRef = useRef();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const subjects = Object.keys(settings.subjects);
        let fetchedQuestions = [];

        for (const subject of subjects) {
          const response = await axios.get(`${serverApp}/questions/v1/${subject}`);
          const subjectQuestions = response.data;

          // Randomly select questions based on the number specified in settings
          const selectedQuestions = getRandomQuestions(subjectQuestions, settings.subjects[subject]);
          fetchedQuestions = [...fetchedQuestions, ...selectedQuestions];
        }

        // Randomize fetched questions
        const randomizedQuestions = shuffleArray(fetchedQuestions);
        setQuestions(randomizedQuestions);
      } catch (error) {
        console.error(error);
      }
    };

    fetchQuestions();

    timerRef.current = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, []);


  useEffect(() => {
    if (timer === 0) {
      handleSubmit();
    }
  }, [timer]);

  const shuffleArray = (array) => {
    // Implementation of Fisher-Yates shuffle algorithm
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const getRandomQuestions = (questions, count) => {
    // Create a shallow copy of the array to avoid mutating the original
    const shuffledQuestions = [...questions];
    // Shuffle the copied array
    shuffleArray(shuffledQuestions);
    // Return the requested number of questions
    return shuffledQuestions.slice(0, count);
  };


  const handleNext = (option) => {
    setUserAnswers([...userAnswers, option]);
    if (currentIndex === questions.length - 1) {
      handleSubmit();
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setCorrectionsMode(true);
    clearInterval(timerRef.current);
  };

  return (
    <div className="max-w-4xl mx-auto p-5 mt-5">
      {submitted ? (
        <Results userAnswers={userAnswers} questions={questions} />
      ) : (
        <>
          <div className="flex justify-between w-full items-center space-x-4 mb-5">
            {!correctionsMode && (
              <div className="flex justify-center items-center">
               <span>
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="13" r="9" stroke="#141B34" stroke-width="1.5" stroke-linecap="round"/>
              <path d="M5 19L3 21M19 19L21 21" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M19 3.5697L19.5955 3.27195C20.4408 2.84932 20.7583 2.89769 21.4303 3.5697C22.1023 4.2417 22.1507 4.55924 21.728 5.4045L21.4303 6M5 3.5697L4.4045 3.27195C3.55924 2.84932 3.2417 2.89769 2.5697 3.5697C1.89769 4.2417 1.84932 4.55924 2.27195 5.4045L2.5697 6" stroke="#141B34" stroke-width="1.5" stroke-linecap="round"/>
              <path d="M12 9.5V13.5L14 15.5" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12 3.5V2" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M10 2H14" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
               </span>
                <p className="text-red-500 text-lg font-bold ml-2">
                  {Math.floor(timer / 60)}:{timer % 60 < 10 ? `0${timer % 60}` : timer % 60}
                </p>
              </div>
            )}
            <Button
              bgColor="red"
              textColor="white"
              title="Submit"
              onClick={handleSubmit}
              disabled={submitted}
            />
          </div>
          <Questions
            question={questions[currentIndex]}
            total={questions.length}
            onAnswerClicked={handleNext}
            index={currentIndex}
          />
        </>
      )}
    </div>
  );
};

export default CbtApp;

