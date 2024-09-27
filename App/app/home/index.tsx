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
  {name:"Cbt", link:"/cbt", image:Images.cbt , bgColor:'#f9f933'},
  {name:"Math", link:"home/mathematics", image:Images.math, bgColor:'#f8f899'},
  {name:"English", link:"home/english", image:Images.english, bgColor:'#f55f99'},
  {name:"Biology", link:"home/biology", image:Images.dna, bgColor:'#f88f99'},
  {name:"Physics", link:"home/physics", image:Images.physics, bgColor:'#ffff2f'},
  {name:"chemistry", link:"home/chemistry", image:Images.chemistry, bgColor:'#f5f699'},
  {name:"General Paper", link:"home/general-paper", image:Images.gpaper , bgColor:'#55ff99'},

]

const Home = () => {
  const [user, setUser] = useState('')
  const [role, setRole] = useState('')
  // const {userAuth, userAuth:{ access_token, profile_img, username }} = useContext(UserContext);
  const getUser = async () => {
    const username = await AsyncStorage.getItem("username")
    console.log(username)
    const userRole = await AsyncStorage.getItem("role")
    setRole(userRole)
    setUser(username);
  }

  useEffect(() => {
    getUser();
  })

 const Logout  = async () => {
    await AsyncStorage.removeItem("authToken")
    await AsyncStorage.removeItem("username");
    await AsyncStorage.removeItem("role");
    await AsyncStorage.removeItem("userId");
    router.push('(auth)/signin')
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
      <Text style={styles.bigText}>See What Students are saying in the community?</Text>
      <Button 
      onPress={() => router.navigate('https://passpadi.com/')}
      title='Go to Community'
      color={Colors.yellow}
      textColor={Colors.black}
      
      />

      <Text style={styles.bigText}>What Subjects do you Want to improve on today ?</Text>
      {role === 'user' && (
      <TouchableOpacity 
       onPress={() => router.push('https://www.passpadi.com/pay-for-app')}
       style={styles.activate}>
        <View style={{}}>
          <Text style={{marginBottom:20, fontFamily:'Ubuntu', color:Colors.black, fontSize:15}}>Activate App</Text>
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
        
        <Text style={{fontSize:20, fontFamily:'Raleway', color:'white' }}>Join Post UTME Whatsapp  {'\n'}Group for Updates and Classes</Text>
        <Link href='https://chat.whatsapp.com/Dtq2S8kV9z27mY1VyIUzxl'>
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
    fontSize:17,
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
    borderRadius:20,
    borderBottomLeftRadius:0,
    borderTopRightRadius:0,
    padding:10,
    width:'100%',
    height:120,
    backgroundColor:Colors.red,
    marginBottom:20
  }

})


export default Home