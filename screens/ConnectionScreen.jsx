import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useEffect, useState } from 'react';
import { AddLoginToStore } from '../reducers/user';
import { useDispatch, useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';

export default function ConnectionScreen({ navigation }) {
	const user = useSelector((state) => state.user.value);

	console.log('connection');
	// Si c'est un pro
	useEffect(() => {
		if (user.isPro === true) {
			navigation.navigate('Pro');
		} else if (user.isPro === false) {
			// Si c'est un particulier
			navigation.navigate('TabNavigator');
		} else {
			// Si il est pas connecté
			navigation.navigate('Connection');
		}
	}, [user.token]);

	const dispatch = useDispatch();

	const [signInEmail, setSignInEmail] = useState('Particulier@gmail.com');
	const [signInPassword, setSignInPassword] = useState('Particulier');
	const handleConnection = () => {
		console.log(`http://10.20.2.115:3000/user/signin`);

		fetch(`http://10.20.2.115:3000/user/signin`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email: signInEmail, password: signInPassword })
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				if (data.result) {
					console.log('on est passé');
					dispatch(AddLoginToStore({ email: signInEmail, token: data.token, isPro: data.isPro }));
					setSignInEmail('');
					setSignInPassword('');
					// Si Particulier
					navigation.navigate('TabNavigator');
					// Si professionnel
					// navigation.navigate('TabNavigatorPro')
				}
			});
	};

	return (
		<View style={styles.container}>
			<View style={styles.blockHaut}>
				<Text style={styles.title}>CONNECTION</Text>
			</View>

			<View style={styles.blockMillieu}>
				<TextInput
					placeholder="email"
					style={styles.input1}
					onChangeText={(value) => setSignInEmail(value)}
					value={signInEmail}
				/>
				<TextInput
					placeholder="motdepasse"
					style={styles.input1}
					onChangeText={(value) => setSignInPassword(value)}
					value={signInPassword}
				/>
			</View>

			<View style={styles.blockBas}>
				<LinearGradient
					// Button Linear Gradient
					colors={['#407CB8', '#B14A73']}
					style={styles.button}
					start={{ x: 0, y: 0 }}
					end={{ x: 1, y: 1 }}
				>
					<TouchableOpacity onPress={() => handleConnection()}>
						<Text style={styles.textButtonRadiant}>CONNECTION</Text>
					</TouchableOpacity>
				</LinearGradient>


				<Text>Vous n'avez pas de compte ?</Text>
				<TouchableOpacity style={styles.button2}>
					<Text onPress={() => navigation.navigate('Inscription')}>S'inscrire</Text>
				</TouchableOpacity>

				<TouchableOpacity />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	background: {
		width: '100%',
		height: '100%'
	},

	blockHaut: {
		width: '100%',
		alignItems: 'center',
		fontWeight: 'bold',
		height: '30%',
		justifyContent: 'center'
	},
	button: {
		paddingHorizontal: 15,
		paddingVertical: 8,
		// backgroundColor: "#b14a73",
		borderRadius: 15,
		alignItems: 'flex-end',
		justifyContent: 'center'
	},
	textButtonRadiant: {
		color: 'white',
		fontSize: 22,
		fontWeight: 'bold',
	},
	container: {
		flex: 1,
		marginTop: '20%'
	},

	title: {
		fontSize: 39,
		fontWeight: 'bold',
		// fontFamily: 'Futura',
		marginBottom: 50
	},
	button1: {
		alignItems: 'center',
		justifyContent: 'center',
		width: '60%',
		height: '15%',
		marginTop: 30,
		backgroundColor: '#B14A73',
		borderRadius: 15,

		fontSize: '20px'
	},
	input1: {
		borderWidth: 1,
		width: '80%',
		height: '15%'
	},
	blockMillieu: {
		justifyContent: 'space-around',
		marginLeft: '10%',
		height: '30%',
		width: '80%',
		alignItems: 'center'
	},

	button2: {
		alignItems: 'center',
		paddingTop: 8,

		marginTop: 30,

		borderRadius: 1,
		fontSize: '20px',
		borderBottomWidth: 1,
		borderBottomColor: '#008e9b',

		marginBottom: '50%'
	},

	blockBas: {
		alignItems: 'center',
		fontSize: '20px'
	},
	input2: {
		borderWidth: 1
	},

	//  button: {
	//         fontFamily: "Futura",
	//         fontWeight:'bold',
	//         fontSize:30,
	//         color: 'white',

	//      },
	textButton: {
		fontSize: 15,
		color: '#008e9b',
		borderBottomWidth: 1,
		borderBottomColor: '#008e9b'
	}
});
