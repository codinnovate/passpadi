import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { server } from "@/server";
import Images from "@/constants/Images";
import Loader from "@/components/Loader";

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
     }
    checkLoginStatus();
  }, []);

  const checkFields = () => {
    if(!email || !password){
      Alert.alert("Please Fill All the Fields")
      setLoading(false)
    }
  }
  const handleLogin = () => {
    checkFields();
    const user = {
      email: email,
      password: password,
    };
    
    axios
      .post(`${server}/signin`, user)
      .then((response) => {
        const data = response.data
        console.log(data);
        const token = data.access_token;
        const username = data.username;
        const role = data.role
        setLoading(false)
        AsyncStorage.setItem("authToken", token);
        console.log(token)
        AsyncStorage.setItem("username", username);
        AsyncStorage.setItem("role", role);
        router.push("/home");
      })
      .catch((error) => {
        Alert.alert("Login error");
        setLoading(false)
        console.log("error ", error);
      });
  };

  if(loading) return <Loader text="Signing in, please wait!!" />
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}
    >
      <View style={{ marginTop: 50 }}>
        <Image
          style={{ width: 150, height: 100, resizeMode: "contain" }}
          source={Images.logo}
        />
      </View>

      <KeyboardAvoidingView>
        <View style={{ }}>
          <Text style={{ fontSize: 23, fontFamily:'Ubuntu', marginTop: 25 }}>
            Login
          </Text>
          <Text style={{ fontSize: 15, fontFamily:'Raleway'}}>
            Enter Your Passpadi Credentials here
          </Text>
        </View>

        <View style={{ marginTop: 40 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              paddingVertical: 5,
              borderRadius: 5,
            }}
          >
            <MaterialIcons
              style={{ marginLeft: 8 }}
              name="email"
              size={24}
              color="gray"
            />
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholderTextColor={"gray"}
              style={{
                color: "gray",
                marginVertical: 10,
                width: 300,
                fontSize: email ? 16 : 16,
              }}
              placeholder="enter your Email"
            />
          </View>

          <View style={{ marginTop: 30 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                paddingVertical: 5,
                borderRadius: 5,
              }}
            >
              <AntDesign
                style={{ marginLeft: 8 }}
                name="lock"
                size={24}
                color="gray"
              />
              <TextInput
                secureTextEntry={true}
                value={password}
                onChangeText={(text) => setPassword(text)}
                placeholderTextColor={"gray"}
                style={{
                  color: "gray",
                  marginVertical: 10,
                  width: 300,
                  fontSize: password ? 16 : 16,
                }}
                placeholder="enter your Password"
              />
            </View>
          </View>

        </View>

        <View style={{ marginTop: 45 }} />

        <TouchableOpacity
          onPress={handleLogin}
          style={{
            width: 320,
            backgroundColor: "black",
            padding: 15,
            marginTop: 40,
            marginLeft: "auto",
            marginRight: "auto",
            borderRadius: 20,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 16,
              color: "white",
            }}
          >
            Login
          </Text>
        </TouchableOpacity>

        <Pressable
          onPress={() => router.navigate('https://www.passpadi.com/signup')}
          style={{ marginTop: 10 }}
        >
          <Text style={{ textAlign: "center", fontSize: 16 }}>
            Don't have an account?  <Text style={{ fontWeight: "500", color: "#007FFF" }}>
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
