import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import { AddLoginToStore } from '../reducers/user';

export default function HomeScreen({ navigation }) {

  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');

  const handleConnection = () => {
console.log('coucou');

    fetch('http://10.20.2.120:3000/user/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: signInEmail, password: signInPassword }),
    }).then(response => response.json())
      .then(data => { 
        console.log(data)
        if (data.result) {
          dispatch(AddLoginToStore({ email: signInEmail, token: data.token }));
          setSignInEmail('');
          setSignInPassword('');
          
        }
      });
  };


 return (
   <View style={styles.container}>
   <View style={styles.blockHaut}>
   <Text style={styles.title}>CONNECTION</Text>
     </View>

  <View style= {styles.blockMillieu}>
<TextInput placeholder="email"style={styles.input1} onChangeText={value => setSignInEmail(value)} value={signInEmail} />
<TextInput placeholder="motdepasse"style={styles.input1} onChangeText={value => setSignInPassword(value)} value={signInPassword} /> 
</View>

   <View style={styles.blockBas}>
      <TouchableOpacity style={styles.button1}>
        <Text style={styles.button} onPress={() => handleConnection()} >CONNECTION</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button2}>
        <Text style={styles.textButton} onPress={() => navigation.navigate('Home')} >Mot de passe oublié?</Text>
      </TouchableOpacity>
    </View>

  </View>
 );
}

const styles = StyleSheet.create({
    background: {
    width: "100%",
    height: "100%",
},

blockHaut:{


width:'100%',
alignItems:'center',
fontWeight:'bold',
height:'30%',
justifyContent:'center',
},



 container:{
   
    flex:1,
    marginTop: '20%',
    },

title: {
    fontSize:39,
    fontWeight:'bold',
    fontFamily: "Futura",
    marginBottom: 50,
  },
  button1 : {
    alignItems: "center",
 justifyContent:'center',
    width: "60%",
    height:'15%',
    marginTop: 30,
    backgroundColor: "#B14A73",
    borderRadius: 15,

    fontSize:'20px',

   
  },
  input1:{
borderWidth:1,
width:'80%',
height:'15%',
  },
  blockMillieu:{
   justifyContent:'space-around',
  marginLeft:'10%',
   height: '30%',
   width:'80%',
  alignItems:'center',
 

  },

  button2 : {
    alignItems: "center",
    paddingTop: 8,
  
    marginTop: 30,
   
    borderRadius: 1,
    fontSize:'20px',
    borderBottomWidth:1,
    borderBottomColor:'#008e9b',
  
    marginBottom:'50%',
  },

blockBas:{
    alignItems:'center',
    fontSize:'20px',
  

},
input2:{
    borderWidth:1,
    
      },

//  button: {
//         fontFamily: "Futura",
//         fontWeight:'bold',
//         fontSize:30,
//         color: 'white',
       
//      },
textButton:{
fontSize:15,
color:'#008e9b',
borderBottomWidth:1,
borderBottomColor:'#008e9b',

}

    })