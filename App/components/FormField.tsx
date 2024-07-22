import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Colors from '@/constants/Colors'
import { Feather } from '@expo/vector-icons';

const FormField = ({title, value, placeholder, onChangeText}) => {
  const [showPass, setShowPass ] = useState(false);
  const showPassword = () => {
    setShowPass(!showPass)
  }
  return (
    <View style={{marginTop:20}}>
      <Text style={{color:Colors.white, fontSize:13, fontFamily:'SpaceGM' }}>{title}</Text>
      <View style={{
         borderWidth:1,
         borderColor:Colors.yellow,
         borderRadius:10,
         flexDirection:'row', 
         marginTop:10, 
         width:'100%',
         height:50,
         paddingHorizontal:10, alignItems:'center' }}>
        <TextInput 
        style={{
          flex:1,
          color:Colors.white,
          fontFamily:'SpaceGM'
        }}
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        secureTextEntry={title === 'Password' && !showPass}

        />
        {title === 'Password' && (
          <TouchableOpacity 
          onPress={showPassword}
          >
          <Feather
                 onPress={showPassword}
                 name={showPass? 'eye': 'eye-off'}
                  size={24} color="white" 
                  style={{}} />
        
          </TouchableOpacity>

        )}
      </View>
    </View>
  )
}

export default FormField