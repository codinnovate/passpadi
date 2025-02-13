import Colors from "./Colors"

export const style = {
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
    },
    
  back: {
    borderColor: Colors.green,
    borderWidth: 1,
    paddingVertical: 13,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  text: {
    color: Colors.green,
    fontSize: 23,
    fontFamily: 'Ubuntu',
    textAlign: 'center',
  },
  answerDetail: {
    marginTop: 25,
  },
  next: {
    backgroundColor: Colors.green,
    paddingVertical: 13,
    paddingHorizontal: 40,
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
    // padding: 10,
    marginLeft:20,
    marginTop:10,
    zIndex:99,
    backgroundColor: Colors.white,
    // bottom:0,
    top:0,
  },
  buttonWrapper: {
    display: 'flex',
    flexDirection: 'row',
    width:'100%',
    justifyContent: 'space-between',
  },
}