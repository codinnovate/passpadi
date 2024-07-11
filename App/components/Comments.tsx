import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '@/constants/Colors';
import { server } from '@/server';
import axios from 'axios';
import { style } from '@/constants/Styles';


const Comments = ({comment}) => {
  const [user, setUser] = useState();

const getProfile = async () => {
  try {
    const response = await axios.get(`${server}/me/${comment.user}`)
    setUser(response.data.personal_info)
    console.log(response.data.personal_info)
  } catch (error) {
    console.log(error)
  }
}
useEffect(() => {
  // console.log(comment.user)
   getProfile()
  
},[comment.user])
 console.log(user)
  return (
    <View style={{flexDirection:'row', padding:10, gap:10}}>
      <Image  source={{uri:user?.profile_img}} style={style.avatar} />
      <View style={{}}>
        <View style={{flexDirection:'row', alignItems:'center', gap:10}}>
          <Text style={style.fullname}>{user?.fullname}</Text>
          <Text style={style.username}>@{user?.username}</Text>
        </View>
        <Text style={{color:Colors.white, fontFamily:'Raleway'}}>{comment?.content}</Text>
      </View>
    </View>
  )
}

export default Comments