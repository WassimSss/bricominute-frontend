import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { AddLoginToStore } from '../reducers/user';
// import { checkTokenAndRedirect } from '../utils/checkTokenAndRedirect';
// import { getCurrentRoute } from '../utils/getCurrentRoute';

export default function RegisterScreen({ navigation }) {
	const [ checked, setChecked ] = useState(false);
	const [ signUpFirstName, setSignUpFirstName ] = useState('');
	const [ signUpLastName, setSignUpLastName ] = useState('');
	const [ signUpEmail, setSignUpEmail ] = useState('');
	const [ signUpPassword, setSignUpPassword ] = useState('');

	console.log('register');
	const user = useSelector((state) => state.user.value);

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

	const dispatch = useDispatch();

	const handleRegister = () => {
		console.log(checked, signUpFirstName, signUpLastName, signUpEmail, signUpPassword);
		// Si l'utilisateur a sélectionné 'first', attribuer à userType la valeur 'Particulier' ;
		// sinon, attribuer la valeur 'Professionnel'". Cela est utile pour déterminer le
		//type d'utilisateur dans le processus d'inscription.

		const userType = checked === 'first' ? false : true;

		fetch('http://192.168.1.114:3000/user/signup', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				firstName: signUpFirstName,
				lastName: signUpLastName,
				email: signUpEmail,
				password: signUpPassword,
				isPro: checked
			})
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.result) {
					dispatch(AddLoginToStore({ email: signUpEmail, token: data.token, isPro: data.isPro }));
				}
			});
	};

	return (
		<View style={styles.container}>
			<View style={styles.blocHaut1}>
				<Text style={styles.title1}>Bienvenue !</Text>
				<Text style={styles.title2}>Créer un </Text>
				<Text style={styles.title2}>compte</Text>
			</View>
			<View style={styles.blocHaut2}>
				<TextInput
					placeholder="Nom"
					style={styles.input1}
					onChangeText={(value) => setSignUpFirstName(value)}
					value={signUpFirstName}
				/>
				<TextInput
					placeholder="Prénom"
					style={styles.input1}
					onChangeText={(value) => setSignUpLastName(value)}
					value={signUpLastName}
				/>
			</View>
			<View style={styles.blocHaut3}>
				<TextInput
					placeholder="Email"
					style={styles.input2}
					onChangeText={(value) => setSignUpEmail(value)}
					value={signUpEmail}
				/>
				<TextInput
					placeholder="Mot de passe"
					style={styles.input2}
					onChangeText={(value) => setSignUpPassword(value)}
					value={signUpPassword}
				/>
				<TextInput placeholder="Confirmer mot de passe" style={styles.input2} />
			</View>
			<Text style={styles.title3}>Je suis :</Text>

			<View style={styles.blocHaut4}>
				<RadioButton
					value="first"
					status={checked === false ? 'checked' : 'unchecked'}
					onPress={() => setChecked(false)}
					color="#b14a73"
				/>
				<Text style={styles.text2}>Particulier</Text>

				<RadioButton
					value="second"
					status={checked === true ? 'checked' : 'unchecked'}
					onPress={() => setChecked(true)}
					color="#b14a73"
				/>
				<Text style={styles.text2}>Professionnel</Text>
			</View>

			<View style={styles.blocBoutons}>
				<TouchableOpacity style={styles.button1}>
					<Text style={styles.textButton1} onPress={() => handleRegister()}>
						S'INSCRIRE
					</Text>
				</TouchableOpacity>
				<Text style={styles.title4}>Vous avez déjà un compte ?</Text>
				<TouchableOpacity style={styles.button2}>
					<Text style={styles.textButton2} onPress={() => navigation.navigate('Connection')}>
						Se connecter
					</Text>
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
		color: '#008E9B'
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
		backgroundColor: '#b14a73',
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
		color: '#b14a73',
		fontWeight: 'bold'
	},

	textButton1: {
		fontSize: 25,
		color: 'white',
		fontWeight: 'bold'
	},

	textButton2: {
		fontSize: 15,
		fontWeight: 'bold',
		color: '#008E9B',
		borderBottomWidth: 1,
		borderBottomColor: '#008E9B'
	}
});
