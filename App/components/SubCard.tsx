import { View, Text, StyleSheet, Image, ImageSourcePropType, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'
import Images from '@/constants/Images'
import { router } from 'expo-router'



type CardProps = {
  image:ImageSourcePropType,
  text:string,
  link:string,
  bgColor:string,


}
const SubCard = ({image, text, link, bgColor}:CardProps) => {
  return (
    <TouchableOpacity
     onPress={() => router.navigate(link)}
     style={[{backgroundColor:`${bgColor}`}, styles.card]}>
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
    width:'100%',
    justifyContent:'center',
    alignItems:'center',
    height:150,
    padding:10,
    borderRadius:20,
  },
  image:{
    width:60,
    height:60,
    marginBottom:10
  },
  text:{
    fontFamily:'Ubuntu',
    fontSize:18,
    marginTop:10,
    color:Colors.black,
  }

})

export default SubCard