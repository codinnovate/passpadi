import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'
import { Link } from 'expo-router'
import { Feather } from '@expo/vector-icons'
import Images from '@/constants/Images'

const Splashpage = () => {
  return (
    <View style={{flex:1, alignItems:'center', padding:20, backgroundColor:Colors.green}}>
      <Image 
      source={Images.splash}
       style={styles.Image} />
      <View>
        <Text style={styles.bigTextContainer}>
          Think <Text style={styles.text}>Outside the Box</Text> With PassPadi Quizzax
        </Text>
        <Text style={styles.smallText}>Take Your Learning to the next level with our interactive and personalized quizzez</Text>
      </View>
      <Link href='/home' style={styles.link}>
        <Text style={styles.linkText}>Continue</Text>
        <Feather name="arrow-up-right" size={20} color={Colors.yellow} />
      </Link>
    </View>
  )
}


const styles = StyleSheet.create({
  Image:{
      width:240,
      height:300,
      alignSelf:'center',
      marginTop:80,
  },
  bigTextContainer:{
    fontSize:35,
    color:Colors.white,
    fontFamily:'SpaceGM',
    fontWeight:'300',
    marginBottom:10
  },
  text:{
    color:Colors.yellow,
  },

  smallText:{
    color:Colors.white,
    fontSize:15,
    fontFamily:'SpaceGM',
    fontWeight:'300'
  },
  link:{
    marginLeft:'auto',
    alignItems:'center',
    marginTop:20,


  },
  linkText:{
    color:Colors.yellow,
  }



})

export default Splashpage