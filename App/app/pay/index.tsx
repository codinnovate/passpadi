import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, router } from 'expo-router'
import Button from '@/components/Button'
import { style } from '@/constants/Styles'

const Pay = () => {
  return (
    <SafeAreaView style={{padding:10, gap:10, height:'100%', justifyContent:'space-between'}}>
      <Text style={[style.bigText, {marginTop:40}]}>Congratulations on your first step to gaining admission this year</Text>
      <Text>
        The passpadi Team has put in alot of effort in most expecially in uploading various questions on this,
         so we charge a sum of 1,000 token just for our effort.</Text>
        <View style={{gap:5}}>
            <Button
            title='Check Play Store Reviews'
            />
        </View>
        <View>
            <Text style={style.label}>
                Making payment is easy and simple
            </Text>
            <View style={{gap:20}}>
                <View style={{gap:5}}>
                    <Text style={style.normaltext}>
                        You can pay with paystack which is easy and automated(instantly)
                    </Text>
                    <Button
                    color='#00c3f8'
                    onPress={() => router.push('https://passpadi.com.ng/pay-for-app')}
                    title=' Pay with Paystack' />
                </View>
                <View>
                    <Text style={style.normaltext}>
                        You can also pay to opay (takes about 2mins to manually activate your account if we're not offline)
                    </Text>
                    <Text>
                        Account Name: Samuel Adeyemi
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
            title='Confirm Payment and Start Learning'
            onPress={() => console.log('Payment Confirmed')} 
            />
        </View>
    </SafeAreaView>
  )
}

export default Pay