import { View, Text, Image } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'
import Images from '@/constants/Images'

export default function Splash() {
  return (
    <View style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'#000'}}>
    <View style={{width:'100%', height:'100%', justifyContent:'center', alignItems:'center'}}>
      <Image 
       source={Images.logo} 
       style={{width:400, height:100}} />
       {/* <Text style={{
        fontFamily:'Raleway',
        color:Colors.green,
        fontSize:20,
        marginTop:1,
       }}>Built For Students Success</Text> */}
    </View>

    </View>
  )
}