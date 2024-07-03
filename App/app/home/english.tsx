import { View, Text, SafeAreaView, StyleSheet, Pressable, TouchableOpacity, ScrollView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '@/components/Header'
import Colors from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { server } from '@/server'
import axios from 'axios'
import HTML from 'react-native-render-html';

const English = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const getQuestions = async () => {
    try {
      const response = await axios.get(server + '/questions/v1/english');
      setQuestions(response.data)
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  }
  const handleBack = () => {
    if (currentIndex != 0) {
      setCurrentIndex(currentIndex - 1);
    }
  }
  useEffect(() => {
    getQuestions();
  }, []);


  const question = questions[currentIndex]
  console.log(question)

  return (
    <SafeAreaView style={{  height:'100%', width:'100%'}}>
      <View style={{height:'100%', width:'100%', position:'relative'}}>
      <Header title="English" questionLength={questions.length}/>
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
      <ScrollView contentContainerStyle={{height:'100%', padding:10, marginBottom:50,}}>
      <View style={styles.answerDetail}>
        <Text style={{fontFamily:'SpaceGM', color:Colors.black}}>Basic Explanation</Text>
        <Text style={{    fontFamily:'SpaceGM'}}>{question?.answerDetail}</Text>
        {/* <View style={{display:'flex', flexDirection:'row', alignItems:'center', marginTop:10}}>
        <Ionicons name="checkmark-circle-sharp" size={24} color={Colors.green} />
          <Text style={{fontFamily:'SpaceGM', color:Colors.green, fontWeight:500, marginLeft:5}}>
          Your answer is correct
          </Text>
          </View>
          <View style={{display:'flex', flexDirection:'row', alignItems:'center', marginTop:10}}>
        <Ionicons name="checkmark-circle-sharp" size={24} color={Colors.red} />
          <Text style={{fontFamily:'SpaceGM', color:Colors.red, fontWeight:500, marginLeft:5}}>
          Your answer is wrong
          </Text>
          </View> */}
       </View>

        </ScrollView>

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

      </View> 
    </SafeAreaView>
  )
}



const styles = StyleSheet.create({
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
})

export default English