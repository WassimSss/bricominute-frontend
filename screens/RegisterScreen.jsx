import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, TouchableWithoutFeedback } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { setFirstName, setLastName, setEmail, setPassword, setConfirmPassword, setIsPro, reset } from '../reducers/inscription';
import { FontAwesome } from '@expo/vector-icons';
import { AddLoginToStore } from '../reducers/user';
import { LinearGradient } from 'expo-linear-gradient';





export default function RegisterScreen({ navigation }) {
    const [checked, setChecked] = useState(false);
    const [signUpFirstName, setSignUpFirstName] = useState('');
    const [signUpLastName, setSignUpLastName] = useState('');
    const [signUpEmail, setSignUpEmail] = useState('');
    const [signUpPassword, setSignUpPassword] = useState('');

    console.log('register');
    const user = useSelector((state) => state.user.value);


    const dispatch = useDispatch();
    const inscriptionInfo = useSelector(state => state.inscription.value)
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');


    console.log(user);
    useEffect(() => {
        if (user.isPro === true) {
            navigation.navigate('Pro');
        } else if (user.isPro === false) {
            // Si c'est un particulier
            navigation.navigate('TabNavigator');
        } else {
            // Si il est pas connecté
            navigation.navigate('Inscription');
        }
    }, [user.token]);


    const handleRegister = () => {
        if (inscriptionInfo.password !== inscriptionInfo.confirmPassword) {
            setErrorMessage("La confirmation du mot de passe ne correspond pas au mot de passe saisi.");
        } else {
            setErrorMessage(''); // Effacer le message d'erreur s'il y en avait un précédemment

            if (inscriptionInfo.isPro) {
                fetch(`http://10.20.2.115:3000/user/testAlreadyExist/${inscriptionInfo.email}`)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        if (data.result) {
                            navigation.navigate('Insciptionpro');
                        } else {
                            setErrorMessage(data.error)
                        }
                    })
            } else {
                fetch(`http://10.20.2.115:3000/user/signup`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        firstName: inscriptionInfo.firstName,
                        lastName: inscriptionInfo.lastName,
                        email: inscriptionInfo.email,
                        password: inscriptionInfo.password,
                        isPro: inscriptionInfo.isPro,
                    }),
                }).then(response => response.json())
                    .then((data) => {
                        console.log('data : ', data);
                        if (data.result) {
                            dispatch(AddLoginToStore({ email: inscriptionInfo.email, token: data.token, isPro: inscriptionInfo.isPro }))
                            // dispatch(reset())
                            // navigation.navigate('TabNavigator');
                            console.log(data);
                        } else {
                            setErrorMessage(data.error)
                        }
                        console.log('test : ', data);

                    }
                    )

            }
        }
    };




    return (

        <View style={styles.container}>
            <View style={styles.blocHaut1}>
                <Text style={styles.title1}>Bienvenue !</Text>
                <Text style={styles.title2}>Créer un </Text>
                <Text style={styles.title2}>compte</Text>
            </View>
            <View style={styles.blocHaut2}>
                <TextInput placeholder="Nom" style={styles.input1}
                    onChangeText={(value) => dispatch(setFirstName(value))}
                    value={inscriptionInfo.firstName} />
                <TextInput placeholder="Prénom" style={styles.input1}
                    onChangeText={(value) => dispatch(setLastName(value))}
                    value={inscriptionInfo.lastName} />
            </View>
            <View style={styles.blocHaut3}>
                <TextInput placeholder="Email" style={styles.input2}
                    onChangeText={(value) => dispatch(setEmail(value))}
                    value={inscriptionInfo.email} />
                <View style={styles.passwordInputContainer}>
                    <TextInput placeholder="Mot de passe" style={styles.passwordInput}
                        onChangeText={(value) => dispatch(setPassword(value))}
                        value={inscriptionInfo.password}
                        secureTextEntry={!showPassword} />
                    <TouchableWithoutFeedback onPress={() => setShowPassword(!showPassword)}>
                        <FontAwesome name={showPassword ? 'eye' : 'eye-slash'} size={24} color="#786396" />
                    </TouchableWithoutFeedback>
                </View>

                <View style={styles.passwordInputContainer}>
                    <TextInput
                        placeholder="Confirmer mot de passe"
                        style={styles.passwordInput}
                        onChangeText={(value) => dispatch(setConfirmPassword(value))}
                        value={inscriptionInfo.confirmPassword}
                        secureTextEntry={!showConfirmPassword}
                    />
                    <TouchableWithoutFeedback onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                        <FontAwesome name={showConfirmPassword ? 'eye' : 'eye-slash'} size={24} color="#786396" />
                    </TouchableWithoutFeedback>
                </View>
            </View>
            <Text style={styles.title3}>Je suis :</Text>

            <View style={styles.blocHaut4}>

                <RadioButton
                    value="first"
                    status={inscriptionInfo.isPro === false ? 'checked' : 'unchecked'}
                    onPress={(value) => dispatch(setIsPro(false))}
                    color='#786396' />
                <Text style={styles.text2} >Particulier</Text>

                <RadioButton
                    value="second"
                    status={inscriptionInfo.isPro === true ? 'checked' : 'unchecked'}
                    onPress={(value) => dispatch(setIsPro(true))}
                    color='#786396' />
                <Text style={styles.text2} >Professionnel</Text>

            </View>


            <View style={styles.blocBoutons}>
                <LinearGradient
                    // Button Linear Gradient
                    colors={['#407CB8', '#B14A73']}
                    style={styles.button}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                    <TouchableOpacity>
                        <Text style={styles.textButton1} onPress={() => handleRegister()}>S'INSCRIRE</Text>
                    </TouchableOpacity>
                </LinearGradient>

                {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}

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
        alignItems: 'center'
    },

    blocHaut1: {
        height: '30%',
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: '8%'
    },

    blocHaut2: {
        height: '10%',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },

    blocHaut3: {
        height: '30%',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center'
    },

    blocHaut4: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        alignItems: 'center'
    },

    title1: {
        fontSize: 20,
        color: 'black'
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
    title2: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'black'
    },

    title3: {
        fontSize: 15,
        color: 'black'
    },

    title4: {
        fontSize: 15,
    },

    input1: {
        borderWidth: 1,
        borderColor: '#808B96',
        height: '35%',
        width: '30%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    input2: {
        borderWidth: 1,
        borderColor: '#808B96',
        height: '15%',
        width: '80%'
    },

    blocBoutons: {
        justifyContent: 'space-around',
        height: '25%',
        width: '100%',
        alignItems: 'center',
        padding: '8%'
    },

    button1: {
        alignItems: 'center',
        backgroundColor: '#786396',
        borderRadius: 15,
        height: '25%',
        width: '60%',
        justifyContent: 'center'
    },

    button2: {
        alignItems: 'center',
        borderRadius: 10,
        height: '25%',
        width: '60%',
        justifyContent: 'center'
    },

    text2: {
        color: '#786396',
        fontWeight: 'bold'
    },

    textButton1: {
        fontSize: 25,
        color: 'white',
        fontWeight: 'bold'
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
    passwordInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#808B96',
        borderWidth: 1,
        height: '15%',
        width: '80%',
        paddingRight: 10,
    },
    passwordInput: {
        flex: 1,
    },
    errorMessage: {
        color: 'red',
        marginTop: 5,
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
        backgroundColor: '#786396',
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
        color: '#786396',
        fontWeight: 'bold',
    },

    textButton1: {
        fontSize: 25,
        color: 'white',
        fontWeight: 'bold',
    },

    textButton2: {
        fontSize: 15,
        fontWeight: 'bold',
        borderBottomWidth: 1,
        borderBottomColor: '#786396',
    },
    button: {
        paddingHorizontal: 15,
        paddingVertical: 8,
        // backgroundColor: "#786396",
        borderRadius: 15,
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    textButtonRadiant: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
    },



})
