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

export default function AccueilScreen({ navigation }) {
	const user = useSelector((state) => state.user.value);

	useEffect(() => {
		// Si c'est un pro
		if (user.pro) {
			navigation.navigate('Pro');
		} else if (user.pro) {
			// Si c'est un particulier
			navigation.navigate('TabNavigator');
		} else {
			// Si il est pas connecté
			navigation.navigate('Acceuil');
		}
	}, []);
	console.log(user);
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
				<Text style={styles.title}>WELCOME </Text>
				<Text style={styles.title}>TO</Text>
				<Text style={styles.title}>BRICOMINUTE</Text>
			</View>

			<View style={styles.blocBoutons}>
				<TouchableOpacity style={styles.button}>
					<Text style={styles.textButton} onPress={() => navigation.navigate('Inscription')}>
						S'INSCRIRE
					</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.button}>
					<Text style={styles.textButton} onPress={() => navigation.navigate('Connection')}>
						CONNECTION
					</Text>
				</TouchableOpacity>
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
