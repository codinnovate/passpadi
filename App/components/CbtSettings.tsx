// components/CBTSettings.js
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import { server } from '@/server';
import Colors from '@/constants/Colors';
import Button from './Button';
import { style } from '@/constants/Styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';


const CbtSettings = ({ startCBT }) => {
  const [time, setTime] = useState(30);
  const [mathQuestions, setMathQuestions] = useState(10);
  const [englishQuestions, setEnglishQuestions] = useState(20);
  const [generalPaperQuestions, setGeneralPaperQuestions] = useState(10);
  const [subjects, setSubjects] = useState(['mathematics', 'english', 'general-paper']);

  const totalQuestions = mathQuestions + englishQuestions + generalPaperQuestions;
  
  const handleStartCBT = () => {
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
  const [role, setRole] = useState('')
  // const {userAuth, userAuth:{ access_token, profile_img, username }} = useContext(UserContext);
  const getUser = async () => {
    const userRole = await AsyncStorage.getItem("role")
    setRole(userRole)
  }

  useEffect(() => {
    getUser();
    if(role === 'user'){
      Alert.alert("You Need to Pay just 1000Naira to take Cbt !!")
        router.back()
    }
  })
  const downloadQuestions = async () => {
    try {
      const subjects = ['mathematics', 'english', 'general-paper'];
      for (const subject of subjects) {
        const response = await axios.get(`${server}/questions/v1/${subject}`);
        const fileUri = `${FileSystem.documentDirectory}${subject}.json`;
        await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(response.data));
      }
      alert('Questions downloaded for offline use');
    } catch (error) {
      console.error(error);
      alert('Failed to download questions');
    }
  };

  return (
    <View style={styles.container}>
        <Text style={[style.label, {textAlign:'center', fontFamily:'Ubuntu', fontSize:20, }]}>Cbt Settings</Text>
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

      <Text style={[style.label, {backgroundColor:Colors.green, color:Colors.white, width:150, padding:5, borderRadius:10, textAlign:'center', fontSize:15}]}>Total Questions: {totalQuestions}</Text>
      <View style={{display:'flex', gap:10, marginTop:20}}>
      <Button 
       color={Colors.yellow}
       textColor={Colors.black}
       title="Start CBT" onPress={handleStartCBT} />
      <Button 
       title="Download Questions for Offline Use"
       onPress={downloadQuestions} />
      
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop:50,
  },

  input: {
    height: 40,
    borderColor: Colors.green,
    borderWidth: 2,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius:10,
  },
});

export default CbtSettings;
