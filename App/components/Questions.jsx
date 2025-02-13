import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, TouchableOpacity } from 'react-native';
import Colors from '@/constants/Colors';
import Loader from './Loader';
import { WebView } from 'react-native-webview';
import { generateHtmlContent } from '@/utils/utils';

const Questions = ({ question, onAnswerClicked, index, total }) => {
  const [pressed, setPressed] = useState();
  const handleAnswer = (option) => {
    onAnswerClicked(option);
  };
 
  
  if(!question)
    return <Loader />
  const source = {
    html: question ? generateHtmlContent(question.question) : '<p>No question available</p>',
  };
  return (
    <View>
      <View style={styles.questionCard}>
        <View style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={{ fontFamily: 'Raleway' }}>Question {index + 1} of {total} </Text>
          <View style={{ backgroundColor: Colors.red, width: 40, display: 'flex', alignItems: 'center' }}>
            <Text style={{ fontFamily: 'SpaceGM', color: Colors.white }}>{question?.examYear}</Text>
          </View>
        </View>
        {question?.instruction && (
          <Text style={{ fontSize: 13, fontFamily: 'Raleway' }}>{question?.instruction}</Text>
        )}
        <View style={styles.webViewContainer}>
        <WebView
              originWhitelist={['*']}
              source={source}
              style={styles.text}
            />          
        </View>
        <View style={styles.questionOptions}>
          {question?.options.map((option, index) => (
            <TouchableOpacity
              onPress={() => {
                setPressed(true)
                handleAnswer(option)}
              }
              key={index}
              style={[styles.button]}
            >
               <View style={styles.webViewOption}>
                <WebView
                originWhitelist={['*']}
                source={{ html: generateHtmlContent(`${option}`) }}
                style={styles.text}
              />
          </View>
            </TouchableOpacity>
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
  webViewOption: {
    display:'flex',
    justifyContent: "center",
    height: 30,
    padding:0,
    backgroundColor:'transparent',
    width: '100%',
  },
  button: {
   
    width: '100%',
    padding: 10,
    paddingLeft:20,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: Colors.green,
    marginBottom: 10,
  },
  text: {
    color: Colors.green,
    fontSize: 15,
    marginBottom:0,
    fontFamily: 'Ubuntu',
    textAlign: 'center',
  },
});

export default Questions;
