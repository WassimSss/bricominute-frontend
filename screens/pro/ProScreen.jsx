import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Button, TouchableOpacity, Text, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as geolib from 'geolib';
import * as Location from 'expo-location';
import { checkTokenAndRedirect } from '../../utils/checkTokenAndRedirect';
import { useDispatch, useSelector } from 'react-redux';
import { disconnect } from '../../reducers/user';
import Messagerie from '../Messagerie'

const ProScreen = ({ navigation }) => {
	const user = useSelector((state) => state.user.value);
	const [isProOnline, setIsProOnline] = useState(null);
	const [orderNotification, setOrderNotification] = useState(false)
	const [orderNotificationTime, setOrderNotificationTime] = useState(30)
	const [job, setJob] = useState([])
	const [jobTask, setJobTask] = useState([])
	const [price, setPrice] = useState(null)
	const dispatch = useDispatch();
	// Normalement a false
	const [onOrder, setOnOrder] = useState(false)
	const [orderLocation, setOrderLocation] = useState(null)
	const [userInfo, setUserInfo] = useState(null)
	const [refreshDataLocation, setRefreshDataLocation] = useState({ accessToLocation: false, refresh: false })
	const [proInfo, setProInfo] = useState(null)
	const [distanceFromTheServiceInKm, setDistanceFromTheServiceInKm] = useState(null);
	const [timeFromProToService, setTimeFromProToService] = useState(null);


	const handleDisconnect = () => {
		// Le deco aussi au niveau de la base de données, 
		// c'est a dire lui enlevé isOnline, est la position
		// il ne peut pas se deconnecter si il a une commande en cours
		dispatch(disconnect());
	};

	const handleConnect = () => {
		fetch(`http://10.20.2.115:3000/user/changeIsOnline`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ token: user.token })
		})
			.then((response) => response.json())
			.then((data) => {
				console.log('datatest : ', data.user.professionalInfo.isOnline);
				setIsProOnline(data.user.professionalInfo.isOnline)
			});
	};

	useEffect(
		() => {
			console.log('yoo');
			fetch(`http://10.20.2.115:3000/user/isOnline/${user.token}`)
				.then((response) => response.json())
				.then(data => {
					console.log('datatest 2 : ', data);
					setIsProOnline(data.isOnline)
				});
			const searchOrder = setInterval(() => {
				fetch(`http://10.20.2.115:3000/user/checkIfOrderRequest/${user.token}`)
					.then(response => response.json())
					.then(data => {

						console.log('orderData : ', data.price);
						if (data.proGetOrder) {
							setOrderNotification(true)
							setJob(data.order.job)
							setJobTask(data.order.idTask)
							setPrice(data.order.price * 0.6)
						}
					})

				// clearInterval(searchOrder)
			}, 5000)

			return () => clearInterval(searchOrder);

		},
		[isProOnline]);

	useEffect(() => {
		checkTokenAndRedirect(navigation, user);
		// Met le pro en ligne
	}, []);

	useEffect(() => {
		const orderBarInterval = setInterval(() => {
			if (orderNotification) {
				setOrderNotificationTime(orderNotificationTime - 0.5)
				console.log(orderNotificationTime);

				clearInterval(orderBarInterval)

				// if (orderNotificationTime === 0) {
				// 	setOrderNotification(false)
				// 	clearInterval(orderBarInterval)
				// }
			}
		}, 500)

		return () => clearInterval(orderBarInterval);
	}, [orderNotification, orderNotificationTime])

	useEffect(() => {
		const getProInfo = async () => {
			const fetchInfoPro = await fetch(`http://10.20.2.115:3000/user/getUser/${user.token}`)
			const infoPro = await fetchInfoPro.json();
			setProInfo({ average: infoPro.average, firstName: infoPro.firstName, lastName: infoPro.lastName, money: infoPro.money })
			console.log('infoPro : ', infoPro);

		}
		const getIfIsOnOrder = async () => {
			const responseIsOnOrder = await fetch(`http://10.20.2.115:3000/user/isOnOrder/${user.token}`)
			const isOnOrderData = await responseIsOnOrder.json();

			if (isOnOrderData.result) {
				setOnOrder(true)
			}
			// Recup addresse de l'order
			const idAddress = '65e5ec8fa7d7b53b75681b38'
			const responseAddress = await fetch(`http://10.20.2.115:3000/address/${idAddress}`)
			const addressData = await responseAddress.json();

			if (addressData.result) {
				setOrderLocation({
					fullAddress: addressData.street,
					latitude: addressData.latitude,
					longitude: addressData.longitude
				})
			}

			// Recup Nom prenom de l'order
			console.log('isOnOrderData : ', isOnOrderData.order.idUser);
			console.log(' isOnOrderData : , ', isOnOrderData.order.idUser);
			const responseUser = await fetch(`http://10.20.2.115:3000/user/getUserById/${isOnOrderData.order.idUser}`)
			const userData = await responseUser.json();
			console.log('userData : ', userData);
			if (userData.result) {
				setUserInfo({ firstName: userData.firstName, lastName: userData.lastName })
			}

			// console.log('isOnOrder', data);
		}
		// Peut être faire un fetch pour voir si il est onOrder au chargement de la page
		getProInfo()
		getIfIsOnOrder()
	}, [onOrder])

	const [proLocation, setProLocation] = useState({
		latitude: null,
		longitude: null,
		latitudeDelta: 0.01,
		longitudeDelta: 0.01
	});

	const fetchOrderLocation = async () => {
		const idOrderAddress = '65e5ec8fa7d7b53b75681b38';
		try {
			const response = await fetch(`http://10.20.2.115:3000/address/${idOrderAddress}`);
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
			// console.log('timeInMinute :', timeInMinute);
			setTimeFromProToService(timeInMinute);
		}
	};

	const refuseOrder = () => {
		fetch(`http://10.20.2.115:3000/user/refuseOrder/${user.token}`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ token: user.token })
		}).then(data => {
			console.log('data refuse oreder : ', data);
			setOrderNotification(false)
			setOrderNotificationTime(30)
		})

	}

	const acceptOrder = () => {
		fetch(`http://10.20.2.115:3000/user/acceptOrder/${user.token}`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ token: user.token })
		}).then(data => {
			console.log('data accept oreder : ', data);
			setOrderNotification(false)
			setOrderNotificationTime(30)
			// Peut etre faire une verif avec data.result
			setOnOrder(true)
		})

	}

	const finishedOrder = () => {
		fetch(`http://10.20.2.115:3000/orders/proEndOrder/${user.token}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ token: user.token })
		})
			.then(response => response.json())
			.then(orderData => {
				console.log(orderData);
				setOnOrder(false)
			})
	}

	// Afficher position pro
	useEffect(() => {
		(async () => {
			const { status } = await Location.requestForegroundPermissionsAsync();

			if (status === 'granted') {
				Location.watchPositionAsync({ distanceInterval: 10 }, (location) => {
					setProLocation({
						latitude: location.coords.latitude,
						longitude: location.coords.longitude,
						latitudeDelta: 0.01,
						longitudeDelta: 0.01
					});
					console.log('refreshLocationOnFront');
					fetch(`http://10.20.2.115:3000/user/refreshLocation/${user.token}`, {
						method: 'PUT',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({ latitude: location.coords.latitude, longitude: location.coords.longitude })
					})
					if (orderLocation !== null && proLocation.latitude !== null) {
						setRefreshDataLocation({ accessToLocation: true, refresh: !refreshDataLocation })
					}
					// Calculer la distance

					// distanceBetweenTwoPoint();

				});
			}
		})();
		// On a besoin de mettre le refresh quand orderLocation change
		// pour que ensutie on peut attendre que orderLocation se remplit
		// pour effectuer la distance entre 2 points
	}, [orderLocation]);

	// Distance entre pro et addresse order
	useEffect(() => {
		console.log(refreshDataLocation.accessToLocation);
		if (refreshDataLocation.accessToLocation) {
			console.log(orderLocation, proLocation);
			const distanceInMeters = geolib.getDistance({ latitude: orderLocation.latitude, longitude: orderLocation.longitude }, proLocation);
			const distanceInKilometers = geolib.convertDistance(distanceInMeters, 'km');
			// console.log('distanceInKilometers : ', distanceInKilometers);
			setDistanceFromTheServiceInKm(distanceInKilometers);

			// Calculer le temps pour arriver chez le pro

			const vitesse = 30; //kilometre/h
			const timeInMinute = Math.floor(distanceInKilometers / vitesse * 60);
			// console.log('timeInMinute :', timeInMinute);
			setTimeFromProToService(timeInMinute);
		}
	}, [refreshDataLocation])
	{ 'isOnline : ', console.log(isProOnline) }

	return (
		<View style={styles.container}>
			<MapView

				initialRegion={{
					latitude: 43.5566, // Latitude de Paris
					longitude: 5.3522, // Longitude de Paris
					latitudeDelta: 2,
					longitudeDelta: 2
				}}
				style={styles.map}
			>
				{orderLocation && orderLocation.latitude !== null && <Marker coordinate={{ latitude: orderLocation.latitude, longitude: orderLocation.longitude }} title='Votre destination' />}
				{proLocation && proLocation.latitude !== null && <Marker coordinate={{ latitude: proLocation.latitude, longitude: proLocation.longitude }} title='Votre position' />}
			</MapView>

			<View style={styles.containerMoneyInfo}>
				<TouchableOpacity style={styles.moneyInfo}>
					<Text style={styles.text}>
						{proInfo !== null ? proInfo.money : '_.__'}<Text style={{ color: '#786396' }}>€</Text>
					</Text>
				</TouchableOpacity>
			</View>

			{onOrder === false || orderNotification === false ? <View style={styles.containerButton}>
				<LinearGradient
					// Button Linear Gradient
					colors={['#407CB8', '#B14A73']}
					style={styles.button}
					start={{ x: 0, y: 0 }}
					end={{ x: 1, y: 1 }}
				>
					<TouchableOpacity onPress={() => handleConnect()} style={styles.button}>
						<Text style={styles.textButton}>{console.log('isProOnline : ', isProOnline)}{isProOnline ? 'STOP' : 'GO'}</Text>
					</TouchableOpacity>
				</LinearGradient>
			</View> : <View></View>}



			<TouchableOpacity style={styles.burgerMenu} onPress={() => handleDisconnect()}>
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

					<View>
						<TouchableOpacity style={styles.item}>
							<Text style={{ ...styles.textItem, color: 'red' }}>Deconnexion</Text>
							<FontAwesome name="arrow-left" size={20} color="#000000" />
						</TouchableOpacity>
					</View>
				</View>
			</View>

			{onOrder ? (
				<View style={styles.footerOnOrder}>
					<View>
						<Text style={styles.textOrder}>{userInfo !== null && userInfo.firstName + ' ' + userInfo.lastName}</Text>
						<Text style={styles.textOrder}>{orderLocation !== null && orderLocation.fullAddress}</Text>
					</View>
					<View>
						<TouchableOpacity onPress={() => navigation.navigate('Messagerie')}>
							<Text>
								<FontAwesome name='wechat' size={20} color='#786396' />
							</Text>
						</TouchableOpacity>
						{distanceFromTheServiceInKm <= 0.2 && <TouchableOpacity onPress={() => finishedOrder()}>
							<Text style={{ color: 'purple' }}>
								<FontAwesome name='check' size={20} color='#786396' />
							</Text>
						</TouchableOpacity>}

					</View>
					<View>

						{console.log(distanceFromTheServiceInKm, timeFromProToService)}
						<Text style={styles.textOrder}>{distanceFromTheServiceInKm > 1 ? distanceFromTheServiceInKm + 'Km' : distanceFromTheServiceInKm * 1000 + 'm'}</Text>
						<Text style={styles.textOrder}>{timeFromProToService > 0 ? timeFromProToService + 'mn' : 'Arrivée imminente !'}</Text>

					</View>
				</View>
			) : orderNotification ? (
				<View style={styles.footerOrder}>
					<LinearGradient
						// Button Linear Gradient
						colors={['#407CB8', '#B14A73']}
						style={{
							height: 20,
							// width: (width / 30) * orderNotificationTime,
							width: ((width - 60) / 30) * orderNotificationTime,
							borderRadius: 15,
							margin: 30
						}}
						start={{ x: 0, y: 0 }}
						end={{ x: 1, y: 1 }}
					>
					</LinearGradient>

					<View style={styles.infoOrder}>
						{/* {console.log('job : ', job)} */}
						<Text style={styles.titleOrder}>{job.join('-')}</Text>
						<Text style={styles.textOrder}>{jobTask.join(', ')}</Text>
						<Text style={styles.priceOrder}>{price}€</Text>
					</View>

					<View style={styles.orderButtons}>
						<LinearGradient
							// Button Linear Gradient
							colors={['#407CB8', '#B14A73']}
							style={styles.orderButton}
							start={{ x: 0, y: 0 }}
							end={{ x: 1, y: 1 }}
						>
							<TouchableOpacity onPress={() => refuseOrder()}>
								<Text style={styles.orderButtonText}>Refuser</Text>
							</TouchableOpacity>
						</LinearGradient>

						<LinearGradient
							// Button Linear Gradient
							colors={['#407CB8', '#B14A73']}
							style={styles.orderButton}
							start={{ x: 0, y: 0 }}
							end={{ x: 1, y: 1 }}
						>
							<TouchableOpacity onPress={() => acceptOrder()}>
								<Text style={styles.orderButtonText}>Accepter</Text>
							</TouchableOpacity>
						</LinearGradient>
					</View>
				</View>
			) : (
				<View style={styles.footer}>
					<Text style={styles.text}>{isProOnline ? 'EN LIGNE' : 'HORS LIGNE'}</Text>
				</View>

			)}
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
	},
	footerOrder: {
		backgroundColor: '#263238',
		width: width,
		height: 300,
		borderTopLeftRadius: 15,
		borderTopRightRadius: 15,
		justifyContent: 'space-around',
		paddingVertical: 20,
	},
	footerOnOrder: {
		backgroundColor: '#263238',
		width: width,
		height: 150,
		borderTopLeftRadius: 15,
		borderTopRightRadius: 15,
		justifyContent: 'space-around',
		paddingVertical: 20,
		flexDirection: 'row'
	},
	time: {
		height: 20,
		width: width - 60,
		borderRadius: 15,
		// margin: 30
	},
	infoOrder: {
		color: 'white',
		alignItems: 'center',
		justifyContent: 'center'

	},
	titleOrder: {
		color: 'white',
		fontSize: 26,
		fontWeight: 'bold'
	},
	textOrder: {
		color: 'white'
	},
	priceOrder: {
		color: 'white',
		fontSize: 26,
		fontWeight: 'bold'
	},
	orderButtons: {
		color: 'white',
		flexDirection: 'row',
		justifyContent: 'space-around'
	},
	orderButton: {
		color: 'white',
		paddingHorizontal: 15,
		paddingVertical: 10,
		borderRadius: 100
	},
	orderButtonText: {
		color: 'white',
		fontWeight: 'bold'
	},
	onOrderContainer: {
		width: width,
		height: '100%',
		borderTopLeftRadius: 15,
		borderTopRightRadius: 15,
		justifyContent: 'space-around',
		paddingVertical: 20,
		flexDirection: 'row'
	},

});

export default ProScreen;
