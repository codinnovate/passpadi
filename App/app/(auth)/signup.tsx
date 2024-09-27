import React, { useState } from "react";
import { StyleSheet, Text, View,  Image, KeyboardAvoidingView, TextInput, Pressable, Alert, ScrollView } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { server } from "@/server";
import Images from "@/constants/Images";
import Loader from "@/components/Loader";
import Colors from "@/constants/Colors";
import Button from "@/components/Button";
import FormField from "@/components/FormField";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);



  const checkFields = () => {
    if (!email || !password || !fullname || !phoneNumber) {
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
      await AsyncStorage.setItem("email", email);
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
      fullname: fullname,
      phoneNumber: phoneNumber,
    };

    axios
      .post(`${server}/signup`, user)
      .then(async (response) => {
        const data = response.data;
        console.log(data);
        await storeData(data);
        setLoading(false);
        router.push("/pay");
      })
      .catch((error) => {
        Alert.alert(error?.response?.data?.error);
        setLoading(false);
        console.log("error ", error);
      });
  };

  if (loading) return <Loader text="Signing up, please wait!!" />;
  return (
    <KeyboardAvoidingView>
    <View 
    style={{  backgroundColor: Colors.green,  width:'100%', padding:10, alignItems:'center' }}>
      <Image style={{ width: 250, height: 100,  }} source={Images.logo} />
        <View>
          <Text style={{ fontSize: 25, fontFamily: 'Ubuntu', textAlign:'center', color: Colors.white }}>
            Join over 1000+ Students on passpadi
          </Text>
          <Text style={{ fontSize: 13, fontFamily: 'Raleway', textAlign:'center', color: Colors.white }}>
            Let's get you started in few minutes
          </Text>
          </View>
          <ScrollView 
          style={{ width:'100%'}}
          >
            <FormField
              title="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}          
              placeholder="Enter your  Email"
            />
            <FormField
              title="Fullname"
              value={fullname}
              onChangeText={(text) => setFullname(text)}          
              placeholder="Enter your Name"
            />
            <FormField
              title="Phone Number"
              value={phoneNumber}
              onChangeText={(text) => setPhoneNumber(text)}          
              placeholder="Enter your Phone Number"
            />
              <FormField
               title="Password"
                value={password}
                onChangeText={(text) => setPassword(text)}
                placeholder="Enter your Password"
              />
          
        <View 
        style={{ marginTop: 45, width:'100%' }}>
          <Button 
          onPress={handleLogin}
          title='Register'
          color={Colors.yellow}
          textColor={Colors.black} />
        </View>
          </ScrollView>
        <Pressable onPress={() => router.navigate('/(auth)/signin')} style={{ marginTop: 10 }}>
          <Text style={{ textAlign: "center", color: Colors.white, fontFamily: 'SpaceGM', fontSize: 12 }}>
            Already have an account? 
            <Text style={{ fontWeight: "500", marginLeft:5, color: "#007FFF" }}>
              Login Here
            </Text>
          </Text>
        </Pressable>
        <Pressable onPress={() => router.navigate('https://www.passpadi.com/privacy')} style={{ marginTop: 10 }}>
            <Text style={{ textAlign:'center', textDecorationLine:'underline', fontFamily: 'SpaceGM', color:Colors.white }}>
             Our  Privacy and Policy
            </Text>
        </Pressable>
      </View>
      </KeyboardAvoidingView>

  );
};

export default Signup;

const styles = StyleSheet.create({});
