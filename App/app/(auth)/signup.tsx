// screens/RegisterScreen.js
import React, { useState } from 'react';
import { SafeAreaView,View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { router } from 'expo-router';
import { server } from '@/server';
import Colors from '@/constants/Colors';


const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullname, setFullname] = useState('');

  const handleRegister = async () => {
    if(!email || !password || !fullname){
      Alert.alert("Some Fields are missing!")
    }
    const userData =  {
      email,
      password,
      fullname,
    }
    
      axios.post(`${server}/signup`, userData)
      .then(res => {
        console.log(res)
        router.navigate('/(auth)/signin');
      })
      .catch(err => {
        console.log(err?.response?.data?.error)
        Alert.alert(err?.response?.data?.error)
      })    
  };

  return (
    <View  style={styles.container}>
      <View style={{marginVertical:30}}>
        <Text style={{fontSize:24, fontFamily:'SpaceGM'}}>Sign Up</Text>
        <Text style={{fontSize:16, color:Colors.green, fontFamily:'SpaceGM'}}>Enter your details below to create your account and get started.</Text>
      </View>
      <Text style={styles.label}>Full Name</Text>
      <TextInput
        style={styles.input}
        onChangeText={setFullname}
        value={fullname}
        placeholder="Enter your full name"
      />
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Enter your email"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Enter your password"
        secureTextEntry
      />
      
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={{color:'white', textAlign:'center', fontFamily:'SpaceGM', fontSize:15}}>Register</Text>
      </TouchableOpacity>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:30,
    paddingHorizontal: 20,
  },
  label: {
    marginBottom: 5,
    fontFamily:'SpaceGM',
    fontSize:14,
  },
  input: {
    height: 50,
    borderColor: Colors.green,
    borderWidth: 1,
    borderRadius:12,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button:{
    width:'100%',
    padding:15,
    borderRadius:12,
    backgroundColor:Colors.black
  }
});

export default Signup;
