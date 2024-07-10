import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import { server } from '@/server';
import Button from './Button';
import Colors from '@/constants/Colors';
import Questions from './Questions';
import Results from './Result';
import { style } from '@/constants/Styles';
import { MaterialIcons } from '@expo/vector-icons';

const CbtPage = ({ settings }) => {
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
        // Fetch questions based on selected subjects from settings
        const subjects = Object.keys(settings.subjects);
        let fetchedQuestions = [];

        for (const subject of subjects) {
          const response = await axios.get(`${server}/questions/v1/${subject}`);
          const subjectQuestions = response.data;

          // Randomly select questions based on the number specified in settings
          const selectedQuestions = subjectQuestions.slice(0, settings.subjects[subject]);
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
    clearInterval(timerRef.current); // Stop the timer
  };

  return (
    <View style={styles.container}>
      {submitted ? (
        <Results userAnswers={userAnswers} questions={questions} />
      ) : (
        <>
          <View style={styles.header}>
            {!correctionsMode && (
              <View style={{display:"flex", justifyContent:'center', flexDirection:"row", alignItems:'center'}}>
              <MaterialIcons name="timer" size={24} color={Colors.green} />
              <Text style={[styles.label, {color:Colors.red, fontSize:15, fontFamily:'Ubuntu'}]}>
                {Math.floor(timer / 60)}:{timer % 60}
              </Text>
              </View>
            )}
            <Button
              width={200}
              color={Colors.red}
              title="Submit"
              onPress={handleSubmit}
              disabled={submitted}
            />
          </View>
          <Questions question={questions[currentIndex]} total ={questions.length} onAnswerClicked={handleNext} index={currentIndex} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop:20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    fontFamily: 'Raleway',
  },
});

export default CbtPage;
