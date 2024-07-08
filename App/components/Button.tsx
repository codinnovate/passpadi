import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { style } from '@/constants/Styles'
import Colors from '@/constants/Colors'

const Button = ({title, onPress, color, width}) => {
  return (
    <TouchableOpacity 
    onPress={onPress}
    style={[style.button, {backgroundColor:color ? color : Colors.black, width :width ? width : '100%'}]}
    >
      <Text style={style.buttonText}>{title ?title :"Press Me" } </Text>
    </TouchableOpacity>
  )
}

export default Button