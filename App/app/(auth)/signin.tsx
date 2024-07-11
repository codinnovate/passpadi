import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, Image, KeyboardAvoidingView, TextInput, Pressable, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { server } from "@/server";
import Images from "@/constants/Images";
import Loader from "@/components/Loader";
import Colors from "@/constants/Colors";
import Button from "@/components/Button";
import * as Device from 'expo-device';

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
        Alert.alert("Login error", error.message);
        setLoading(false);
        console.log("error ", error);
      });
  };

  if (loading) return <Loader text="Signing in, please wait!!" />;
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.green, alignItems: "center" }}>
      <Image style={{ width: 250, height: 150, marginTop: 20 }} source={Images.logo} />
      <KeyboardAvoidingView>
        <View>
          <Text style={{ fontSize: 25, fontFamily: 'Ubuntu', marginTop: 25, color: Colors.white }}>
            Login
          </Text>
          <Text style={{ fontSize: 18, fontFamily: 'Raleway', color: Colors.white }}>
            Enter Your Passpadi Username and Password
          </Text>
        </View>
        <View style={{ marginTop: 40 }}>
          <View style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
            borderColor: "#D0D0D0",
            borderWidth: 1,
            paddingVertical: 5,
            borderRadius: 10,
          }}>
            <MaterialIcons style={{ marginLeft: 8 }} name="email" size={24} color="white" />
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholderTextColor={Colors.yellow}
              style={{
                color: Colors.white,
                width: 300,
                height: '100%',
                paddingVertical: 5,
                fontSize: 16,
              }}
              placeholder="Enter your Passpadi Email"
            />
          </View>
          <View style={{ marginTop: 30 }}>
            <View style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              paddingVertical: 5,
              borderRadius: 10,
            }}>
              <MaterialIcons style={{ marginLeft: 8 }} name="lock" size={24} color="white" />
              <TextInput
                // secureTextEntry={true}
                value={password}
                onChangeText={(text) => setPassword(text)}
                placeholderTextColor={Colors.yellow}
                style={{
                  color: "white",
                  paddingVertical: 5,
                  width: 300,
                  fontSize: 16,
                }}
                placeholder="Enter your Password"
              />
            </View>
          </View>
        </View>
        <View style={{ marginTop: 45 }}>
          <Button onPress={handleLogin} title='Login' color={Colors.yellow} textColor={Colors.black} />
        </View>
        <Pressable onPress={() => router.navigate('https://www.passpadi.com/signup')} style={{ marginTop: 10 }}>
          <Text style={{ textAlign: "center", color: Colors.white, fontFamily: 'Raleway', fontSize: 16 }}>
            Don't have an account? 
            <Text style={{ fontWeight: "500", color: "#007FFF" }}>
              Register Here
            </Text>
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Signin;

const styles = StyleSheet.create({});
