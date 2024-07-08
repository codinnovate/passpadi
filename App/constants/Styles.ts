import Colors from "./Colors"
import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
    button:{
        borderRadius:10,
        padding:10,
    },
    buttonText:{
        fontFamily:'Raleway',
        color:Colors.white,
        textAlign:'center',
    },
    label: {
        marginBottom: 10,
        fontFamily:'Raleway',
    },
})