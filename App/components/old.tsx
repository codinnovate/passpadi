import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import axios from 'axios';
import { server } from '@/server';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '@/constants/Colors';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import RenderHtml from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';
import { router } from 'expo-router';

const Cbt = () => {
  const [selectedTab, setSelectedTab] = useState('Math');
  const [mathQuestions, setMathQuestions] = useState([]);
  const [generalPaperQuestions, setGeneralPaperQuestions] = useState([]);
  const [englishQuestions, setEnglishQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(30 * 60); // 30 minutes in seconds
  const [timeUp, setTimeUp] = useState(false);
  const { width } = useWindowDimensions();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < mathQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  }
  const handleBack = () => {
    if (currentIndex != 0) {
      setCurrentIndex(currentIndex - 1);
    }
  }
  // Fetch random questions for each subject
  const fetchMathQuestions = async () => {
    try {
      const response = await axios.get(server + '/questions/v1/mathematics');
      const randomQuestions = getRandomElements(response.data, 10); // Get 10 random questions
      setMathQuestions(randomQuestions);
    } catch (error) {
      console.error('Error fetching math questions:', error);
    }
  };

  const fetchGeneralPaperQuestions = async () => {
    try {
      const response = await axios.get(server + '/questions/v1/general-paper');
      const randomQuestions = getRandomElements(response.data, 10); // Get 10 random questions
      setGeneralPaperQuestions(randomQuestions);
    } catch (error) {
      console.error('Error fetching general paper questions:', error);
    }
  };

  const fetchEnglishQuestions = async () => {
    try {
      const response = await axios.get(server + '/questions/v1/english');
      const randomQuestions = getRandomElements(response.data, 20); // Get 20 random questions
      setEnglishQuestions(randomQuestions);
    } catch (error) {
      console.error('Error fetching english questions:', error);
    }
  };

  // Function to get random elements from an array
  const getRandomElements = (array, numElements) => {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numElements);
  };

  useEffect(() => {
    // Fetch initial questions when component mounts
    fetchMathQuestions();
    fetchGeneralPaperQuestions();
    fetchEnglishQuestions();
  }, []);

  // Countdown timer logic
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer <= 0) {
          clearInterval(interval);
          setTimeUp(true);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Format time in mm:ss format
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleTabPress = (tabName) => {
    setSelectedTab(tabName);
    // Implement additional logic if needed when tabs are pressed
  };
  const question = mathQuestions[currentIndex]

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons onPress={() => router.back()} name="chevron-back" size={24} color="black" />
        <Text style={styles.headerText}>Cbt Mode</Text>
        <View style={styles.timerContainer}>
          <MaterialCommunityIcons name="timer" size={24} color="black" />
          <Text style={styles.timerText}>{formatTime(timer)}</Text>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'Math' && styles.selectedTab]}
          onPress={() => handleTabPress('Math')}
        >
          <Text style={styles.tabText}>Math</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'General Paper' && styles.selectedTab]}
          onPress={() => handleTabPress('General Paper')}
        >
          <Text style={styles.tabText}>General Paper</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'English' && styles.selectedTab]}
          onPress={() => handleTabPress('English')}
        >
          <Text style={styles.tabText}>English</Text>
        </TouchableOpacity>
      </View>

      {/* Content based on selected tab */}
      <View style={styles.contentContainer}>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <View>
            {selectedTab === 'Math' && (
              <View>
                {mathQuestions.map((q, index) => (
                  <Text key={index}>{q.question}</Text>
                ))}
              </View>
            )}
            {selectedTab === 'General Paper' && (
              <View>
                {generalPaperQuestions.map((question, index) => (
                  <View key={index}>
                  <View style={styles.questionCard}>
                  <Text style={{ fontFamily:'SpaceGM', }}>Question {currentIndex + 1}</Text>
                  {question?.instruction? (
                    <Text style={{ fontSize:13}}>{question?.instruction}</Text>
                  ) : null}
          
                  <Text style={styles.question}>{question?.question}</Text>
                  <View  style={styles.questionOptions}>
                  {question?.options.map((option, index) => (
                    <Pressable
                    key={index}
                    style={[styles.button, option === question?.answer ? styles.clickedBtn : null ]}
                  >
                    <Text style={styles.text}>{option}</Text>
                  </Pressable>
                  ))}
                  </View> 
                </View>
                </View>
                ))}
              </View>
            )}
            {selectedTab === 'English' && (
              <View>
                {englishQuestions.map((q, index) => (
                  <View key={index}>
                     <RenderHtml 
                     source={{ html: q.question }} 
                     contentWidth={width}
                     />
                  </View>
                ))}
              </View>
            )}
          </View>
        )}
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
      <Pressable
         style={styles.back} 
         onPress={() => handleBack()}
         >
          <Text style={{color:Colors.green, fontFamily:'SpaceGM', fontSize:20, fontWeight:500, textAlign:'center'}}>Back</Text>
        </Pressable>
        
        <Pressable
         style={styles.next} 
         onPress={() => handleNext()}
         >
          <Text style={{color:Colors.white, fontFamily:'SpaceGM', fontSize:20, fontWeight:500, textAlign:'center'}}>Next</Text>
        </Pressable>
          </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  headerText: {
    fontFamily: 'Ubuntu',
    fontSize: 20,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timerText: {
    fontFamily: 'SpaceGM',
    fontSize: 16,
    marginLeft: 5,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 20,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 30,
  },
  selectedTab: {
    backgroundColor:Colors.yellow,
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'SpaceGM',
  },
  contentContainer: {
    flex: 1,
  },
  questionCard:{
    marginTop:30,
    backgroundColor:Colors.white,
    padding:20,
    borderRadius:30,
  },
  question:{
    fontSize:20,
    marginVertical:10,
    color:Colors.green,
  },
  questionOptions:{
    gap:10,
    marginTop:10,
  },
  buttonContainer:{
    width:'100%',
    position:'absolute',
    padding:10,
    backgroundColor:Colors.white,
    bottom:0,
  },
  buttonWrapper:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between', 

  },
  button:{
    width:'100%',
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    height:50,
    borderRadius:50,
    borderWidth:1,
    borderColor:Colors.green,

  },
  clickedBtn:{
    backgroundColor:Colors.yellow,
  },
  text:{
    color:Colors.green,
    fontSize:15,
    textAlign:'center',
    fontWeight:'semibold'
    
  },
  answerDetail:{
    marginTop:25,
    marginBottom:50,
  },
  next:{
    backgroundColor:Colors.green,
    paddingVertical:13,
    paddingHorizontal:40,
    borderRadius:30,
    
  },
  back:{
    borderColor:Colors.green,
    borderWidth:1,
    paddingVertical:13,
    paddingHorizontal:40,
    borderRadius:30,
    
  }
});

export default Cbt;
