import { View, Text, SafeAreaView,StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React , {useContext, useEffect, useState} from 'react'
import Colors from '@/constants/Colors'
import SubCard from '@/components/SubCard'
import Images from '@/constants/Images'
import { Fontisto} from '@expo/vector-icons'
import { Link, router } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Button from '@/components/Button'



const cards = [
  {name:"Math", link:"home/mathematics", image:Images.math, bgColor:'#f8f899'},
  {name:"English", link:"home/english", image:Images.english, bgColor:'#f55f99'},
  {name:"General Paper", link:"home/general-paper", image:Images.gpaper , bgColor:'#55ff99'},
  {name:"Cbt", link:"/cbt", image:Images.cbt , bgColor:'#f9f933'},
]


const Home = () => {
  const [user, setUser] = useState('')
  const [role, setRole] = useState('')
  // const {userAuth, userAuth:{ access_token, profile_img, username }} = useContext(UserContext);
  const getUser = async () => {
    const username = await AsyncStorage.getItem("username")
    const userRole = await AsyncStorage.getItem("role")
    setRole(userRole)
    setUser(username);
  }

  useEffect(() => {
    getUser();
  })

const Logout  = async () => {
    const token = await AsyncStorage.removeItem("authToken")
    console.log(token)
    router.navigate('(auth)/signin')
  } 
  return (
    <>
    {/* <HomeScreen /> */}
    <View style={{ flex: 1, width:'100%', marginTop:20, backgroundColor:Colors.white}}>
      <View style={styles.header}>
      <View>
        <Text style={styles.text}>Hello,</Text>
        <Text style={styles.username}>@{user ? user : 'Genius'}</Text>
      </View>

      <TouchableOpacity
        onPress={Logout}
       style={{backgroundColor:Colors.red, borderRadius:10, justifyContent:'center', paddingHorizontal:10}}>
        <Text style={{fontFamily:'Raleway', color:Colors.white, fontSize:15}}>Logout</Text>
      </TouchableOpacity>

      </View>
       <ScrollView>

      <View style={styles.container}>
      {/* <Text style={styles.bigText}>See What Students are saying in the community?</Text>
      <Button 
      onPress={() => router.navigate('/threads')}
      title='Go to Community'
      color={Colors.yellow}
      textColor={Colors.black}
      
      /> */}

      <Text style={styles.bigText}>What Subjects do you Want to improve on today ?</Text>
      {role === 'user' && (
      <TouchableOpacity 
       onPress={() => router.push('https://www.passpadi.com/pay-for-app')}
       style={styles.activate}>
        <View style={{}}>
          <Text style={{marginBottom:20, fontFamily:'Ubuntu', fontSize:15}}>Activate App</Text>
          <Text style={{fontFamily:'SpaceGM', fontSize:16, color:Colors.white}}>Unlock full access to Cbt Practice, free airtimes rewards, no ads, and future airdrops</Text>
        </View>
      </TouchableOpacity>
      )}

      <View style={styles.cards}>
        {/* subjects and cbts */}
       {
         cards.map((card, index) => (
           <SubCard
           bgColor={card.bgColor}  
           key={index}
           link={card.link}
           image={card.image}
           text={card.name}
           />
          ))
        }
      </View>
      <View
       style={styles.whatsapp}>
        
        <Text style={{fontSize:20, fontFamily:'Raleway', color:'white' }}>Join Unilag Whatsapp  {'\n'}Group for Updates</Text>
        <Link href='https://chat.whatsapp.com/CZ9ilb1DQZR49k8UizskAl'>
        <Fontisto name="whatsapp" size={50} color="white" />
        </Link>
      </View>
      </View>
        </ScrollView>
    </View>
         </>
  )
}



const styles = StyleSheet.create({
  header:{
    flexDirection:'row',
    justifyContent:'space-between',
    borderBottomLeftRadius:30,
    borderBottomRightRadius:30,
    paddingTop:50,
    paddingBottom:20,
    padding:10,
    width:'100%',
    backgroundColor:'#f5f5f5'
  },
  container:{
      width:'100%',
      paddingHorizontal:10,
      display:'flex',
      gap:10,
  },
  text:{
    color:Colors.black,
    fontFamily:'Ubuntu',
    fontSize:15,
    marginBottom:-10,
  },
  username:{
    marginTop:5,
    fontSize:24,
    fontFamily:'SpaceGM'
  },
  bigText:{
    fontFamily:'Ubuntu',
    fontSize:20,
    letterSpacing:-1,
    marginTop:20,
    color:Colors.green,

  },
  cards:{
    display:'flex',
    width:'100%',
    flexDirection:'row',
    justifyContent:'space-between',
    gap:10,
    flexWrap:'wrap'
  },
  whatsapp:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-evenly',
    alignItems:'center',
    borderRadius:20,
    padding:10,
    width:'100%',
    height:140,
    backgroundColor:'#25D366',
    marginBottom:20
  },
  activate:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-evenly',
    alignItems:'center',
    borderRadius:5,
    borderBottomLeftRadius:20,
    borderTopRightRadius:20,
    padding:10,
    width:'100%',
    height:120,
    backgroundColor:'#25D366',
    marginBottom:20
  }

})


export default Home