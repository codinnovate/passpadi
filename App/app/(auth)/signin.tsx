import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View,  Image, KeyboardAvoidingView, TextInput, Pressable, Alert } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { server } from "@/server";
import Images from "@/constants/Images";
import Loader from "@/components/Loader";
import Colors from "@/constants/Colors";
import Button from "@/components/Button";
import * as Device from 'expo-device';
import FormField from "@/components/FormField";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (token) {
          setTimeout(() => {
            router.replace("/home");
          }, 400);
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    checkLoginStatus();
  }, []);

  const checkFields = () => {
    if (!email || !password) {
      Alert.alert("Please Fill All the Fields");
      setLoading(false);
    }
  };

  const storeData = async (data) => {
    try {
      const { access_token, username, role, userId } = data;
      await AsyncStorage.setItem("authToken", access_token);
      await AsyncStorage.setItem("username", username);
      await AsyncStorage.setItem("role", role);
      await AsyncStorage.setItem("userId", userId);
    } catch (error) {
      console.log("AsyncStorage error: ", error);
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    checkFields();
    const user = {
      email: email,
      password: password,
      deviceInfo: Device.deviceName,
    };

    axios
      .post(`${server}/signin`, user)
      .then(async (response) => {
        const data = response.data;
        console.log(data);
        await storeData(data);
        setLoading(false);
        router.push("/home");
      })
      .catch((error) => {
        Alert.alert(error?.response?.data?.error);
        setLoading(false);
        console.log("error ", error);
      });
  };

  if (loading) return <Loader text="Signing in, please wait!!" />;
  return (
    <View style={{ flex: 1, backgroundColor: Colors.green,  width:'100%', padding:10, alignItems:'center' }}>
      <Image style={{ width: 250, height: 150, marginTop: 20 }} source={Images.logo} />
      <KeyboardAvoidingView style={{ width:'100%'}}>
        <View>
          <Text style={{ fontSize: 25, fontFamily: 'Ubuntu', textAlign:'center', marginTop: 25, color: Colors.white }}>
            Login
          </Text>
          <Text style={{ fontSize: 13, fontFamily: 'Raleway', textAlign:'center', color: Colors.white }}>
            Enter Your Passpadi Username and Password
          </Text>
          </View>
          
            <FormField
              title="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}          
              placeholder="Enter your Passpadi Email"
            />
      
              <FormField
               title="Password"
                value={password}
                onChangeText={(text) => setPassword(text)}
                placeholder="Enter your Password"
              />
        <View style={{ marginTop: 45, width:'100%' }}>
          <Button 
          onPress={handleLogin}
           title='Login'
            color={Colors.yellow}
             textColor={Colors.black} />
        </View>
        <Pressable onPress={() => router.navigate('https://www.passpadi.com.ng/signup')} style={{ marginTop: 10 }}>
          <Text style={{ textAlign: "center", color: Colors.white, fontFamily: 'SpaceGM', fontSize: 12 }}>
            Don't have an account? 
            <Text style={{ fontWeight: "500", marginLeft:5, color: "#007FFF" }}>
              Register Here
            </Text>
          </Text>
        </Pressable>
        <Pressable onPress={() => router.navigate('https://www.passpadi.com.ng/privacy')} style={{ marginTop: 10 }}>
            <Text style={{ textAlign:'center', textDecorationLine:'underline', fontFamily: 'SpaceGM', color:Colors.white }}>
             Our  Privacy and Policy
            </Text>
        </Pressable>
      </KeyboardAvoidingView>
      </View>

  );
};

export default Signin;

const styles = StyleSheet.create({});
