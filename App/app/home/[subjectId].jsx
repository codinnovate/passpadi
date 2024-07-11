import { View, Text, SafeAreaView, StyleSheet, Pressable, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Colors from '@/constants/Colors';
import { server } from '@/server';
import axios from 'axios';
import { usePathname } from 'expo-router';
import { useWindowDimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import Loader from '@/components/Loader';
import * as FileSystem from 'expo-file-system';
import { style } from '@/constants/Styles';


const Subject = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const subjectId = usePathname();
  const subjectName = subjectId.split("/").pop();
  const [currentIndex, setCurrentIndex] = useState(0);
  const { width } = useWindowDimensions();
  const [selectedYear, setSelectedYear] = useState(2023);
  const [offlineAvailable, setOfflineAvailable] = useState(false);

  const handleYearChange = (year) => {
    setSelectedYear(year);
  };

  const checkOfflineData = async () => {
    const fileUri = `${FileSystem.documentDirectory}${subjectName}.json`;
    const fileInfo = await FileSystem.getInfoAsync(fileUri);
    setOfflineAvailable(fileInfo.exists);
    return fileInfo.exists;
  };

  const downloadOfflineData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${server}/questions/v1/${subjectName}`);
      const fileUri = `${FileSystem.documentDirectory}${subjectName}.json`;
      await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(response.data));
      setData(response.data);
      setFilteredData(response.data.filter((question) => question.examYear === selectedYear));
      setOfflineAvailable(true);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to download data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const loadOfflineData = async () => {
    const fileUri = `${FileSystem.documentDirectory}${subjectName}.json`;
    const jsonData = await FileSystem.readAsStringAsync(fileUri);
    const parsedData = JSON.parse(jsonData);
    setData(parsedData);
    setFilteredData(parsedData.filter((question) => question.examYear === selectedYear));
    setLoading(false);
  };

  const getQuestions = async () => {
    setLoading(true);
    if (await checkOfflineData()) {
      loadOfflineData();
    } else {
      Alert.alert(
        "Download Required",
        "You need to download the questions for offline use.",
        [
          { text: "Cancel", onPress: () => setLoading(false), style: "cancel" },
          { text: "Download", onPress: downloadOfflineData }
        ]
      );
    }
  };

  useEffect(() => {
    getQuestions();
  }, []);

  useEffect(() => {
    setFilteredData(data.filter((question) => question.examYear === selectedYear));
    setCurrentIndex(0);
  }, [selectedYear, data]);

  const handleNext = () => {
    if (currentIndex < filteredData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentIndex !== 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const question = filteredData[currentIndex];
  
  const generateHtmlContent = (content) => {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.13.13/dist/katex.min.css">
          <script defer src="https://cdn.jsdelivr.net/npm/katex@0.13.13/dist/katex.min.js"></script>
          <script defer src="https://cdn.jsdelivr.net/npm/katex@0.13.13/dist/contrib/auto-render.min.js"></script>
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
            body {
              zoom: 3.5; /* Adjust this value to make content larger or smaller */
            }
          </style>
        </head>
        <body>
          ${content}
        </body>
      </html>
    `;
  };

  const source = {
    html: question ? generateHtmlContent(question.question) : '<p>No question available</p>',
  };

  if (loading) return (
   <Loader  />
  );

  return (
    <SafeAreaView style={{ height: '100%', width: '100%' ,}}>
      <View style={{ height: '100%', width: '100%', position: 'relative', marginTop:40 }}>
        <Header
          title={subjectName}
          questionLength={filteredData?.length}
          selectedYear={selectedYear}
          onYearChange={handleYearChange}
        />
        <View style={styles.questionCard}>
          <View style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={{ fontFamily: 'Raleway' }}>Question {currentIndex + 1}</Text>
            <View style={{ backgroundColor: Colors.red, width: 40, display: 'flex', alignItems: 'center' }}>
              <Text style={{ fontFamily: 'SpaceGM', color: Colors.white }}>{question?.examYear}</Text>
            </View>
          </View>
          {question?.instruction && (
            <Text style={{ fontSize: 15, fontFamily: 'Raleway' }}>{question?.instruction}</Text>
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
              <Pressable
                key={index}
                style={[styles.button, option === question?.answer ? styles.clickedBtn : null]}
              >
                <Text style={styles.text}>{option}</Text>
              </Pressable>
            ))}
          </View>
        </View>
        
   {/* anwer details */}
        {question?.answerDetail ? (
          <ScrollView contentContainerStyle={{ height: '100%', padding: 10, marginBottom: 50 }}>
            <View style={styles.answerDetail}>
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
        <View style={styles.buttonContainer}>
          <View style={styles.buttonWrapper}>
            <Pressable
              style={styles.back}
              onPress={handleBack}
            >
              <Text style={{ color: Colors.green, fontFamily: 'SpaceGM', fontSize: 20, fontWeight: 500, textAlign: 'center' }}>Back</Text>
            </Pressable>
            {filteredData.length !== currentIndex && (
              <TouchableOpacity
                style={styles.next}
                onPress={handleNext}
              >
                <Text style={{ color: Colors.white, fontFamily: 'SpaceGM', fontSize: 20, fontWeight: 500, textAlign: 'center' }}>Next</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>


      </View>
    </SafeAreaView>
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
    gap: 10,
    marginTop: 10,
  },
  buttonContainer: {
    width: '100%',
    position: 'absolute',
    padding: 10,
    backgroundColor: Colors.white,
    bottom:'10%',
  },
  buttonWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: '100%',
    padding: 10,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: Colors.green,
  },
  clickedBtn: {
    backgroundColor: Colors.yellow,
  },
  back: {
    borderColor: Colors.green,
    borderWidth: 1,
    paddingVertical: 13,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  text: {
    color: Colors.green,
    fontSize: 23,
    fontFamily: 'Ubuntu',
    textAlign: 'center',
  },
  answerDetail: {
    marginTop: 25,
  },
  next: {
    backgroundColor: Colors.green,
    paddingVertical: 13,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  skip: {
    borderColor: Colors.green,
    borderWidth: 1,
    paddingVertical: 13,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
});

export default Subject;
