import { View, Text, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, router } from 'expo-router'
import Button from '@/components/Button'
import { style } from '@/constants/Styles'
import axios from 'axios'
import { server } from '@/server'
import AsyncStorage from '@react-native-async-storage/async-storage'



const checkPayment = async () => {
    const access_token = await AsyncStorage.getItem("authToken")
    if (access_token === null) {
        router.push('/signin')
    }
    try {
        const response = await axios.post(`${server}/check-role`, {
            headers: {
                Authorization: `Bearer ${access_token}`
              }
        })
        if (response.data.role === 'paidUser') {
            await AsyncStorage.setItem("authToken", 'paidUser')
        } else {
            Alert.alert('Payment not made yet, please make the payment first or contact support if  you have')
        }
    } catch (error) {
        console.log(error)
        Alert.alert('Error occured, please make the payment first or contact support')
    }
    // TODO: Implement logic to check if user has paid for the app.
    // If yes, set the user role to paidUser. If no, show a message, your app has not been activated yet pls contact support.
}
const Pay = () => {
  return (
    <SafeAreaView style={{padding:10, gap:10, height:'100%', justifyContent:'space-between'}}>
      <Text style={[style.bigText, {marginTop:40}]}>Congratulations on your first step to gaining admission this year</Text>
      <Text>
        The passpadi Team has put in alot of effort in most expecially in uploading various questions on this,
         so we charge a sum of ₦1,000 token just for our effort.</Text>
        <View style={{gap:5}}>
            <Button
            title='Check Play Store Reviews'
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
                </View>
            </View>
        </View>
        <View style={{gap:10}}>
            <Text>
                Click the button below to confirm your payment and start your exam preparation
            </Text>
            <Button 
            title='I Have made Payment, Activate App'
            onPress={checkPayment} 
            />
        </View>
    </SafeAreaView>
  )
}

export default Pay