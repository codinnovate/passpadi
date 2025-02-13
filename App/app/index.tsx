import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '@/constants/Colors'
import {  router } from 'expo-router'
import Images from '@/constants/Images'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { style } from '@/constants/Styles'
import Button from '@/components/Button'

export function Splashpage (){

  useEffect(() => {
      const checkLoginStatus = async () => {
        try {
           const token = await AsyncStorage.getItem("authToken");
           const role = await AsyncStorage.getItem("role");
           
           if (token !== null && role === 'paidUser') {
               router.replace("/home")
             ;
          } 
        } catch (error) {
          console.log("error", error);
        }
      }
 
     checkLoginStatus();
   }, []);
  return (
    <View style={{flex:1, width:'100%', justifyContent:'space-evenly', backgroundColor:Colors.green, alignItems:'center', padding:15}}>
    <Image 
    source={Images.logo} 
    style={styles.logo}/>
      <View>
      <Image 
      source={Images.splash}
      style={styles.Image} />
        <Text style={styles.bigTextContainer}>
          Score <Text style={styles.text}>90%</Text> With PassPadi Cbt App
        </Text>
        <Text style={styles.smallText}>Take Your Learning to the next level with our interactive and personalized cbt app</Text>
      </View>
      <View>
        
      </View>
      <View style={{gap:10, width:'100%', marginTop:20}}>
     
      <Button 
      textColor={Colors.black}
      color={Colors.yellow}
      title="Register "
      onPress={() => router.navigate('/(auth)/signup')} 
      style={style.button} />
      
       <Button 
      title="Login"
      onPress={() => router.push('/(auth)/signin')} 
      style={style.button}

       />
      
      <Pressable onPress={() => router.navigate('https://www.passpadi.com/privacy')} style={{ marginTop: 10 }}>
            <Text style={{ textAlign:'center', textDecorationLine:'underline', fontFamily: 'SpaceGM', color:Colors.white }}>
             Our  Privacy and Policy
            </Text>
        </Pressable>
      </View>
      </View>
  )
}


const styles = StyleSheet.create({
  Image:{
      width:240,
      height:200,
      alignSelf:'center',
  },
  logo:{
    width:300,
    height:100,
    marginTop:20,
    marginLeft:20,
  },
  bigTextContainer:{
    fontSize:27,
    color:Colors.white,
    fontFamily:'Ubuntu',
    marginBottom:10,
    textAlign:'center',
  },
  text:{
    color:Colors.yellow,
    fontFamily:'SpaceGM',

  },

  smallText:{
    color:Colors.white,
    fontSize:12,
    fontFamily:'SpaceGM',
    textAlign:'center',

  },
  link:{
    display:'flex',    
    alignItems:'center',
    marginTop:20,
    width:'100%',
    borderWidth:1,
    padding:10,
    height:50,
    borderColor:Colors.yellow,
    justifyContent:'center',
    borderRadius:15,


  },
  linkText:{
    color:Colors.yellow,
    fontSize:20,
    fontFamily:'Ubuntu',
    fontWeight:'300',
    textAlign:'center',
    
  }



})

export default Splashpage