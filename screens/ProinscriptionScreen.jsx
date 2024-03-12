import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { useState } from 'react';
import { setCompany_name, setDescription, setSpecialities  } from '../reducers/inscription';
import { useDispatch, useSelector } from 'react-redux';




export default function ProinscriptionScreen({ navigation }) {
        console.log('yooooooooooooo');

        const dispatch = useDispatch();
        const inscriptionInfo = useSelector(state => state.inscription.value)
        const [error, setError] = useState('')
    const handleRegisterPro = () => {

        // fetch('http://10.20.2.120:3000/user/signup', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ 
        //         firstName: inscriptionInfo.firstName,
        //         lastName: inscriptionInfo.lastName,
        //         email: inscriptionInfo.email,
        //         password: inscriptionInfo.password,
        //         isPro: inscriptionInfo.isPro,
        //         company_name: inscriptionInfo.company_name, 
        //         description: inscriptionInfo.description , 
        //         specialities: inscriptionInfo.specialities, 

        //  }),
        // }).then(response => response.json())
        console.log(inscriptionInfo.company_name, inscriptionInfo.description, inscriptionInfo.specialities);
        if(inscriptionInfo.company_name !== '' && inscriptionInfo.description !== '', inscriptionInfo.specialities !== ''){
            setError('')
            navigation.navigate('Document')
        } else {
            setError('Tout les champs ne sont pas remplis')
        }
        
      };



      return (
    <View style={styles.container}>
        <Text>INSCRIPTION</Text>
        <View style={styles.bloc}>
            <TextInput placeholder="Nom de la société" style={styles.input1}
                    onChangeText={(value) => dispatch(setCompany_name(value))}
                    value={inscriptionInfo.company_name} />
            <TextInput placeholder="Description" style={styles.input1}
                    onChangeText={(value) => dispatch(setDescription(value))}
                    value={inscriptionInfo.description} />
            <TextInput placeholder="Spécialités" style={styles.input1}
                    onChangeText={(value) => dispatch(setSpecialities(value))}
                    value={inscriptionInfo.specialities} />

            <TouchableOpacity style={styles.button1}>
                    <Text style={styles.textButton1} onPress={() => handleRegisterPro()}>S'INSCRIRE</Text>
            </TouchableOpacity>

            <Text style={styles.error}>{error}</Text>
        </View>

    </View>

      )
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'red',
        height: '80%',
        width: '80%',
    },
    bloc: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'red',
        height: '80%',
        width: '80%',
    }, 
    input1: {
        borderWidth: 1,
        borderColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
    },
    error: {
        color: 'red'
    }

})