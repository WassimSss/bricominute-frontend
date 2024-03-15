import { Button, StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { checkTokenAndRedirect } from '../utils/checkTokenAndRedirect';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
// import { useDispatch } from "react-redux";
// import { updateEmail } from "../reducers/user";
// import { NavigationProp, ParamListBase } from "@react-navigation/native";

export default function HomeScreen({ navigation }) {
	const user = useSelector((state) => state.user.value);

	useEffect(() => {
		// Si c'est un pro
		if (user.isPro === true) {
			navigation.navigate('Pro');
		} else if (user.isPro === false) {
			// Si c'est un particulier
			navigation.navigate('TabNavigator');
		} else {
			// Si il est pas connecté
			navigation.navigate('Home');
		}

	}, [user.token]);
	// useEffect(() => {
	// 	checkTokenAndRedirect(navigation, user);
	// }, []);

	return (
		<View style={styles.container}>
			<ImageBackground
				source={require('../assets/accueil-img.jpeg')}
				style={styles.background}
				resizeMode="cover"
			>
				<View style={{ backgroundColor: '#008E9B' }}>
					<Text style={styles.text}>
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam, dignissimos assumenda.
						Dignissimos, earum dolorem aliquam natus labore reprehenderit doloremque eaque cupiditate
						repellat, vitae aut inventore? Natus nam laudantium vero eveniet?
					</Text>
				</View>
			</ImageBackground>
			<TouchableOpacity style={styles.button} activeOpacity={0.8}>
				<Text style={styles.textButton} onPress={() => navigation.navigate('Acceuil')}>
					Suivant
				</Text>
				<FontAwesome name="arrow-right" size={25} color="#b14a73" />
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginBottom: '25%'
	},

	background: {
		width: '100%',
		height: '100%',
		justifyContent: 'flex-end',
		alignItems: 'center'
	},
	button: {
		padding: 30,
		width: '100%',
		// backgroundColor: "#b14a73",
		borderRadius: 1,
		alignItems: 'flex-end',
		justifyContent: 'center'
	}

	// textButton: {
	// 	fontFamily: "Futura",
	// 	height: '30',
	// 	fontWeight: "600",
	// 	fontSize: '24',
	// 	textAlign: "right",

	// }


});
