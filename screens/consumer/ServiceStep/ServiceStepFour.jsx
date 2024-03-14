import { StyleSheet, Text, View, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import { goToStep, handleRefresh } from '../../../reducers/consumerServices';

import React, { useEffect } from 'react';
import { checkTokenAndRedirect } from '../../../utils/checkTokenAndRedirect';

export default function ServiceStepFour({ navigation }) {
	const user = useSelector((state) => state.user.value);

	useEffect(() => {
		checkTokenAndRedirect(navigation, user);
	}, []);

	const consumerService = useSelector((state) => state.consumerServices.value);
	const dispatch = useDispatch();

	console.log(consumerService);

	const allServiceWanted = consumerService.jobTasks.map((e) => {
		return { key: e.name, price: e.price };
	});

	const handleGoToStepOne = (step) => {
		dispatch(goToStep(step));
	};

	let allServiceWantedPrice = 0;

	for (const service of allServiceWanted) {
		allServiceWantedPrice += service.price;
	}

	const sendServiceRequest = () => {
		dispatch(handleRefresh());
		console.log(consumerService.refresh);
		const reformatedData = {
			token: user.token,
			idJob: consumerService.jobs,
			idJobTask: consumerService.jobTasks,
			Date: consumerService.date,
			status: consumerService.status,
			price: consumerService.price,
			IdAddress: '202020'
		};

		fetch('http://10.20.2.115:3000/orders', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(reformatedData)
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				dispatch(handleRefresh());
			});
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Récapitulatif</Text>
			<Text>Etape {consumerService.step}/4</Text>

			<FlatList
				data={allServiceWanted}
				renderItem={({ item }) => (
					<View style={styles.li}>
						<Text style={styles.liText}>{item.key}</Text>
						<Text style={styles.liText}>{item.price}€</Text>
					</View>
				)}
			/>

			<View style={styles.line} />

			<View>
				<Text>Total TTC</Text>
				<Text>{allServiceWantedPrice}€</Text>
			</View>

			<View style={styles.containerButton}>
				<LinearGradient
					// Button Linear Gradient
					colors={['#407CB8', '#B14A73']}
					style={styles.button}
					start={{ x: 0, y: 0 }}
					end={{ x: 1, y: 1 }}
				>
					<TouchableOpacity onPress={() => handleGoToStepOne(1)}>
						<Text style={styles.buttonText}>Modifier</Text>
					</TouchableOpacity>
				</LinearGradient>

				<LinearGradient
					// Button Linear Gradient
					colors={['#407CB8', '#B14A73']}
					style={styles.button}
					start={{ x: 0, y: 0 }}
					end={{ x: 1, y: 1 }}
				>
					<TouchableOpacity onPress={() => sendServiceRequest()}>
						<Text style={styles.buttonText}>Accepter</Text>
					</TouchableOpacity>
				</LinearGradient>
			</View>
			{/* <View style={styles.allBtn}>
          <TouchableOpacity style={styles.arrowBtnContainer} onPress={() => handlePreviousStep(true)}>
            <Text style={[styles.activeColor, step === 1 && styles.cantGoStyle]}>Précédent</Text>
            <FontAwesome name='arrow-left' size={20} color='#B14A73' style={step === 1 && styles.cantGoStyle} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.arrowBtnContainer, styles.cantGoStyle]} onPress={() => handleNextStep(optionSelected !== '')}>
            <Text style={[styles.cantGoStyle, jobTask.length > 0 && styles.activeColor]}>Suivant</Text>
            <FontAwesome name='arrow-right' size={20} color='#979797' style={jobTask.length > 0 && styles.activeColor} />
          </TouchableOpacity>
        </View> */}
		</View>
	);
}

const { height, width } = Dimensions.get('screen');

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ffffff',
		alignItems: 'center',
		justifyContent: 'center'
	},
	title: {
		fontSize: 30,
		fontWeight: 'bold'
	},
	duo: {
		display: 'flex',
		flexDirection: 'row'
	},
	cardJob: {
		width: 100,
		height: 100,
		margin: 20,
		padding: 5,
		backgroundColor: '#B14A73',
		justifyContent: 'flex-end',
		alignItems: 'center',
		borderRadius: 20,
		shadowColor: '#000', // Couleur de l'ombre
		shadowOffset: { width: 0, height: 5 }, // Décalage de l'ombre
		shadowOpacity: 0.35, // Opacité de l'ombre
		shadowRadius: 15, // Rayon de l'ombre
		elevation: 10 // Pour Android, simule l'effet d'ombre
	},
	selectedCardJob: {
		backgroundColor: '#5E97F6'
	},
	textWhite: {
		color: 'white',
		textAlign: 'center'
	},
	arrowBtnContainer: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center'
	},
	allBtn: {
		display: 'flex',
		flexDirection: 'row',
		width: width - 60,
		justifyContent: 'space-between',
		marginTop: 30
	},
	cantGoStyle: {
		color: '#979797'
	},
	activeColor: {
		color: '#B14A73'
	},
	radioBtns: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		width: width,
		marginBottom: 100,
		marginTop: 100
	},
	li: {
		backgroundColor: 'red',
		flexDirection: 'row',
		justifyContent: 'space-betweenn',
		margin: 10,
		width: 300

	},
	liText: {
		fontSize: 20,
		fontWeight: 'bold'
	},
	line: {
		width: width - 50,
		backgroundColor: '#000',
		height: 2
	},
	button: {
		paddingVertical: 5,
		paddingHorizontal: 10,
		borderRadius: 5,
		shadowColor: '#000', // Couleur de l'ombre
		shadowOffset: { width: 0, height: 5 }, // Décalage de l'ombre
		shadowOpacity: 0.35, // Opacité de l'ombre
		shadowRadius: 15, // Rayon de l'ombre
		elevation: 10 // Pour Android, simule l'effet d'ombre
	},
	buttonText: {
		color: 'white',
		fontSize: 16,
		fontWeight: 'bold'
	},
	containerButton: {
		width: width,
		flexDirection: 'row',
		justifyContent: 'space-around'
	}
});
