import React, { useState } from 'react';
import { View, Text, SafeAreaView, Button, TextInput, StyleSheet, Pressable } from 'react-native';
import axios from 'axios';
import { server } from '@/server';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';


const Cbt = () => {
  const [settings, setSettings] = useState(true);
  const [selectedTab, setSelectedTab] = useState('Math');
  const [subjects, setSubjects] = useState({
    math: 10,
    generalPaper: 10,
    english: 20,
  });
  const [questions, setQuestions] = useState({
    math: [],
    generalPaper: [],
    english: [],
  });
  const [loading, setLoading] = useState(false);

  const handleStartTest = async () => {
    setSettings(false);
    setLoading(true);

    try {
      // Fetch questions for each subject
      const mathQuestions = await fetchQuestions('questions/v1/mathematics', subjects.math);
      const generalPaperQuestions = await fetchQuestions('questions/v1/general-paper', subjects.generalPaper);
      const englishQuestions = await fetchQuestions('questions/v1/english', subjects.english);

      // Update state with fetched questions
      setQuestions({
        math: mathQuestions,
        generalPaper: generalPaperQuestions,
        english: englishQuestions,
      });
    } catch (error) {
      console.error('Error fetching questions:', error);
    } finally {
      setLoading(false);
    }
  };
  const handleTabPress = (tabName) => {
    setSelectedTab(tabName);
    // Fetch questions for the selected tab
    switch (tabName) {
      case 'Math':
        fetchMathQuestions();
        break;
      case 'General Paper':
        fetchGeneralPaperQuestions();
        break;
      case 'English':
        fetchEnglishQuestions();
        break;
      default:
        break;
    }
  };
  const fetchQuestions = async (apiUrl, count) => {
    try {
      const response = await axios.get(`${server}/${apiUrl}`);
      const randomizedQuestions = response.data;

      // Randomly select `count` number of questions
      const selectedQuestions = randomizedQuestions.slice(0, count);

      return selectedQuestions;
    } catch (error) {
      console.error('Error fetching questions:', error);
      return [];
    }
  };

  const handleSettingsChange = () => {
    setSettings(true);
    setQuestions({
      math: [],
      generalPaper: [],
      english: [],
    });
  };

  return (
    <SafeAreaView style={{height:'100%', width:'100%', }}>
      {settings ? (
        <View style={{width:'100%', padding:10,}}>
          <Text style={{color:Colors.green ,fontSize:20, textAlign:'center', fontFamily:'SpaceGM',  }}>Settings Page</Text>
          {/* Input fields for subjects */}
          <View style={styles.inputContainer}>
            <Text>Math Questions:</Text>
            <TextInput
              style={styles.input}
              value={subjects.math.toString()}
              onChangeText={(text) => setSubjects({ ...subjects, math: parseInt(text) || 0 })}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text>General Paper Questions:</Text>
            <TextInput
              style={styles.input}
              value={subjects.generalPaper.toString()}
              onChangeText={(text) => setSubjects({ ...subjects, generalPaper: parseInt(text) || 0 })}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text>English Questions:</Text>
            <TextInput
              style={styles.input}
              value={subjects.english.toString()}
              onChangeText={(text) => setSubjects({ ...subjects, english: parseInt(text) || 0 })}
              keyboardType="numeric"
            />
          </View>
          <Button title="Start Test" onPress={handleStartTest} />
        </View>
      ) : (
        // start cbt mode 
          <SafeAreaView style={{width:'100%', height:'100%'}}>
             <View style={styles.header}>
              <Pressable onPress={() => setSettings(true)}>
              <Ionicons name="chevron-back-outline" size={24} color="black" />
              </Pressable>
              <View>
                <Text style={styles.headerText}> Cbt Mode</Text>
                <Text style={styles.headerSubtext}>30:00</Text>
              </View>
              <Pressable onPress={() => {}}>
              <Ionicons name="settings-outline" size={24} color="black" />
              </Pressable>
              </View>

          {loading ? (
            <Text>Loading questions...</Text>
          ) : (
            <>
              <View style={{marginTop:20, backgroundColor:Colors.gray, padding:10, width:'100%'}}>
              <Text>Math Questions:</Text>
              {questions.math.map((q, index) => (
                <Text key={index}>{q.question}</Text>
              ))}
              <Text>General Paper Questions:</Text>
              {questions.generalPaper.map((q, index) => (
                <Text key={index}>{q.question}</Text>
              ))}
              <Text>English Questions:</Text>
              {questions.english.map((q, index) => (
                <Text key={index}>{q.question}</Text>
              ))}
              <Button title="Change Settings" onPress={handleSettingsChange} />
          </View>
              </>
          )}
      </SafeAreaView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({  
  header:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    padding:10,
    paddingBottom:20,
    backgroundColor:Colors.black,
    borderRadius:20,
  },
  headerText:{
    fontFamily:'SpaceGM',
    fontSize:18,
  },
  headerSubtext:{
    textAlign:'center',
    color:'#9c9d9c',
    fontSize:12,
    fontFamily:'SpaceGM',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    width: 50,
    marginLeft: 10,
  },
});

export default Cbt;
