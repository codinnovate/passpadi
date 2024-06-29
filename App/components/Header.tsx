import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import Styles from '@/constants/Styles'
import Colors from '@/constants/Colors'
import { router } from 'expo-router'
import Home from '@/app/home'

const Header = () => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => router.back(Home)}>
      <Ionicons name="chevron-back-outline" size={24} color="black" />
      </TouchableOpacity>
      <View>
        <Text style={styles.headerText}>Math Past Questions</Text>
        <Text style={styles.headerSubtext}>3000 + Questions</Text>
      </View>

      <TouchableOpacity onPress={() => {}}>
      <Ionicons name="settings-outline" size={24} color="black" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  
  header:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
  },
  headerText:{
    fontFamily:'SpaceGM',
    fontSize:20,
  },
  headerSubtext:{
    textAlign:'center',
    color:'#9c9d9c',
    fontFamily:'SpaceGM',
    fontWeight:'600'
  }
})

export default Header