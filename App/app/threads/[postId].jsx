import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import axios from 'axios';
import { server } from "@/server";
import { useState } from 'react';
import PostCard from '@/components/PostCard'
import Colors  from '@/constants/Colors'
import Comments from '@/components/Comments';
import PostComment from '@/components/PostComment'
import {UserContext} from '@/context/UserContext';
import { useContext } from 'react';

const ThreadsDetail = () => {
  const [post, setPost] = useState();
  const { userId } = useContext(UserContext);
  const {postId} = useLocalSearchParams();
  
  const getPostById = async () => {
    try {
      const response = await axios.get(`${server}/post/${postId}`);
      setPost(response.data);
      console.log(response.data)
    } catch (error) {
      console.log("error fetching posts", error);
    }
  };




  useEffect(() => {
    getPostById();
  },[postId])



  return (
    <SafeAreaView 
    style={{
    flex:1,

    }}>
      <ScrollView style={{flex:1, backgroundColor:Colors.black, height:'100%',}}>
      <Text style={{color:Colors.white}}>ThreadsDetail</Text>
      <PostCard post={post} />
      <PostComment userId={userId} postId={postId}/>
      {post && post?.replies.map((reply, index) => (
        <Comments
        key={index}
        comment={reply}
        />
      ))}
      </ScrollView>
    </SafeAreaView>
  )
}

export default ThreadsDetail