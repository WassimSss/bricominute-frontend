import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Dimensions, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity, Button } from 'react-native';
import { TextInput } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { faStar } from  '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
// import { response } from '../../../bricominute-backend/app';




export default function NotesScreen({ navigation }) {

    const user = useSelector(state => state.user.value)
    const [text, setText] = useState('Useless Text');
  const [personalNote, setPersonalNote] = useState(0);
  const [error, setError] = useState('')
    
      // Personal note
  const personalStars = [];
  for (let i = 0; i < 5; i++) {
    let style = { 'cursor': 'pointer' };
    if (i < personalNote) {
      style = { 'color': '#FFE633', 'cursor': 'pointer' };
    }
    personalStars.push(<FontAwesome key={i} name='star' size={40} onPress={() => setPersonalNote(i + 1)} style={style} className="note" />);
  }

  const confirmPaiement = () => {
    if(personalNote !== 0){
        fetch('http://10.20.2.170:3000/notation',{
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                idPro: '65eb0f7eb7e82a5f0fd66919',
                rating: personalNote,
                token: user.token,
            })
        }
        ).then(response => response.json())
        .then(data => {
            console.log(data);
        })

        // navigation.navigate('Home')
    } else {
        setError('Veuillez noter le professionnel')
    }
   

  }
    
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.notes}>Notes</Text>
            </View>
            <View>
                <View style={styles.cercle} />
            </View>
            <View>
                <Text style={styles.nom}>PIERRE CHARLES</Text>
            </View>
            
           <View style={styles.etoiles}>
                
               {personalStars}
                
            </View>
            <View style={styles.Comment}>
                <Text>Commentaires</Text>
            </View>
            <View>
                <View>
                    <TextInput
                        style={styles.rectangle}
                        onChangeText={setText}
                        value={text}
                        placeholder="Rediger votre avis"
                    />
                </View>
            </View>
            <View >
                <Text style={styles.error}>{error}</Text>
                <TouchableOpacity style={styles.CC} onPress={() => confirmPaiement()}>
                    <Text style={styles.paiement}>Confirmer le paiement</Text>
                </TouchableOpacity>
            </View>
            <View >
                <TouchableOpacity>
                    <Text style={styles.contestation}>contestations</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
    }

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        height: '70%',
        alignItems: 'center'
    },


    etoiles: {
        flexDirection: 'row'
    },

    Comment: {
        justifyContent: 'space-between'
    },


    notes: {
        height: 20,
        marginTop: 50,
        fontWeight: 'bold',
        fontSize: 20
    },

    nom: {
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 30,
    },
    etoile1: {
        color: '#786396',
    },
    etoile2: {
        color: '#786396',
    },

    etoile3: {
        color: '#786396',
    },

    etoile4: {
        color: '#786396',
    },

    cercle: {
        width: 50,
        height: 50,
        backgroundColor: '#D9D9D9',
        borderRadius: 100,
        marginTop: 40,
    },

    rectangle: {
        width: 350,
        height: 200,
        backgroundColor: '#D9D9D9',
    },
    paiement: {
        fontSize: 30,
        width: '110%',
        height: '110',
        paddingTop: 8,
        backgroundColor: '#786396',
        color: '#fff',
        borderRadius: 15,
        alignContent: 'center'
    },

    contestation: {
        color: 'red',
        borderRadius: 15,
    },
    error: {
        color: 'red'
    }
},
)

