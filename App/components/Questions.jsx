import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Colors from '@/constants/Colors';
import Loader from './Loader';

const Questions = ({ question, onAnswerClicked }) => {
  const handleAnswer = (option) => {
    onAnswerClicked(option);
  };

  if(!question)
    return <Loader />

  return (
    <View>
      <View style={styles.questionCard}>
        <View style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={{ fontFamily: 'Raleway' }}>Question {}</Text>
          <View style={{ backgroundColor: Colors.red, width: 40, display: 'flex', alignItems: 'center' }}>
            <Text style={{ fontFamily: 'SpaceGM', color: Colors.white }}>{question?.examYear}</Text>
          </View>
        </View>
        {question?.instruction && (
          <Text style={{ fontSize: 13, fontFamily: 'Raleway' }}>{question?.instruction}</Text>
        )}
        <View style={styles.webViewContainer}>
          <Text>{question?.question}</Text>
        </View>
        <View style={styles.questionOptions}>
          {question?.options.map((option, index) => (
            <Pressable
              onPress={() => handleAnswer(option)}
              key={index}
              style={[styles.button]}
            >
              <Text style={styles.text}>{option}</Text>
            </Pressable>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  questionCard: {
    marginTop: 30,
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 30,
  },
  webViewContainer: {
    height: 200,
    width: '100%',
    marginTop: 10,
  },
  questionOptions: {
    marginTop: 10,
  },
  button: {
    width: '100%',
    padding: 10,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: Colors.green,
    marginBottom: 10,
  },
  text: {
    color: Colors.green,
    fontSize: 23,
    fontFamily: 'Ubuntu',
    textAlign: 'center',
  },
});

export default Questions;
