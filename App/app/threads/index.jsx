import { StyleSheet, Text, View, ScrollView, Image, Pressable } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import { server } from "@/server";
import Images from "@/constants/Images";
import Colors from "@/constants/Colors";
import { Link, router } from "expo-router";
import { UserContext } from '@/context/UserContext';
import PostCard from "@/components/PostCard";


const Threads = () => {
  const { userId } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  console.log(userId)


  useEffect(() => {
    fetchPosts();
  }, []);

  // useFocusEffect(
  //   useCallback(() => {
  //     fetchPosts();
  //   }, [])
  // );

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${server}/get-posts`);
      setPosts(response.data);
    } catch (error) {
      console.log("error fetching posts", error);
    }
  };

  console.log("posts", posts);
  const handleLike = async (postId) => {
    try {
      const response = await axios.put(
        `${server}/posts/${postId}/${userId}/like`
      );
      const updatedPost = response.data;

      const updatedPosts = posts?.map((post) =>
        post?._id === updatedPost._id ? updatedPost : post
      );

      setPosts(updatedPosts);
    } catch (error) {
      console.log("Error liking the post", error);
    }
  };

  const handleDislike = async (postId) => {
    try {
      const response = await axios.put(
        `${server}/posts/${postId}/${userId}/unlike`
      );
      const updatedPost = response.data;
      // Update the posts array with the updated post
      const updatedPosts = posts.map((post) =>
        post._id === updatedPost._id ? updatedPost : post
      );
      console.log("updated ",updatedPosts)
    
      setPosts(updatedPosts);
    } catch (error) {
      console.error("Error unliking post:", error);
    }
  };
  return (
    <ScrollView style={{ marginTop: 20, flex: 1,height:'100%', backgroundColor:Colors.black }}>
      <View style={{ alignItems: "center", marginTop: 20 }}>
        <Image
          style={{ width: 60, height: 40}}
          source={{uri:Images.logo}}
        />
      </View>

      <View style={{ width:'100%', height:'100%',
      marginTop: 20, gap: 10,
 }}>
        {posts?.map((post) => (
          <Pressable
          onPress={() => router.push(`threads/${post?._id}`)}
            key={post?._id}>
          <PostCard post={post}/>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
};

export default Threads;

const styles = StyleSheet.create({});
