import { View, Text, SafeAreaView,StyleSheet } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'
import SubCard from '@/components/SubCard'
import Images from '@/constants/Images'





const cards = [
  {name:"math", link:"home/math", image:Images.math},
  {name:"english", link:"home/english", image:Images.english},
  {name:"General Paper", link:"home/gpaper", image:Images.gpaper},
  {name:"Cbt", link:"cbt", image:Images.cbt},
]


const Home = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor:Colors.white}}>
      <View style={styles.container}>
      <View >
        <Text style={styles.text}>Hello</Text>
        <Text style={[styles.text, styles.username]}>Brooklyn Simmons</Text>
      </View>
      <Text style={styles.bigText}>What Subjects do you Want to improve on today ?</Text>
      <View style={styles.cards}>
        {/* subjects and cbts */}
       {
       cards.map((card, index) => (
         <SubCard  
         key={index}
         link={card.link}
         image={card.image}
         text={card.name}
         />
       ))
      }
      </View>
      </View>
    </SafeAreaView>
  )
}



const styles = StyleSheet.create({
  container:{
      padding:20,
      display:'flex',
      gap:30,
  },
  text:{
    color:Colors.black,
    fontFamily:'SpaceGM'
  },
  username:{
    fontSize:24,
    fontWeight:'bold'
  },
  bigText:{
    fontFamily:'SpaceGM',
    fontSize:35,
    letterSpacing:-1,
    color:Colors.green,

  },
  cards:{
    display:'flex',
    flexDirection:'row',
    gap:10,
    flexWrap:'wrap'
  }

})


export default Home