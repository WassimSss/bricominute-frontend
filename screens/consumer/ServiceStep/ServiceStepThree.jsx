import { StyleSheet, Text, View, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { addJobToSore, deleteJobToStore, nextStep, previousStep, setDate } from '../../../reducers/consumerServices';
import RadioButton from '../../../components/RadioButton';
import { useState } from 'react';
import { LocaleConfig } from 'react-native-calendars';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

import React, { useEffect } from 'react';
import {checkTokenAndRedirect} from '../../../utils/checkTokenAndRedirect';

export default function ServiceStepThree({ navigation }) {
	const user = useSelector((state) => state.user.value);

	useEffect(() => {
		checkTokenAndRedirect(navigation, user);
	}, []);

	const consumerService = useSelector((state) => state.consumerServices.value);
	const dispatch = useDispatch();

	const [ selected, setSelected ] = useState('');
	const options = [ 'Le plus tôt', 'Programmer' ];
	const [ optionSelected, setOptionSelected ] = useState('');
	// const [date, setDate] = useState(null);

	function formatDateToString(date) {
		// Récupérer l'année, le mois et le jour de la date
		const year = date.getFullYear();
		// Les mois sont indexés de 0 à 11, donc nous ajoutons 1 au mois
		const month = String(date.getMonth() + 1).padStart(2, '0'); // Ajoute un zéro devant si le mois est inférieur à 10
		const day = String(date.getDate()).padStart(2, '0'); // Ajoute un zéro devant si le jour est inférieur à 10

		// Concaténer les parties de la date avec des tirets
		const dateString = `${year}-${month}-${day}`;

		return dateString;
	}

	LocaleConfig.locales['fr'] = {
		monthNames: [
			'Janvier',
			'Février',
			'Mars',
			'Avril',
			'Mai',
			'Juin',
			'Juillet',
			'Août',
			'Septembre',
			'Octobre',
			'Novembre',
			'Décembre'
		],
		monthNames: [
			'Janvier',
			'Février',
			'Mars',
			'Avril',
			'Mai',
			'Juin',
			'Juillet',
			'Août',
			'Septembre',
			'Octobre',
			'Novembre',
			'Décembre'
		],
		monthNamesShort: [
			'Janv.',
			'Févr.',
			'Mars',
			'Avril',
			'Mai',
			'Juin',
			'Juil.',
			'Août',
			'Sept.',
			'Oct.',
			'Nov.',
			'Déc.'
		],
		dayNames: [ 'Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi' ],
		dayNamesShort: [ 'Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.' ],
		today: "Aujourd'hui"
	};
	LocaleConfig.defaultLocale = 'fr';
	const handleRadio = (option) => {
		setOptionSelected(option);
		if (option === 'Le plus tôt') {
			dispatch(setDate(formatDateToString(new Date())));
		}
	};

	const handlePreviousStep = (can) => {
		if (can) {
			dispatch(previousStep());
		}
	};

	const handleNextStep = (can) => {
		if (can) {
			dispatch(nextStep());
		}
	};

	// console.log(consumerService.jobTasks);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Quand ?</Text>
			<Text>Etape {consumerService.step}/4</Text>

			<View>
				<RadioButton options={options} style={styles.radioBtns} handleRadio={handleRadio} />
			</View>

			{optionSelected === 'Programmer' && (
				<Calendar
					style={{
						borderWidth: 1,
						borderColor: '#B14A73'
						//height: 350,
					}}
					onDayPress={(day) => {
						setSelected(day.dateString);
						dispatch(setDate(formatDateToString(new Date(day.dateString))));
						// console.log(selected);
					}}
					theme={{
						backgroundColor: '#ffffff',
						calendarBackground: '#ffffff',
						textSectionTitleColor: '#B14A73',
						selectedDayBackgroundColor: '#B14A73',
						selectedDayTextColor: '#ffffff',
						todayTextColor: '#B14A73',
						dayTextColor: '#2d4150',
						arrowColor: '#B14A73'
						//textDisabledColor: '#d9e'
					}}
					// markedDates={{
					//   [selected]: { selected: true, disableTouchEvent: true, selectedDotColor: '#B14A73', color: '#B14A73' }
					// }}
					markedDates={{
						[selected]: { selected: true, marked: true, selectedColor: '#B14A73' }
					}}
				/>
			)}

			<View style={styles.allBtn}>
				<TouchableOpacity style={styles.arrowBtnContainer} onPress={() => handlePreviousStep(true)}>
					<Text style={[ styles.activeColor, consumerService.step === 1 && styles.cantGoStyle ]}>
						Précédent
					</Text>
					<FontAwesome
						name="arrow-left"
						size={20}
						color="#B14A73"
						style={consumerService.step === 1 && styles.cantGoStyle}
					/>
				</TouchableOpacity>

				<TouchableOpacity
					style={[ styles.arrowBtnContainer, styles.cantGoStyle ]}
					onPress={() => handleNextStep(optionSelected !== '')}
				>
					<Text style={[ styles.cantGoStyle, consumerService.jobTasks.length > 0 && styles.activeColor ]}>
						Suivant
					</Text>
					<FontAwesome
						name="arrow-right"
						size={20}
						color="#979797"
						style={consumerService.jobTasks.length > 0 && styles.activeColor}
					/>
				</TouchableOpacity>
			</View>
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
		flexDirection: 'row',
		justifyContent: 'space-around'
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
