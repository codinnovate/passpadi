import { View, Text , ActivityIndicator} from 'react-native'
import React from 'react'

const Loader = ({text}) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: "center" }}>
    <ActivityIndicator size="small" color="#0000ff" />
    <Text style={{ fontFamily: 'Raleway', marginTop: 20 }}>{text ? text : "Loading please wait ...."}</Text>
  </View>
  )
}

export default Loader