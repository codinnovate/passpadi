import { View, Text, StyleSheet, Image, ImageSourcePropType, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'
import Images from '@/constants/Images'
import { router } from 'expo-router'



type CardProps = {
  image:ImageSourcePropType,
  text:string,
  link:string,


}
const SubCard = ({image, text, link}:CardProps) => {
  return (
    <TouchableOpacity
     onPress={() => router.navigate(link)}
     style={styles.card}>
      <Image
       style={styles.image}
       source={image} 
      />
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  card:{
    width:180,
    justifyContent:'center',
    alignItems:'center',
    height:200,
    padding:10,
    borderRadius:20,
    backgroundColor:Colors.green,
  },
  image:{
    width:100,
    height:100,
    marginBottom:10
  },
  text:{
    fontFamily:'SpaceGM',
    fontSize:20,
    marginTop:10,
    color:Colors.white,
    fontWeight:'200'

  }

})

export default SubCard