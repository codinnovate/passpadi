import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import Button from '@/components/Button'
import Colors from '@/constants/Colors';
import axios from 'axios';
import { server } from '@/server';
import { uploadImage } from '@/common/aws';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import Loader from '@/components/Loader';
import { router } from 'expo-router';
import {UserContext} from '@/context/UserContext';


const PostComment = ({ postId}) => {
  const {userId} = useContext(UserContext)
  const [user, setUser] = useState();
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);


  const handleRemoveImage = () => {
    setImage(null);
  };


  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      let img = result.assets[0].uri;
      if (img) {
        setUploading(true);
        const response = await fetch(img);
        const blob = await response.blob();
        uploadImage(blob).then((url) => {
          if (url) {
            setImage(url);
            setUploading(false);
          }
        });
      }
    }
  }


  
  const getProfile = async () => {
    try {
      const response = await axios.get(`${server}/me/${userId}`)
      setUser(response.data.personal_info)
      console.log(response.data.personal_info)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getProfile()
  },[userId])


  const handlePost = async () => {
    setUploading(true);
    const postData = {
      content,
      image,
    }
  try {
    const access_token = await AsyncStorage.getItem("authToken");
    await axios.put(`${server}/reply/${postId}`, postData, {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    });
    Alert.alert("Post created successfully!");
    router.push(`/threads/${postId}`)
    setContent('');
    setImage(null);
  } catch (error) {
    Alert.alert("Error creating post:", error?.message);
  } finally {
    setUploading(false);
  }
}

  if(!user) return <Loader />
  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
         <Image
            style={{
              width: 30,
              height: 30,
              borderRadius: 20,
            }}
            source={{
              uri:user?.profile_img
            }}
            />    


          <TextInput 
          style={styles.input}
          value={content}
          onChangeText={setContent}
          placeholder='Type your reply here' />



      </View>
          <View style={styles.footer}>

            <MaterialIcons onPress={pickImage}  name='image' size={20} color={Colors.white}/>
            <Button 
            onPress={handlePost}
            width={100}
            title={uploading ? "Posting..." : "Reply"}  
            color={Colors.green}
              />
          </View>
          <View>
          {image && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }}  style={styles.image} />
          <TouchableOpacity onPress={handleRemoveImage} style={styles.removeButton}>
            <Text style={styles.removeButtonText}>Remove</Text>
          </TouchableOpacity>
        </View>
      )}
          </View>
    </View>
  )
}



const styles = StyleSheet.create({
  container:{
    borderBottomWidth:1,
    width:'100%',
    borderColor:Colors.gray,
    padding:10,
    gap:10,
  },
  avatar:{
    flexDirection:'row',
    gap:10,
  },
  input:{
    color:Colors.white,
    width:'100%',
    borderColor:'null',
    padding:10,
    borderWidth: 0, // Hides the border
    borderBottomWidth:1,
    borderColor:Colors.gray,
    

  },
  footer:{
    justifyContent:'space-between',
    width:'100%',
    flexDirection:"row",
    alignItems:"center"
  },
  image: {
    width: '100%',
    height: 200,
  },
})

export default PostComment