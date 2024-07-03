import { View, Text, SafeAreaView,StyleSheet, ScrollView } from 'react-native'
import React , {useContext} from 'react'
import Colors from '@/constants/Colors'
import SubCard from '@/components/SubCard'
import Images from '@/constants/Images'
import { Fontisto} from '@expo/vector-icons'
import { Link } from 'expo-router'
import ActivationContext from '@/context/ActivationContext'




const cards = [
  {name:"Math", link:"home/math", image:Images.math, bgColor:'#f8f899'},
  {name:"English", link:"home/english", image:Images.english, bgColor:'#f55f99'},
  {name:"General Paper", link:"home/gpaper", image:Images.gpaper , bgColor:'#55ff99'},
  {name:"Cbt", link:"cbt", image:Images.cbt , bgColor:'#f9f933'},
]


const Home = () => {
  const { isActivated } = useContext(ActivationContext);

  return (
    <View style={{ flex: 1, width:'100%', marginTop:20, backgroundColor:Colors.white}}>
      <View style={styles.avatar}>
        <Text style={styles.text}>Hello,</Text>
        <Text style={styles.username}>Grachie</Text>
      </View>
       <ScrollView>

      <View style={styles.container}>
        
      <Text style={styles.bigText}>What Subjects do you Want to improve on today ?</Text>
      {isActivated ? null : (
      <Link href='activate'>
          <Text>Activate App</Text>
      </Link>
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
      <View style={styles.whatsapp}>
        <Text style={{fontSize:20, fontFamily:'SpaceGM', color:'white' }}>Join Unilag Whatsapp  {'\n'}Group for Updates</Text>
        <Fontisto name="whatsapp" size={50} color="white" />
      </View>
      </View>
        </ScrollView>
    </View>
  )
}



const styles = StyleSheet.create({
  avatar:{
    borderRadius:30,
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
    fontFamily:'SpaceGM',
    fontSize:15,
    marginBottom:-10,
  },
  username:{
    fontSize:24,
    fontFamily:'SpaceGM'
  },
  bigText:{
    fontFamily:'SpaceGM',
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
  }

})


export default Home