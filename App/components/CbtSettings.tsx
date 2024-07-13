import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { server } from '@/server';
import Colors from '@/constants/Colors';
import Button from './Button';
import { style } from '@/constants/Styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import axios from 'axios';


const subjectsList = ['mathematics', 'english', 'general-paper'];

const CbtSettings = ({ startCBT }) => {
  const [time, setTime] = useState(30);
  const [mathQuestions, setMathQuestions] = useState(10);
  const [englishQuestions, setEnglishQuestions] = useState(20);
  const [generalPaperQuestions, setGeneralPaperQuestions] = useState(10);
  const [isQuestionsDownloaded, setIsQuestionsDownloaded] = useState(false);
  const [role, setRole] = useState('');

  const totalQuestions = mathQuestions + englishQuestions + generalPaperQuestions;

  useEffect(() => {
    checkDownloadedQuestions();
    getUser();
    if (role === 'user') {
      Alert.alert("You Need to Pay just 1000Naira to take CBT !!");
      router.back();
    }
  }, [role]);

  const getUser = async () => {
    const userRole = await AsyncStorage.getItem("role");
    setRole(userRole);
  };

  const checkDownloadedQuestions = async () => {
    try {
      for (const subject of subjectsList) {
        const fileUri = `${FileSystem.documentDirectory}${subject}.json`;
        const fileInfo = await FileSystem.getInfoAsync(fileUri);
        if (!fileInfo.exists) {
          setIsQuestionsDownloaded(false);
          return;
        }
      }
      setIsQuestionsDownloaded(true);
    } catch (error) {
      console.error("Error checking downloaded questions", error);
    }
  };

  const downloadQuestions = async () => {
    try {
      for (const subject of subjectsList) {
        const response = await axios.get(`${server}/questions/v1/${subject}`);
        const fileUri = `${FileSystem.documentDirectory}${subject}.json`;
        await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(response.data));
      }
      setIsQuestionsDownloaded(true);
      alert('Questions downloaded for offline use');
    } catch (error) {
      console.error("Error downloading questions", error);
      alert('Failed to download questions');
    }
  };

  const handleStartCBT = () => {
    if (!isQuestionsDownloaded) {
      Alert.alert('Error', 'Please download questions before starting the CBT.');
      return;
    }

    const settings = {
      time,
      subjects: {
        mathematics: mathQuestions,
        english: englishQuestions,
        'general-paper': generalPaperQuestions,
      },
    };
    startCBT(settings);
  };

  return (
    <View style={styles.container}>
      <Text style={[style.label, { textAlign: 'center', fontFamily: 'Ubuntu', fontSize: 20 }]}>CBT Settings</Text>
      <Text style={style.label}>Set Time (minutes):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={String(time)}
        onChangeText={(text) => setTime(Number(text))}
      />

      <Text style={style.label}>Mathematics Questions:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={String(mathQuestions)}
        onChangeText={(text) => setMathQuestions(Number(text))}
      />

      <Text style={style.label}>English Questions:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={String(englishQuestions)}
        onChangeText={(text) => setEnglishQuestions(Number(text))}
      />

      <Text style={style.label}>General Paper Questions:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={String(generalPaperQuestions)}
        onChangeText={(text) => setGeneralPaperQuestions(Number(text))}
      />

      <Text style={[style.label, { backgroundColor: Colors.green, color: Colors.white, width: 150, padding: 5, borderRadius: 10, textAlign: 'center', fontSize: 15 }]}>
        Total Questions: {totalQuestions}
      </Text>
      <View style={{ display: 'flex', gap: 10, marginTop: 20 }}>
        <Button 
          color={Colors.yellow}
          textColor={Colors.black}
          title="Start CBT" 
          onPress={handleStartCBT} 
        />
        {!isQuestionsDownloaded && (
          <Button 
            title="Download Questions for Offline Use"
            onPress={downloadQuestions} 
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 50,
  },
  input: {
    height: 40,
    borderColor: Colors.green,
    borderWidth: 2,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 10,
  },
});

export default CbtSettings;
