import Colors from "./Colors"
import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
    button:{
        borderRadius:10,
        padding:10,
        display:'flex',
        justifyContent:'center',

    },
    buttonText:{
        fontFamily:'Ubuntu',
        textAlign:'center',
        fontSize:16,
    },
    label: {
        marginBottom: 5,
        fontSize:15,
        color:Colors.green,
        fontFamily:'SpaceGM',
    },
    avatar:{
        width:20,
        height:20,
        borderRadius:60,
    },
    fullname:{
    color:Colors.white,
    fontFamily:'Ubuntu',
    },
    username:{
        color:Colors.gray,
        fontFamily:'Raleway',
    },
    
  back: {
    borderColor: Colors.green,
    borderWidth: 1,
    width:130,
    padding:10,
    borderRadius: 30,
  },
  text: {
    color: Colors.green,
    fontSize: 17,
    fontFamily: 'Ubuntu',
    textAlign: 'center',
  },
  answerDetail: {
    marginTop: 25,
      height: 200,
      width: '100%',
  },
  next: {
    backgroundColor: Colors.green,
    width:130,
    padding:10,
    borderRadius: 30,
  },
  skip: {
    borderColor: Colors.green,
    borderWidth: 1,
    paddingVertical: 13,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  buttonContainer: {
    width: '100%',
    position: 'absolute',
    bottom:0,
    borderRadius: 5,
    zIndex:9999,
    backgroundColor: Colors.white,
  },
  buttonWrapper: {
    display: 'flex',
    flexDirection: 'row',
    width:'100%',
    justifyContent: 'space-between',
  },
})