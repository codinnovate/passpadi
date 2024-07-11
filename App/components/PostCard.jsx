import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import React,{useState, useEffect} from 'react'
import { Link } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import Colors  from "@/constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { server } from "@/server";

const PostCard = ({post}) => {
    const [ userId, setUserId]  = useState();
    const {posts, setPosts} = useState();



    useEffect(() => {
        const getUserId = async () => {
          const userId = await AsyncStorage.getItem("userId");
          setUserId(userId);
        };
    
        getUserId();
    
      }, []);


      
  const handleLike = async (postId) => {
    try {
      const response = await axios.put(
        `${server}/posts/${postId}/${userId}/like`
      );
      const updatedPost = response.data;
      if(updatedPost){
        setLike(like + 1)
      }


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
      if(updatedPost){
        setLike(like - 1)
      }

    } catch (error) {
      console.error("Error unliking post:", error);
    }
}
  return (
    <View
            style={{
              width:'100%',
              height:'auto',
              padding: 15,
              borderBottomWidth: 1,
              borderColor:Colors.gray,
              display:'flex',
              gap: 20,
              flexDirection: "row",
            }}
          >
            <View style={{
              // width:'100%',
              display:'flex',

            }}>
              
              <Image
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 20,
                }}
                source={{
                  uri: post.user?.personal_info?.profile_img,
                }}
                />
            </View>

            <View 
            style={{
              width:'100%',
            }}>
              <View style={{
                flexDirection:'row',
                gap:10,
              }}>
              <Text
                style={{ fontSize: 15, fontFamily:'Ubuntu', color:Colors.white,  }}
              >
                {post?.user?.personal_info?.fullname}
              </Text>
              <Text
                style={{ fontSize: 15, fontFamily:'Raleway', color:Colors.gray,  }}
              >
                @{post?.user?.personal_info?.username}
              </Text>
              </View>
              <View style={{
                marginVertical:5,
                gap:10,
                width:'100%',
                paddingRight:10,
              }}>
              {post?.content && (
                <Text style={{color:Colors.white, fontFamily:'Raleway'}}>{post?.content}</Text>
              )}
              {post?.image && (
              <Link 
                href={`threads/${post?._id}`}
                style={{
                  width: '100%',
                  maxHeight:400,
                  height:300,
                  backgroundColor:Colors.green,
                  borderRadius: 5,
                }}>

                  <Image
                   style={{
                   width: '100%',
                   height:'100%',
                   objectFit:'contain',
                   borderRadius: 2,
                 }}
                 source={{
                   uri: post?.image,
                 }}
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
                <View style={{flexDirection:"row", alignItems:'center'}}>
                {post?.likes?.includes(userId) ? (
                  <AntDesign
                    onPress={() => handleDislike(post?._id)}
                    name="heart"
                    size={20}
                    color={Colors.gray}
                  />
                ) : (
                  <AntDesign
                    onPress={() => handleLike(post?._id)}
                    name="hearto"
                    size={20}
                    color={Colors.gray}
                  />
                )}
                  <Text style={{color:Colors.gray, fontFamily:'Raleway', marginLeft:5,}}>{post?.likes?.length}</Text>
                </View>

               <View style={{flexDirection:'row', alignItems:"center"}}>
               <AntDesign name="message1" size={20} color={Colors.gray}/>
               <Text style={{ color:Colors.gray, marginLeft:5}}>{post?.replies?.length}</Text>
               </View>
                <AntDesign name="sharealt" size={20} color={Colors.gray} />                
              </View>

             
            </View>
          </View>
  )
}
export default PostCard;