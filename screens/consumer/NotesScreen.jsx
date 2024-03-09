import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Dimensions, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity, Button } from 'react-native';
import { TextInput } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import checkTokenAndRedirect from '../../utils/checkTokenAndRedirect';
export default function NotesScreen({ navigation }) {
	const user = useSelector((state) => state.user.value);

	useEffect(() => {
		checkTokenAndRedirect(navigation, user);
	}, []);
	const [ text, setText ] = useState('Useless Text');

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
				<FontAwesome style={styles.etoile1} name="star" size={20} />
				<FontAwesome style={styles.etoile2} name="star" size={20} />
				<FontAwesome style={styles.etoile3} name="star" size={20} />
				<FontAwesome style={styles.etoile4} name="star" size={20} />
				<FontAwesome style={styles.etoile5} name="star" size={20} />
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
			<View>
				<TouchableOpacity style={styles.CC}>
					<Text style={styles.paiement}>Confirmer le paiement</Text>
				</TouchableOpacity>
			</View>
			<View>
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
		marginTop: 30
	},
	etoile1: {
		color: '#786396'
	},
	etoile2: {
		color: '#786396'
	},

	etoile3: {
		color: '#786396'
	},

	etoile4: {
		color: '#786396'
	},

	cercle: {
		width: 50,
		height: 50,
		backgroundColor: '#D9D9D9',
		borderRadius: 100,
		marginTop: 40
	},

	rectangle: {
		width: 350,
		height: 200,
		backgroundColor: '#D9D9D9'
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
		borderRadius: 15
	}
});
