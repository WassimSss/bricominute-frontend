import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Button, TouchableOpacity, Text, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as geolib from 'geolib';
import * as Location from 'expo-location';
import { checkTokenAndRedirect } from '../../utils/checkTokenAndRedirect';
import { useSelector } from 'react-redux';

const ProScreen = ({ navigation }) => {
	const user = useSelector((state) => state.user.value);

	useEffect(() => {
		checkTokenAndRedirect(navigation, user);
	}, []);
	const [ proLocation, setProLocation ] = useState({
		latitude: null,
		longitude: null,
		latitudeDelta: 0.01,
		longitudeDelta: 0.01
	});

	const [ distanceFromTheServiceInKm, setDistanceFromTheServiceInKm ] = useState(null);
	const [ timeFromProToService, setTimeFromProToService ] = useState(null);

	const fetchOrderLocation = async () => {
		const idOrderAddress = '65e5ec8fa7d7b53b75681b38';
		try {
			const response = await fetch(`http://192.168.1.114:3000/address/${idOrderAddress}`);
			const orderLocation = await response.json();
			// console.log(orderLocation);
			return orderLocation;
		} catch (error) {
			console.error(
				"Une erreur s'est produite lors de la récupération des coordonnées de l'adresse de la commande :",
				error
			);
			return null;
		}
	};

	const distanceBetweenTwoPoint = async () => {
		const orderLocation = await fetchOrderLocation();
		console.log(orderLocation.latitude !== null);
		if (orderLocation.latitude !== null) {
			const distanceInMeters = geolib.getDistance(orderLocation, proLocation);
			const distanceInKilometers = geolib.convertDistance(distanceInMeters, 'km');
			setDistanceFromTheServiceInKm(distanceInKilometers);

			const vitesse = 40; //kilometre/h
			const timeInMinute = Math.floor(distanceInKilometers / vitesse * 60);
			console.log('timeInMinute :', timeInMinute);
			setTimeFromProToService(timeInMinute);
		}
	};

	useEffect(() => {
		(async () => {
			const { status } = await Location.requestForegroundPermissionsAsync();

			if (status === 'granted') {
				Location.watchPositionAsync({ distanceInterval: 10 }, (location) => {
					console.log(location);
					setProLocation({
						latitude: location.coords.latitude,
						longitude: location.coords.longitude,
						latitudeDelta: 0.01,
						longitudeDelta: 0.01
					});
				});
			}
		})();
	}, []);

	useEffect(
		() => {
			const intervalId = setInterval(() => {
				distanceBetweenTwoPoint();
			}, 3000);

			return () => clearInterval(intervalId);
		},
		[ proLocation ]
	);

	// useEffect(() => {
	//     if (proLocation.latitude !== null) {
	//         ;
	//     }
	// }, [proLocation]);

	return (
		<View style={styles.container}>
			<MapView
				initialRegion={{
					latitude: 48.8566, // Latitude de Paris
					longitude: 2.3522, // Longitude de Paris
					latitudeDelta: 15,
					longitudeDelta: 15
				}}
				style={styles.map}
			>
				{/* {test.latitude !== null && <Marker coordinate={test} />} */}
				{proLocation.latitude !== null && <Marker coordinate={proLocation} />}
			</MapView>

			<View style={styles.containerMoneyInfo}>
				<TouchableOpacity style={styles.moneyInfo}>
					<Text style={styles.text}>
						0.00<Text style={{ color: '#786396' }}>€</Text>
					</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.containerButton}>
				<LinearGradient
					// Button Linear Gradient
					colors={[ '#407CB8', '#B14A73' ]}
					style={styles.button}
					start={{ x: 0, y: 0 }}
					end={{ x: 1, y: 1 }}
				>
					<TouchableOpacity onPress={() => distanceBetweenTwoPoint()} style={styles.button}>
						<Text style={styles.textButton}>GO</Text>
					</TouchableOpacity>
				</LinearGradient>
			</View>

			<TouchableOpacity style={styles.burgerMenu}>
				<View style={styles.burgerMenuBar} />
				<View style={styles.burgerMenuBar} />
				<View style={styles.burgerMenuBar} />
			</TouchableOpacity>

			<View style={styles.menu}>
				<View style={styles.userContainer}>
					<TouchableOpacity>
						<View style={styles.profilPicture} />
					</TouchableOpacity>

					<View style={styles.textAndStar}>
						<Text>Antoine Tuyeau</Text>
						<View style={styles.starContainer}>
							<Text style={styles.star}>
								<FontAwesome name="star" size={20} color="#786396" />
							</Text>
							<Text style={styles.star}>
								<FontAwesome name="star" size={20} color="#786396" />
							</Text>
							<Text style={styles.star}>
								<FontAwesome name="star" size={20} color="#786396" />
							</Text>
							<Text style={styles.star}>
								<FontAwesome name="star" size={20} color="#786396" />
							</Text>
							<Text style={styles.star}>
								<FontAwesome name="star" size={20} color="#000000" />
							</Text>
						</View>
					</View>
				</View>

				<View style={styles.allItems}>
					<View>
						<TouchableOpacity style={styles.item}>
							<Text style={styles.textItem}>Messages</Text>
							<FontAwesome name="arrow-left" size={20} color="#000000" />
						</TouchableOpacity>
					</View>

					<View>
						<TouchableOpacity style={styles.item}>
							<Text style={styles.textItem}>Revenu</Text>
							<FontAwesome name="arrow-left" size={20} color="#000000" />
						</TouchableOpacity>
					</View>

					<View>
						<TouchableOpacity style={styles.item}>
							<Text style={styles.textItem}>Portefeuille</Text>
							<FontAwesome name="arrow-left" size={20} color="#000000" />
						</TouchableOpacity>
					</View>

					<View>
						<TouchableOpacity style={styles.item}>
							<Text style={styles.textItem}>Compte</Text>
							<FontAwesome name="arrow-left" size={20} color="#000000" />
						</TouchableOpacity>
					</View>

					<View>
						<TouchableOpacity style={styles.item}>
							<Text style={styles.textItem}>Aides</Text>
							<FontAwesome name="arrow-left" size={20} color="#000000" />
						</TouchableOpacity>
					</View>
				</View>
			</View>

			<View style={styles.footer}>
				<Text style={styles.text}>HORS LIGNE</Text>
				{console.log('test : ', timeFromProToService !== null)}
				<Text style={styles.text}>{timeFromProToService !== null && timeFromProToService.toString()}mn</Text>
				<Text style={styles.text}>
					Distance : {distanceFromTheServiceInKm !== null && distanceFromTheServiceInKm}
				</Text>
			</View>
		</View>
	);
};

