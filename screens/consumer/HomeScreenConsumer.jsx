import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';

import React, { useEffect } from 'react';
import { checkTokenAndRedirect } from '../../utils/checkTokenAndRedirect';

export default function HomeScreenConsumer({ navigation }) {
	const user = useSelector((state) => state.user.value);

	useEffect(() => {
		checkTokenAndRedirect(navigation, user);
	}, []);


	return (
		<View style={styles.container}>
			<ScrollView style={styles.newsContainer}>
				<View style={styles.newsCard}>
					<Text style={styles.title}>Offre spéciale !</Text>
					<Text style={styles.desc}>Dans 2 jours, une offre spéciale sera disponible ! Profitez d'une réduction de 20% sur votre prochaine commande. Restez à l'écoute pour plus de détails.</Text>
				</View>
				<View style={styles.newsCard}>
					<Text style={styles.title}>M.A.J.0.0.4</Text>
					<Text style={styles.desc}>Les utilisateurs peuvent désormais noter et laisser leurs avis sur les professionnels. Cette fonctionnalité permettra une meilleure transparence et une évaluation des services.</Text>
				</View>
				<View style={styles.newsCard}>
					<Text style={styles.title}>M.A.J.0.0.3</Text>
					<Text style={styles.desc}>Cette mise à jour corrige plusieurs bugs identifiés sur la partie client, garantissant ainsi une expérience utilisateur plus fluide et sans interruption.</Text>
				</View>

				<View style={styles.newsCard}>
					<Text style={styles.title}>M.A.J.0.0.2</Text>
					<Text style={styles.desc}>Nous sommes heureux d'annoncer que des codes promo seront bientôt disponibles pour nos utilisateurs. Économisez sur vos prochaines commandes avec nos offres exclusives.</Text>
				</View>

				<View style={styles.newsCard}>
					<Text style={styles.title}>M.A.J.0.0.1</Text>
					<Text style={styles.desc}>Nouveau dans cette version : la messagerie avec le client ! Vous pouvez maintenant communiquer plus facilement avec vos clients pour répondre à leurs questions et leurs besoins.</Text>
				</View>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ffffff',
		alignItems: 'center',
		justifyContent: 'flex-start'
	},
	newsContainer: {
		marginTop: 30
	},
	newsCard: {
		display: 'flex',
		margin: 20,
		padding: 20,
		elevation: 10,
		backgroundColor: '#ffffff', // Ajoutez une couleur de fond si nécessaire
		borderRadius: 10, // Ajoutez une bordure arrondie si nécessaire
		shadowColor: '#000', // Couleur de l'ombre
		shadowOffset: { width: 0, height: 5 }, // Décalage de l'ombre
		shadowOpacity: 0.35, // Opacité de l'ombre
		shadowRadius: 15, // Rayon de l'ombre
		elevation: 10 // Pour Android, simule l'effet d'ombre
	},
	title: {
		color: '#786396'
	},
	desc: {}
});
