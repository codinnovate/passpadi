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
        fontSize:18,
    },
    label: {
        marginBottom: 10,
        fontSize:20,
        fontFamily:'Raleway',
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
    }
})