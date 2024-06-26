import {
	Image,
	ImageBackground,
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	Text,
	TextInput,
	Button,
	View,
	TouchableOpacity
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
// import { checkTokenAndRedirect } from '../utils/checkTokenAndRedirect';
import { useEffect, useState } from 'react';
import { reset } from '../reducers/inscription';
import { LinearGradient } from 'expo-linear-gradient';

export default function AccueilScreen({ navigation }) {

	const dispatch = useDispatch()
	const user = useSelector((state) => state.user.value);

	useEffect(() => {
		console.log('acceuil : ', user);
		// Si c'est un pro
		if (user.isPro === true) {
			console.log('navigato to tro');
			navigation.navigate('Pro');
		} else if (user.isPro === false) {
			// Si c'est un particulier
			navigation.navigate('TabNavigator');
		} else {
			// Si il est pas connecté
			navigation.navigate('Acceuil');
		}
	}, [user.token]);
	// const [ pageWantedToGo, setPageWantedToGo ] = useState(null);
	// console.log(user);

	// useEffect(
	// 	() => {
	// 		// console.log('useEffectPageWantedToGO : ', pageWantedToGo);
	// 		checkTokenAndRedirect(navigation, user, pageWantedToGo);
	// 	},
	// 	[ pageWantedToGo, user.token ]
	// );

	// const handleGoConnection = (page) => {
	// 	navigation.navigate('')
	// 	setPageWantedToGo('Inscription')
	// }

	return (
		<View style={styles.container}>
			<View style={styles.blocHaut}>
				<Text style={{ ...styles.title, color: 'black' }}>WELCOME </Text>
				<Text style={{ ...styles.title, color: 'black' }}>TO</Text>
				<Text style={{ ...styles.title, color: '#786396' }}>BRICOMINUTE</Text>
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
						<Text style={styles.textButton} onPress={() => navigation.navigate('Inscription')}>
							S'INSCRIRE
						</Text>
					</TouchableOpacity>
				</LinearGradient>

				<LinearGradient
					// Button Linear Gradient
					colors={['#407CB8', '#B14A73']}
					style={styles.button}
					start={{ x: 0, y: 0 }}
					end={{ x: 1, y: 1 }}
				>
					<TouchableOpacity>
						<Text style={styles.textButton} onPress={() => navigation.navigate('Connection')}>
							CONNECTION
						</Text>
					</TouchableOpacity>
				</LinearGradient>

			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-between',
		backgroundColor: 'white',
		height: '100%',
		width: '100%',
		marginTop: '20%'
	},

	blocHaut: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		margin: '10%',
		height: '30%',
		width: '100%'
	},

	title: {
		flex: 1,
		fontSize: 45,
		alignItems: 'center',
		justifyContent: 'center',
		color: '#b14a73',
		fontWeight: 'bold'
	},

	blocBoutons: {
		alignItems: 'center',
		justifyContent: 'space-around',
		height: '65%',
		width: '100%'
	},

	button: {
		alignItems: 'center',
		backgroundColor: '#b14a73',
		borderRadius: 15,
		height: '15%',
		width: '60%',
		alignItems: 'center',
		justifyContent: 'center'
	},

	textButton: {
		fontSize: 30,
		color: 'white',
		fontWeight: 'bold'
	}
});
