import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { RadioButton } from 'react-native-paper';


export default function RegisterScreen({ navigation }) {

    const [checked, setChecked] = useState('first');


 return (

    <View style={styles.container}>
        <View style={styles.blocHaut1}>
            <Text style={styles.title1}>Bienvenue !</Text>
            <Text style={styles.title2}>Créer un </Text>
            <Text style={styles.title2}>compte</Text>
        </View>      
        <View style={styles.blocHaut2}>
            <TextInput placeholder="Nom" style={styles.input1} />
            <TextInput placeholder="Prénom" style={styles.input1} />
        </View>
        <View style={styles.blocHaut3}>
            <TextInput placeholder="Email" style={styles.input2} />
            <TextInput placeholder="Mot de passe" style={styles.input2} />
            <TextInput placeholder="Confirmer mot de passe" style={styles.input2} />
        </View>
        <Text style={styles.title3}>Je suis :</Text>

        <View style={styles.blocHaut4}>
       
            <RadioButton
        value="first"
        status={ checked === 'first' ? 'checked' : 'unchecked' }
        onPress={() => setChecked('first')}
        color='#b14a73'  

      /> 
      <Text style={styles.text2} >Particulier</Text>

     

      <RadioButton
        value="second"
        status={ checked === 'second' ? 'checked' : 'unchecked'}
        onPress={() => setChecked('second')}
        color='#b14a73'
      />
      <Text style={styles.text2} >Professionnel</Text>

    </View>


    <View style={styles.blocBoutons}>
      <TouchableOpacity style={styles.button1}>
            <Text style={styles.textButton1} onPress={() => navigation.navigate('Inscription')}>S'INSCRIRE</Text>
      </TouchableOpacity>
      <Text style={styles.title4}>Vous avez déjà un compte ?</Text>
      <TouchableOpacity style={styles.button2}>
            <Text style={styles.textButton2} onPress={() => navigation.navigate('Connection')}>Se connecter</Text>
      </TouchableOpacity>
      </View>

   </View>
 );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        borderWidth: 3,
        justifyContent: 'space-around',
        alignItems: 'center',


        }, 
    
    blocHaut1: {
        height: '30%',
        width: '100%',
        justifyContent: 'space-around',       
        alignItems: 'center',
        padding: '8%',

      },

    blocHaut2: {
        height: '10%',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',        
        alignItems: 'center',     



      },

    blocHaut3: {
        height: '30%',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'space-around',        
        alignItems: 'center', 

},

    blocHaut4:{
        flexDirection: 'row',    
        justifyContent: 'space-around',  
        width: '100%',
        alignItems: 'center',
    },

    
    
    title1: {
        fontSize: 20,
        color: 'black',
    },

    title2: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'black',
    },

    title3: {
        fontSize: 15,
        color: 'black',
    },

    title4: {
        fontSize: 15,
        color: '#008E9B',
    },


    input1: {
        borderWidth: 1,
        borderColor: '#808B96',
        height: '35%',
        width: '30%',
        justifyContent: 'center',       
        alignItems: 'center',
    },

    input2: {
        borderWidth: 1,
        borderColor: '#808B96',
        height: '15%',
        width: '80%',
    },

    blocBoutons: {
        justifyContent: 'space-around',  
        height: '25%',
        width: '100%',      
        alignItems: 'center',
        padding: '8%',
    },
    
      button1: {
        alignItems: 'center',
        backgroundColor: '#b14a73',
        borderRadius: 15,
        height: '25%',
        width: '60%',
        justifyContent: 'center',
    },

      button2: {
        alignItems: 'center',
        borderRadius: 10,
        height: '25%',
        width: '60%',
        justifyContent: 'center',
    },

        text2: {
            color: '#b14a73',
            fontWeight: 'bold',
        }, 
    
      textButton1: {
        fontSize: 25,
        color: 'white',
        fontWeight: 'bold',
    },

      textButton2: {
        fontSize: 15,
        color: 'white',
        fontWeight: 'bold',
        color: '#008E9B',
        borderBottomWidth: 1,
        borderBottomColor: '#008E9B',
    },
    


});