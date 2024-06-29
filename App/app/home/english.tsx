import { View, Text, SafeAreaView, StyleSheet, Pressable, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '@/components/Header'
import Colors from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { server } from '@/server'
import axios from 'axios'


const English = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  const getQuestions = async () => {
    try {
      const response = await axios.get(server + '/v1/english');
      // setData(json.movies);
      console.log(response)
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getQuestions();
  }, []);
  return (
    <SafeAreaView>
      <View style={{padding:20}}>
      <Header />
      <View style={styles.questionCard}>
        <Text style={{}}>Question 1</Text>
        <Text style={styles.question}>What is the value of x in the equation 2x + 3 = 11?</Text>
        <View style={styles.questionOptions}>
          <Pressable style={styles.button}>
            <Text style={styles.text}>2</Text>
          </Pressable>
          <Pressable style={[styles.button, styles.clickedBtn]}>
            <Text  style={styles.text}>3</Text>
          </Pressable>
          <Pressable style={styles.button}>
            <Text  style={styles.text}>5</Text>
          </Pressable>
          <Pressable style={styles.button}>
            <Text  style={styles.text}>4</Text>
          </Pressable>
        </View> 
      </View>
      <View style={styles.answerDetail}>
        <Text style={{fontFamily:'SpaceGM', color:Colors.black, fontWeight:'bold'}}>Basic Explanation</Text>
        <Text>Question 2</Text>
        <Text>Question 2</Text>
        <View style={{display:'flex', flexDirection:'row', alignItems:'center', marginTop:10}}>
        <Ionicons name="checkmark-circle-sharp" size={24} color={Colors.green} />
          <Text style={{fontFamily:'SpaceGM', color:Colors.green, fontWeight:'bold', marginLeft:5}}>
          Your answer is correct
          </Text>
          </View>
          <View style={{display:'flex', flexDirection:'row', alignItems:'center', marginTop:10}}>
        <Ionicons name="checkmark-circle-sharp" size={24} color={Colors.red} />
          <Text style={{fontFamily:'SpaceGM', color:Colors.red, fontWeight:'bold', marginLeft:5}}>
          Your answer is wrong
          </Text>
          </View>
      </View>
      <View style={{width:'100%', display:'flex', flexDirection:'row', justifyContent:'space-between', marginTop:30}}>
        <TouchableOpacity style={styles.skip}>
          <Text style={{color:Colors.green, fontFamily:'SpaceGM', fontSize:20, fontWeight:'bold', textAlign:'center'}}>Skip</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.next}>
          <Text style={{color:Colors.white, fontFamily:'SpaceGM', fontSize:20, fontWeight:'bold', textAlign:'center'}}>Next</Text>
        </TouchableOpacity>
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
    fontSize:24,
    marginVertical:10,
    fontFamily:'SpaceGM',
    color:Colors.green,
  },
  questionOptions:{
    gap:10,
    marginTop:10,
  },
  button:{
    width:'100%',
    padding:10,
    borderRadius:50,
    borderWidth:1,
    borderColor:Colors.green,

  },
  clickedBtn:{
    backgroundColor:Colors.yellow,
  },
  text:{
    color:Colors.green,
    fontSize:23,
    textAlign:'center',
    fontWeight:'semibold'
    
  },
  answerDetail:{
    marginTop:25,
  },
  next:{
    backgroundColor:Colors.green,
    paddingVertical:13,
    paddingHorizontal:40,
    borderRadius:30,
    
  },
  skip:{
    borderColor:Colors.green,
    borderWidth:1,
    paddingVertical:13,
    paddingHorizontal:40,
    borderRadius:30,
    
  }
})

export default English