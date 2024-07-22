import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Button from './Button';
import Questions from './Questions';
import Results from './Result';
import { MaterialIcons } from 'react-icons/md';
import { serverApp } from '../../server';


const CbtApp = ({ settings }) => {
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timer, setTimer] = useState(settings.time * 60 + 6);
  const [submitted, setSubmitted] = useState(false);
  const [correctionsMode, setCorrectionsMode] = useState(false);
  const timerRef = useRef();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const subjects = Object.keys(settings.subjects);
        let fetchedQuestions = [];

        for (const subject of subjects) {
          const response = await axios.get(`${server}/questions/v1/${subject}`);
          const subjectQuestions = response.data;

          const selectedQuestions = subjectQuestions.slice(0, settings.subjects[subject]);
          fetchedQuestions = [...fetchedQuestions, ...selectedQuestions];
        }

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
  }, [settings]);

  useEffect(() => {
    if (timer === 0) {
      handleSubmit();
    }
  }, [timer]);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
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
    <div className="p-5 mt-5">
      {submitted ? (
        <Results userAnswers={userAnswers} questions={questions} />
      ) : (
        <>
          <div className="flex justify-between items-center mb-5">
            {!correctionsMode && (
              <div className="flex justify-center items-center">
                <MaterialIcons name="timer" size={24} className="text-green-500" />
                <p className="text-red-500 text-lg font-bold ml-2">
                  {Math.floor(timer / 60)}:{timer % 60 < 10 ? `0${timer % 60}` : timer % 60}
                </p>
              </div>
            )}
            <Button
              width={200}
              color="bg-red-500"
              textColor="text-white"
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
