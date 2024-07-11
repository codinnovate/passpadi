import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import axios from 'axios';
import server from '../../server';
import { useState } from 'react';



const ThreadsDetail = () => {
  const [post, setPost] = useState();
  const {postId} = useLocalSearchParams();
  
 
  useEffect(() => {
    const getPostById = async () => {
      try {
        const response = await axios.get(`${server}/post/${postId}`);
        setPost(response.data);
      } catch (error) {
        console.log("error fetching posts", error);
      }
    };
  
    getPostById();
  },[postId])
  return (
    <View>
      <Text>ThreadsDetail</Text>
      <Text>{postId}</Text>
      <Text>{server}</Text>
    </View>
  )
}

export default ThreadsDetail