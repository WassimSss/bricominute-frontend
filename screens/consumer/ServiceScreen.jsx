import ServiceStepOne from './ServiceStep/ServiceStepOne';
import { useDispatch, useSelector } from 'react-redux';
import ServiceStepTwo from './ServiceStep/ServiceStepTwo';
import ServiceStepThree from './ServiceStep/ServiceStepThree';
import ServiceStepThreeBis from './ServiceStep/ServiceStepThreeBis';
import ServiceStepFour from './ServiceStep/ServiceStepFour';
import { Text, View, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import ServiceSearchPro from './ServiceStep/ServiceSearchPro';
import ServiceProInComming from './ServiceStep/ServiceProInComming';
import React, { useEffect, useRef, useState } from 'react';

import { checkTokenAndRedirect } from '../../utils/checkTokenAndRedirect';
import { handleRefresh, resetData } from '../../reducers/consumerServices';
import NotesScreen from '../consumer/NotesScreen'
// import { useIsFocused } from '@react-navigation/native';



export default function ServiceScreen({ navigation }) {
	// const isFocused = useIsFocused();
	const user = useSelector((state) => state.user.value);
	const [userIsOnService, setUserIsOnService] = useState(false);
	const [findPro, setFindPro] = useState(false);
	const [requestPro, setRequestPro] = useState(false);
	const [idOrder, setIdOrder] = useState('');
	// const idUser = '65e6e7249333d0bcd3044e5a';
	const dispatch = useDispatch();
	const intervalIdRef = useRef(null);
	const [proInfo, setProInfo] = useState(null)
	const [orderAddress, setOrderAddress] = useState(null)
	const [orderFinished, setOrderFinished] = useState(false)

	useEffect(() => {
		checkTokenAndRedirect(navigation, user);

		const isUserOnOrderShowMap = async () => {
			try {
				const response = await fetch(`http://10.20.2.115:3000/user/isOnOrder/${user.token}`);
				const isOnService = await response.json();
				setUserIsOnService(isOnService.result);

				// console.log('isOnService : ', isOnService);
				if (isOnService.result) {
					setIdOrder(isOnService.order._id);
					const idOrder = isOnService.order._id;
					// console.log('idOrder : ', idOrder);
					const addressResponse = await fetch(`http://10.20.2.115:3000/orders/getIdAddress/${idOrder}`);
					const addressData = await addressResponse.json();
					// console.log('addressData : ', addressData);
					const positionResponse = await fetch(`http://10.20.2.115:3000/address/${addressData.IdAddress}`);
					const position = await positionResponse.json();
					// console.log('position : ', position);


					if (!findPro) {
						// console.log('interval...');
						fetch(`http://10.20.2.115:3000/user/findUserNearbyAndGiveOrder/${position.latitude}/${position.longitude}/${idOrder}`)
							.then((response) => response.json())
							.then((isProFinded) => {
								// console.log('isProFinded : ', isProFinded);
								if (isProFinded.result) {
									clearInterval(intervalIdRef.current);
									dispatch(handleRefresh())
									setRequestPro(isProFinded.result);

									fetch(`http://10.20.2.115:3000/user/checkIfProAcceptOrder/${user.token}`)
										.then(response => response.json())
										.then(isProAcceptOrder => {
											// console.log('check if pro accept order');
											if (isProAcceptOrder.result) {
												setFindPro(isProAcceptOrder.result)
												setProInfo(isProAcceptOrder.proInfo)
											}
										})
								}
							});
						// METTRE TOUTE LES 5 SECONDES
					}

				}
			} catch (error) {
				console.error('Error while checking user order:', error);
			}
		}

		isUserOnOrderShowMap()

	}, []);

	const consumerService = useSelector((state) => state.consumerServices.value);

	const findUser = (isOnService, interval) => {
		// console.log('isOnServiceOfTheFunction : ', isOnService)
		// console.log('findPro : ', findPro)



		if (isOnService.result) {
			// console.log('it is true lol');
			// Récupérer l'ID de la commande
			const idOrder = isOnService.idOrder;
			fetch(`http://10.20.2.115:3000/orders/getIdAddress/${idOrder}`)
				.then((response) => response.json())
				.then((addressData) => {
					// On recup lat et long de l'addresse avec le deuxieme fetch
					// grace a l'id addresse
					// console.log('dataGetIdAddress : ', addressData);
					fetch(`http://10.20.2.115:3000/address/${addressData.IdAddress}`)
						.then((response) => response.json())
						.then((position) => {
							// console.log('position : ', position);
							fetch(
								`http://10.20.2.115:3000/user/findUserNearbyAndGiveOrder/${position.latitude}/${position.longitude}/${idOrder}`
							)
								.then((response) => response.json())
								.then((isProFinded) => {
									// console.log('isProFinded : ', isProFinded);
									if (isProFinded) {
										setRequestPro(isProFinded.result);
										// dispatch(handleRefresh())
									}
								});
						});
				});
		}
	}
	// Pour l'instant en dur, mais voir si l'user a deja commandée un service a partir de la base de données
	useEffect(() => {
		const checkUserOrder = async () => {
			try {
				const response = await fetch(`http://10.20.2.115:3000/user/isOnOrder/${user.token}`);
				const isOnService = await response.json();
				setUserIsOnService(isOnService.result);

				// console.log('isOnService : ', isOnService);
				if (isOnService.result) {
					setIdOrder(isOnService.order._id);
					const idOrder = isOnService.order._id;
					// console.log('idOrder : ', idOrder);
					const addressResponse = await fetch(`http://10.20.2.115:3000/orders/getIdAddress/${idOrder}`);
					const addressData = await addressResponse.json();
					// console.log('addressData : ', addressData);
					const positionResponse = await fetch(`http://10.20.2.115:3000/address/${addressData.IdAddress}`);
					const position = await positionResponse.json();

					setOrderAddress(position)
					// console.log('position : ', position);


					if (!findPro) {
						intervalIdRef.current = setInterval(() => {
							// console.log('interval...');
							fetch(`http://10.20.2.115:3000/user/findUserNearbyAndGiveOrder/${position.latitude}/${position.longitude}/${idOrder}`)
								.then((response) => response.json())
								.then((isProFinded) => {
									// console.log('isProFinded : ', isProFinded);
									if (isProFinded.result) {
										clearInterval(intervalIdRef.current);
										dispatch(handleRefresh())
										setRequestPro(isProFinded.result);

										fetch(`http://10.20.2.115:3000/user/checkIfProAcceptOrder/${user.token}`)
											.then(response => response.json())
											.then(isProAcceptOrder => {
												// console.log('check if pro accept order');
												if (isProAcceptOrder.result) {
													setFindPro(isProAcceptOrder.result)
													setProInfo(isProAcceptOrder.proInfo)
												}
											})
									}
								});
							// METTRE TOUTE LES 5 SECONDES
						}, 5000);
					}

				}
			} catch (error) {
				console.error('Error while checking user order:', error);
			}
		};
		checkUserOrder();
		// }

		return () => {
			console.log('demonté ! ');
			clearInterval(intervalIdRef.current);
		};


	}, [/*isFocused*/, findPro, consumerService.refresh, user.token]);

	const cancelOrder = () => {
		fetch(`http://10.20.2.115:3000/orders/delete/${idOrder}`,
			{
				method: 'DELETE',
				headers: { 'Content-Type': 'application/json' },
				// body: JSON.stringify(reformatedData)
			})
			.then(response => response.json())
			.then(data => {
				// console.log('delete : ', data);
				dispatch(resetData())
				clearInterval(intervalIdRef.current);
			})

	}

	const handleFinishedOrder = () => {
		setOrderFinished(true)
	}

	const resetFindUser = () => {
		clearInterval(intervalIdRef.current);

	}

	const resetAll = () => {
		setUserIsOnService(false)
		setFindPro(false)
		setRequestPro(false)
		setIdOrder('')
		resetFindUser()
		setProInfo(null)
		setOrderAddress(null)
		setOrderFinished(null)
		dispatch(resetData())
	}
	// const findPro = false
	if (orderFinished) {
		return <NotesScreen proInfo={proInfo} navigation={navigation} resetAll={resetAll} />;
	} else if (userIsOnService) {
		// CREER UN NOUVEAU CHAMP DANS LE SCHEMA QUI SERA REQUESTIDPRO
		// SI REQUEST ID PRO CA VEUT DIRE QU ON A ENVOUYE UNE REQUETE A UN PRO
		// === ON ATTENDS QU IL ACCEPTE OU REFUSE
		// SI IL ACCEPTE ON AFFICHE LA MAP, SINON ON RELANCE LA RECHERCHE
		if (requestPro) {
			if (findPro) {
				return <ServiceProInComming proInfo={proInfo} navigation={navigation} orderAddress={orderAddress} idOrder={idOrder} handleFinishedOrder={handleFinishedOrder} />;
			} else {
				return <ServiceSearchPro navigation={navigation} cancelOrder={cancelOrder} message="Un pro a été trouvé, il doit accepté la commande" />;
			}
		} else {
			return <ServiceSearchPro navigation={navigation} cancelOrder={cancelOrder} message="Recherche d'artisan en cours" />;
		}
	} else {
		if (consumerService.step === 1) {
			return <ServiceStepOne navigation={navigation} />;
		} else if (consumerService.step === 2) {
			return <ServiceStepTwo navigation={navigation} />;
		} else if (consumerService.step === 3) {
			return <ServiceStepThree navigation={navigation} />;
		} else if (consumerService.step === 4) {
			return <ServiceStepThreeBis navigation={navigation} />;
		} else if (consumerService.step === 5) {
			return <ServiceStepFour navigation={navigation} />;
		}
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 50
	}
});
