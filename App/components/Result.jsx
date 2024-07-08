import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Result = ({ userAnswers, questions }) => {
  // Calculate the number of correct answers
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

  return (
    <View style={styles.container}>
      <Text style={styles.summaryText}>Summary</Text>
      <Text style={styles.scoreText}>Score: {correctAnswers}/{questions.length}</Text>

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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  summaryText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  scoreText: {
    marginBottom: 10,
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
