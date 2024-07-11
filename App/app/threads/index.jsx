import { StyleSheet, Text, View, ScrollView, Image, Pressable, SafeAreaView, RefreshControl } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { server } from "@/server";
import Images from "@/constants/Images";
import Colors from "@/constants/Colors";
import { Link, router } from "expo-router";
import { UserContext } from '@/context/UserContext';
import PostCard from "@/components/PostCard";

const Threads = () => {
  const { userId } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${server}/get-posts`);
      setPosts(response.data);
    } catch (error) {
      console.log("error fetching posts", error);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchPosts();
    setRefreshing(false);
  };

  const handleLike = async (postId) => {
    try {
      const response = await axios.put(
        `${server}/posts/${postId}/${userId}/like`
      );
      const updatedPost = response.data;
      const updatedPosts = posts.map((post) =>
        post._id === updatedPost._id ? updatedPost : post
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
      const updatedPosts = posts.map((post) =>
        post._id === updatedPost._id ? updatedPost : post
      );
      setPosts(updatedPosts);
    } catch (error) {
      console.error("Error unliking post:", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.black }}>
      <Pressable
        onPress={() => router.push('threads/create')}
        style={{
          position: 'absolute',
          bottom: 10,
          right: 10,
          margin: 10,
          zIndex: 999,
          backgroundColor: Colors.green,
          padding: 20,
          borderRadius: 20,
        }}>
        <AntDesign name="plus" size={24} color={Colors.white} />
      </Pressable>
      <ScrollView
        style={{ marginTop: 20, flex: 1, height: '100%' }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <Image
            style={{ width: 300, height: 50 }}
            source={Images.logo}
          />
        </View>
        <View style={{ width: '100%', height: '100%', marginTop: 20, gap: 10 }}>
          {posts?.map((post) => (
            <Pressable
              onPress={() => router.push(`threads/${post?._id}`)}
              key={post?._id}>
              <PostCard post={post} />
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Threads;

const styles = StyleSheet.create({});
