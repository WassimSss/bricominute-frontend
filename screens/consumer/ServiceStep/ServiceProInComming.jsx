import { View, ActivityIndicator, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React, { useEffect, useRef, useState } from 'react';
import { checkTokenAndRedirect } from '../../../utils/checkTokenAndRedirect';
import { useSelector } from 'react-redux';
import * as geolib from 'geolib';
import * as Location from 'expo-location';

const ServiceProInComming = ({ proInfo, navigation, orderAddress, idOrder, handleFinishedOrder }) => {
	const user = useSelector((state) => state.user.value);
	const [timeFromProToService, setTimeFromProToService] = useState(null)
	const [orderLocation, setOrderLocation] = useState(null)
	const [proLocation, setProLocation] = useState(null)
	const [refreshProLocation, setRefreshProLocation] = useState(false)
	const [distanceFromTheServiceInKm, setDistanceFromTheServiceInKm] = useState(null);
	const intervalIdEndOrderRef = useRef(null);

	useEffect(() => {
		// if (idOrder) {
		intervalIdEndOrderRef.current = setInterval(() => {
			console.log('checkIfOrderFinished');
			console.log('idOrder : ', idOrder);
			fetch(`http://10.20.2.115:3000/orders/checkIfOrderFinished/${idOrder}`)
				.then((response) => response.json())
				.then((isOrderFinished) => {
					console.log('isOrderFinished : ', isOrderFinished);
					if (isOrderFinished.result) {
						if (isOrderFinished.finished) {
							handleFinishedOrder()
							clearInterval(intervalIdEndOrderRef.current);
						}
					}
				});
			// METTRE TOUTE LES 5 SECONDES
		}, 5000);
		// } else {

		// }
	}, [])
	// const fetchOrderLocation = async () => {
	// 	// const idOrderAddress = null;
	// 	console.log(' orderLocation : ', orderAddress);
	// 	try {
	// 		// if (orderLocation !== null)
	// 		const response = await fetch(`http://10.20.2.115:3000/address/${orderLocation}`);
	// 		const orderLocation = await response.json();
	// 		// console.log(orderLocation);
	// 		return orderLocation;
	// 	} catch (error) {
	// 		console.error(
	// 			"Une erreur s'est produite lors de la récupération des coordonnées de l'adresse de la commande :",
	// 			error
	// 		);
	// 		return null;
	// 	}
	// };

	// const distanceBetweenTwoPoints = () => {
	// 	if (orderAddress && proInfo && proInfo.latitude && proInfo.longitude) {
	// 	}
	// };

	useEffect(() => {
		checkTokenAndRedirect(navigation, user);
	}, []);

	useEffect(() => {
		// ORDER
		if (orderAddress !== null) {
			// console.log('ORDER : ', {
			// 	latitude: orderAddress.latitude,
			// 	longitude: orderAddress.latitude
			// });
			setOrderLocation({ latitude: orderAddress.latitude, longitude: orderAddress.latitude })
		}

		// PRO
		if (proInfo !== null) {
			// console.log('PRO : ', {
			// 	latitude: proInfo.position.latitude,
			// 	longitude: proInfo.position.latitude
			// });
			setProLocation({ latitude: proInfo.position.latitude, longitude: proInfo.position.latitude })
		} else {
			setRefreshProLocation(!refreshProLocation)
		}

		if (orderLocation !== null && proLocation !== null) {
			console.log('on Null', orderLocation, proLocation);
			const distanceInMeters = geolib.getDistance(
				{ latitude: orderLocation.latitude, longitude: orderLocation.longitude },
				{ latitude: proLocation.latitude, longitude: proLocation.longitude }
			);
			const distanceInKilometers = geolib.convertDistance(distanceInMeters, 'km');

			setDistanceFromTheServiceInKm(distanceInKilometers);

			const averageSpeed = 40; // kilomètres par heure
			const timeInMinutes = Math.round((distanceInKilometers / averageSpeed) * 60);
			console.log('timeInMinutes : ', timeInMinutes);
			setTimeFromProToService(timeInMinutes);
		} else {
			console.log('null');
			console.log('orderL ', orderLocation);
			console.log('proL ', proLocation)
		}

		// distanceBetweenTwoPoints();		// 
		// const distanceInMeters = geolib.getDistance({ latitude: orderLocation.latitude, longitude: orderLocation.longitude }, proLocation);
		// const distanceInKilometers = geolib.convertDistance(distanceInMeters, 'km');
	}, [orderAddress, proInfo, refreshProLocation]);

	// checkIfOrderFinished

	return (
		<View style={styles.container}>
			<View style={styles.mapContainer}>
				<MapView
					initialRegion={{
						latitude: 48.8566, // Latitude de Paris
						longitude: 2.3522, // Longitude de Paris
						latitudeDelta: 0.0922,
						longitudeDelta: 0.0421
					}}
					style={styles.map}
				/>
			</View>
			<View style={styles.containerInfo}>
				<View>
					<Text style={styles.text}>{proInfo !== null && proInfo.firstName}</Text>
					<Text style={styles.text}>{proInfo !== null && proInfo.company_name}</Text>
				</View>
				<TouchableOpacity onPress={() => navigation.navigate('Messagerie')}>
					<Text>
						<FontAwesome name="wechat" size={40} color="#786396" />;
					</Text>
				</TouchableOpacity>
				<View>
					<Text style={styles.text}>{timeFromProToService > 0 ? timeFromProToService + 'mn' : 'Arrivée imminente !'}</Text>
					<Text style={styles.text}>
						{distanceFromTheServiceInKm > 1
							? distanceFromTheServiceInKm.toFixed(2) + ' Km'
							: (distanceFromTheServiceInKm * 1000).toFixed(2) + ' m'}
					</Text>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	mapContainer: {
		flex: 1
	},
	map: {
		flex: 1
	},
	containerInfo: {
		backgroundColor: '#263238',
		height: 100,
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 5
	},
	text: {
		fontWeight: 'bold',
		color: 'white'
	}
});

export default ServiceProInComming;
