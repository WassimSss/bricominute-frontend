import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function HomeScreen({ navigation }) {


 return (
   <View style={styles.container}>
   <View style={styles.blockHaut}>
   <Text style={styles.title}>CONNECTION</Text>
     </View>

  <View style= {styles.blockMillieu}>
<TextInput placeholder="email"style={styles.input1}/>
<TextInput placeholder="motdepasse"style={styles.input1}/>
</View>

   <View style={styles.blockBas}>
 
   </View>

    
      
     <TouchableOpacity style={styles.button1}>
    <Text style={styles.button}>CONNECTION</Text>
     </TouchableOpacity>

     <TouchableOpacity style={styles.button2}>
    <Text style={styles.button}>Mot de passe oublié?</Text>
     </TouchableOpacity>
   </View>
 );
}

const styles = StyleSheet.create({
    background: {
    width: "100%",
    height: "100%",
},

blockHaut:{

borderWidth:3,
borderColor:'red',
width:'100%',
alignItems:'center',
fontWeight:'bold',
},



 container:{
   
    flex:1,
    marginTop: '20%',
    },

title: {
    fontSize:29,
    
    fontFamily: "Futura",
    marginBottom: 50,
  },
  button1 : {
    alignItems: "center",
    paddingTop: 25,
    width: "100%",
    marginTop: 30,
    backgroundColor: "#B14A73",
    borderRadius: 1,
    fontSize:'20px',
   
  },
  input1:{
borderWidth:1,

  },
  blockMillieu:{
   justifyContent:'center', 
   margin:'10%',
   height: '60%',
   width:'100%',
 alignItems:'center',
 borderWidth:2,
 borderColor:'blue',
padding:'25%',
  },

  button2 : {
    alignItems: "center",
    paddingTop: 8,
    width: "100%",
    marginTop: 30,
    height:'60%',
    borderRadius: 1,
    fontSize:'20px',
  },

blockBas:{
    alignItems:'center',
    fontSize:'20px',
    borderWidth:1,
   borderColor:'green',
},
input2:{
    borderWidth:1,
    
      },

 textButton: {
        fontFamily: "Futura",
        height: 30,
        fontWeight: "600",
        fontSize:'80%',
       
     }
    })

