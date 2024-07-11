import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Image, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { server } from '../../server';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons'; // Make sure to install @expo/vector-icons
import { router } from 'expo-router';
import { uploadImage } from '@/common/aws';



const CreatePost = () => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [role, setRole] = useState('')
  const getUser = async () => {
    const userRole = await AsyncStorage.getItem("role")
    setRole(userRole)
  }
  useEffect(() => {
    getUser();
    if(role === 'user'){
      Alert.alert("You Need to Pay just 1000Naira to take Cbt !!")
        router.back()
    }
  })

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
  };

  const handleRemoveImage = () => {
    setImage(null);
  };

  const handlePost = async () => {
    setUploading(true);
    const postData = {
      content,
      image,
    };

    try {
      const access_token = await AsyncStorage.getItem("authToken");
      await axios.post(`${server}/create-post`, postData, {
        headers: {
          'Authorization': `Bearer ${access_token}`
        }
      });
      Alert.alert("Post created successfully!");
      router.push('/threads')
      setContent('');
      setImage(null);
    } catch (error) {
      console.log(error)
      Alert.alert("Error creating post:", error?.message);
    } finally {
      setUploading(false);
    }

    
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="What's on your mind?"
        value={content}
        onChangeText={setContent}
      />
      {image && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.image} />
          <TouchableOpacity onPress={handleRemoveImage} style={styles.removeButton}>
            <Text style={styles.removeButtonText}>Remove</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={pickImage} style={styles.iconButton}>
          <Ionicons name="camera" size={32} color="black" />
        </TouchableOpacity>
      </View>
      <Button title={uploading ? "Posting..." : "Post"} onPress={handlePost} disabled={uploading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 200,
  },
  removeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  iconButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CreatePost;
