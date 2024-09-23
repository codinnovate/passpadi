import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, TouchableOpacity } from 'react-native';
import Colors from '@/constants/Colors';
import Loader from './Loader';
import { WebView } from 'react-native-webview';

const ResultCard = ({ questions, index, total, userAnswer}) => {


  const generateHtmlContent = (content) => {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.13.13/dist/katex.min.css">
            <script>
            document.addEventListener("DOMContentLoaded", function() {
              renderMathInElement(document.body, {
                delimiters: [
                  {left: "$$", right: "$$", display: true},
                  {left: "$", right: "$", display: false}
                ]
              });
            });
          </script>
          <style>
            
            *{
                font-family: 'SpaceGM', sans-serif;
                font-size: 40px;
                font-weight: 500;
              }
          </style>
        </head>
        <body>
          ${content}
        </body>
      </html>
    `;
  };
  if(!questions)
    return <Loader />
  const source = {
    html: questions ? generateHtmlContent(questions?.question) : '<p>No question available</p>',
  };
  return (
      <View style={styles.questionCard}>
        <View style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={{ fontFamily: 'Raleway' }}>Question {index + 1} of {total} </Text>
          <View style={{ backgroundColor: Colors.red, width: 40, display: 'flex', alignItems: 'center' }}>
            <Text style={{ fontFamily: 'SpaceGM', color: Colors.white }}>{questions?.examYear}</Text>
          </View>
        </View>
        {questions?.instruction && (
          <Text style={{ fontSize: 13, fontFamily: 'Raleway' }}>{questions?.instruction}</Text>
        )}
        <View style={styles.webViewContainer}>
        <WebView
              originWhitelist={['*']}
              source={source}
              style={styles.text}
            />          
        </View>
        <View style={styles.questionOptions}>
          {questions?.options.map((option, index) => (
            <Pressable
             
              key={index}
              style={[{
                backgroundColor: userAnswer === option && option !== questions.answer ? 'red' : // Incorrect option chosen by user
                       option === questions.answer ? Colors.yellow : 'white' // Other options
              }, styles.button]}
            >
              <View style={styles.webViewOption}>
                <WebView
                originWhitelist={['*']}
                source={{ html: generateHtmlContent(`${option}`) }}
                style={styles.text}
              />
          </View>
            </Pressable>
          ))}
        </View>

        {/* buttons for previous and next */}
        
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
  webViewOption: {
    display:'flex',
    justifyContent: "center",
    height: 30,
    padding:0,
    backgroundColor:'transparent',
    width: '100%',
  },
  webViewContainer: {
    height: 100,
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
    color: Colors.black,
    backgroundColor:'transparent',
    fontSize: 15,
    fontFamily: 'Ubuntu',
    textAlign: 'center',
  },
});

export default ResultCard;
