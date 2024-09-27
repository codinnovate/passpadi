import { View, Text, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, router } from 'expo-router'
import Button from '@/components/Button'
import { style } from '@/constants/Styles'
import axios from 'axios'
import { server } from '@/server'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Colors from '@/constants/Colors'



const Logout  = async () => {
    await AsyncStorage.removeItem("authToken")
    await AsyncStorage.removeItem("username");
    await AsyncStorage.removeItem("role");
    await AsyncStorage.removeItem("userId");
    router.push('(auth)/signin')
  }
const Pay = () => {
  return (
    <SafeAreaView style={{padding:10, gap:10, height:'100%', justifyContent:'space-between'}}>
      <Text style={[style.bigText, {marginTop:40}]}>Congratulations on your first step to gaining admission this year</Text>
      <Text style={style.bigText}>We charge a sum of ₦1,000 token just for our effort.</Text>
        <View style={{gap:5}}>
            <Button

            title='Check Our Play Store Reviews'
            />
        </View>
        <View>
            <View style={{gap:20}}>
                <View style={{gap:5}}>
                    <Text style={style.normaltext}>
                        You can pay with paystack which is easy and automated(instantly)
                    </Text>
                    <Button
                    color='#00c3f8'
                    onPress={() => router.push('https://passpadi.com/pay-for-app')}
                    title=' Pay with Paystack' />
                </View>
                <View style={{justifyContent:'flex-start',marginTop:10, alignItems:'flex-start'}}>
                    <Text style={style.normaltext}>
                        You can also pay to opay (takes about 2mins to manually activate your account if we're not offline)
                    </Text>
                    <Text style={style.text}>
                        Account Name: Samuel Adeyemi
                    </Text>
                    <Text style={style.text}>
                        Bank/Acct No: OPay, 8085552943
                    </Text>
                    <Link

                    href='https://api.whatsapp.com/send?phone=2349031431651&text=Hi%2CGood%20day%2C%20Please%20I%20need%20help'>
                            <Text style={[style.normaltext, {color:Colors.red}]}>Contact support Here</Text>
                    </Link>
                </View>
            </View>
        </View>
        <View style={{gap:10}}>
            <Text>
                Click the button below if you have made your payment to activate your account
            </Text>
            <Button 
            title='I Have made Payment, Activate App'
            onPress={Logout} 
            />
        </View>
    </SafeAreaView>
  )
}

export default Pay