const { width, height } = Dimensions.get('screen');
const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	map: {
		flex: 1
	},
	burgerMenu: {
		position: 'absolute',
		top: 60,
		right: 20,
		backgroundColor: '#263238',
		width: 50,
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 100
	},
	burgerMenuBar: {
		width: 25,
		height: 3.5,
		backgroundColor: 'white',
		margin: 3
	},
	containerMoneyInfo: {
		position: 'absolute',
		top: 60,
		width: width,
		alignItems: 'center'
	},
	moneyInfo: {
		position: 'absolute',
		backgroundColor: '#263238',
		width: 150,
		height: 50,
		borderRadius: 60,
		justifyContent: 'center',
		alignItems: 'center'
	},
	menu: {
		display: 'none', // Commenter cette ligne pour afficher le menu
		position: 'absolute',
		backgroundColor: 'white',
		right: 0,
		top: 0,
		width: width - 100,
		height: height - 200
	},
	userContainer: {
		alignItems: 'flex-end',
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
		paddingTop: 30
	},
	profilPicture: {
		width: 50,
		height: 50,
		backgroundColor: 'grey',
		borderRadius: 50
	},
	textAndStar: {
		justifyContent: 'center',
		alignItems: 'center',
		margin: 20
	},
	starContainer: {
		flexDirection: 'row'
	},
	star: {
		margin: 2
	},
	allItems: {
		justifyContent: 'flex-end',
		alignItems: 'flex-end',
		margin: 20
	},
	item: {
		flexDirection: 'row-reverse',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: 200
	},
	textItem: {
		fontSize: 25,
		fontWeight: 'bold',
		margin: 10
	},
	text: {
		color: 'white',
		fontSize: 24,
		fontWeight: 'bold'
	},
	footer: {
		backgroundColor: '#263238',
		width: width,
		height: 200,
		borderTopLeftRadius: 15,
		borderTopRightRadius: 15,
		justifyContent: 'center',
		alignItems: 'center'
	},
	containerButton: {
		position: 'absolute',
		justifyContent: 'center',
		alignItems: 'center',
		bottom: 210,
		width: width
	},
	button: {
		width: 100,
		height: 100,
		borderRadius: 100,
		justifyContent: 'center',
		alignItems: 'center'
	},
	textButton: {
		color: 'white',
		fontSize: 22,
		fontWeight: 'bold'
	}
});

export default ProScreen;
