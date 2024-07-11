import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import React, { useState, useContext } from 'react';
import { Link } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import axios from "axios";
import { server } from "@/server";
import { UserContext } from '@/context/UserContext';

const PostCard = ({ post }) => {
  const { userId } = useContext(UserContext);
  const [likes, setLikes] = useState(post?.likes);
  const [liked, setLiked] = useState(post?.likes.includes(userId));

  const handleLike = async (postId) => {
    try {
      await axios.put(`${server}/posts/${postId}/${userId}/like`);
      setLikes([...likes, userId]);
      setLiked(true);
    } catch (error) {
      console.log("Error liking the post", error);
    }
  };

  const handleDislike = async (postId) => {
    try {
      await axios.put(`${server}/posts/${postId}/${userId}/unlike`);
      setLikes(likes.filter((id) => id !== userId));
      setLiked(false);
    } catch (error) {
      console.error("Error unliking post:", error);
    }
  };

  return (
    <View
      style={{
        width: '100%',
        height: 'auto',
        padding: 15,
        borderBottomWidth: 1,
        borderColor: Colors.gray,
        display: 'flex',
        gap: 20,
        flexDirection: "row",
      }}
    >
      <View style={{ display: 'flex' }}>
        <Image
          style={{
            width: 30,
            height: 30,
            borderRadius: 20,
          }}
          source={{ uri: post?.user?.personal_info?.profile_img }}
        />
      </View>

      <View style={{ width: '100%' }}>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <Text style={{ fontSize: 15, fontFamily: 'Ubuntu', color: Colors.white }}>
            {post?.user?.personal_info?.fullname}
          </Text>
          <Text style={{ fontSize: 15, fontFamily: 'Raleway', color: Colors.gray }}>
            @{post?.user?.personal_info?.username}
          </Text>
        </View>
        <View style={{ marginVertical: 5, gap: 10, width: '100%', paddingRight: 10 }}>
          {post?.content && (
            <Text style={{ color: Colors.white, fontFamily: 'Raleway' }}>{post?.content}</Text>
          )}
          {post?.image && (
            <Link
              href={`threads/${post?._id}`}
              style={{
                width: '100%',
                maxHeight: 400,
                height: 300,
                backgroundColor: Colors.gray,
                borderRadius: 10,
              }}
            >
              <Image
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 2,
                  resizeMode: 'cover'
                }}
                source={{ uri: post?.image }}
              />
            </Link>
          )}
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            marginTop: 15,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: 'center' }}>
            {liked ? (
              <AntDesign
                onPress={() => handleDislike(post?._id)}
                name="heart"
                size={20}
                color={Colors.red}
              />
            ) : (
              <AntDesign
                onPress={() => handleLike(post?._id)}
                name="hearto"
                size={20}
                color={Colors.gray}
              />
            )}
            <Text style={{ color: Colors.gray, fontFamily: 'Raleway', marginLeft: 5 }}>{likes?.length}</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: "center" }}>
            <AntDesign name="message1" size={20} color={Colors.gray} />
            <Text style={{ color: Colors.gray, marginLeft: 5 }}>{post?.replies?.length}</Text>
          </View>
          <AntDesign name="sharealt" size={20} color={Colors.gray} />
        </View>
      </View>
    </View>
  );
};

export default PostCard;
