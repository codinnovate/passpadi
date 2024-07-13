import Colors from '@/constants/Colors';
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView , Pressable, TouchableOpacity} from 'react-native';
import ResultCard from './ResultCard';
import { style } from '@/constants/Styles';
import { WebView } from 'react-native-webview';
import {generateHtmlContent} from '@/utils/utils';

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
    <View style={styles.container}>
      <View>
      <Text style={styles.summaryText}>Summary</Text>
      <Text style={styles.scoreText}>You got {correctAnswers} out of {questions.length} questions</Text>
      <Text style={styles.scoreText}>Real Score: {calculateScore(correctAnswers, questionLength)} / 30</Text>
      </View>
{/* 
      <ScrollView>
      {questions.map((question, index) => (
        <View key={index} style={styles.questionContainer}>
          <Text style={styles.questionText}>{question.question}</Text>
          {question.options.map((option, idx) => (
            <View key={idx}>
              <Text
                style={{
                  color: userAnswers[index] === option && option !== question.answer ? 'red' : // Incorrect option chosen by user
                         option === question.answer ? 'green' : // Correct option
                         'black' // Other options
                }}
              >
                {option}
              </Text>
            </View>
          ))}
        </View>
      ))}
      </ScrollView> */}

      <ResultCard 
       questions={question}
       index={currentIndex} 
       total={questionLength}
       userAnswer={userAnswers[currentIndex]}
       />

{question?.answerDetail ? (
          <ScrollView contentContainerStyle={{ height: '100%', padding: 10, marginBottom: 50 }}>
            <View style={style.answerDetail}>
              <Text style={{ fontFamily: 'SpaceGM', color: Colors.black }}>Basic Explanation</Text>
              <WebView
                originWhitelist={['*']}
                source={{ html: generateHtmlContent(question?.answerDetail) }}
                style={{ flex: 1 }}
              />
            </View>
          </ScrollView>
        ) : (
          <Text style={{ fontFamily: 'Ubuntu', marginTop: 10, marginLeft: 10, color: Colors.green }}>
            {question?.answer} is the answer to this question
          </Text>
        )}
        
        <View style={style.buttonContainer}>
          <View style={style.buttonWrapper}>
            <Pressable
              style={style.back}
              onPress={handleBack}
            >
              <Text style={{ color: Colors.green, fontFamily: 'SpaceGM', fontSize: 20, fontWeight: 500, textAlign: 'center' }}>Back</Text>
            </Pressable>
              <TouchableOpacity
                style={style.next}
                onPress={handleNext}
              >
                <Text style={{ color: Colors.white, fontFamily: 'SpaceGM', fontSize: 20, fontWeight: 500, textAlign: 'center' }}>Next</Text>
              </TouchableOpacity>
            
          </View>
        </View>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width:'100%',
    padding: 20,
  },
  summaryText: {
    fontSize: 20,
    fontFamily:"Ubuntu",
    marginTop: 50,
    marginBottom: 10,

  },
  scoreText: {
    marginBottom: 10,
    backgroundColor:Colors.yellow,
    width:'100%',
    padding:10,
    borderRadius:15,
    height:50,
    shadowRadius:20,
    shadowColor:Colors.green,
    color:Colors.black,
    fontFamily:'Raleway',
    fontSize:20,
  },
  questionContainer: {
    marginVertical: 10,
  },
  questionText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default Result;
