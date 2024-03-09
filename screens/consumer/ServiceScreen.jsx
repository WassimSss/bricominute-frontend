import ServiceStepOne from './ServiceStep/ServiceStepOne';
import { useSelector } from 'react-redux';
import ServiceStepTwo from './ServiceStep/ServiceStepTwo';
import ServiceStepThree from './ServiceStep/ServiceStepThree';
import ServiceStepFour from './ServiceStep/ServiceStepFour';
import { Text, View, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import ServiceSearchPro from './ServiceStep/ServiceSearchPro';
import ServiceProInComming from './ServiceStep/ServiceProInComming';
import React, { useEffect, useState } from 'react';

import { checkTokenAndRedirect } from '../../utils/checkTokenAndRedirect';

export default function ServiceScreen({ navigation }) {
	const user = useSelector((state) => state.user.value);

	useEffect(() => {
		checkTokenAndRedirect(navigation, user);
	}, []);

	const consumerService = useSelector((state) => state.consumerServices.value);

	const [ userIsOnService, setUserIsOnService ] = useState(false);
	const [ findPro, setFindPro ] = useState(false);
	const idUser = '65e6e7249333d0bcd3044e5a';

	// Pour l'instant en dur, mais voir si l'user a deja commandée un service a partir de la base de données
	useEffect(
		() => {
			fetch(`http://192.168.1.114:3000/user/isOnService/${user.token}`)
				.then((response) => response.json())
				.then((isOnService) => {
					console.log('isOnService : ', isOnService);
					setUserIsOnService(isOnService.result);

					// Effectuer la deuxième requête uniquement si l'utilisateur est en service
					if (isOnService.result) {
						const idOrder = '65eb3e887942b0cc296213b0';
						fetch(`http://192.168.1.114:3000/orders/getIdAddress/${idOrder}`)
							.then((response) => response.json())
							.then((data) => {
								// On recup lat et long de l'addresse avec le deuxieme fetch
								// grace a l'id addresse
								console.log('dataGetIdAddress : ', data);
								fetch(`http://192.168.1.114:3000/address/${data.IdAddress}`)
									.then((response) => response.json())
									.then((position) => {
										console.log('position : ', position);
										fetch(
											`http://192.168.1.114:3000/user/findUserNearbyAndGiveOrder/${position.latitude}/${position.longitude}/${idOrder}`
										)
											.then((response) => response.json())
											.then((isProFinded) => {
												console.log('isProFinded : ', isProFinded);
												if (isProFinded) {
													setFindPro(isProFinded.result);
												}
											});
									});
							});
					}
				});
		},
		[ consumerService.refresh ]
	);

	// const findPro = false
	if (userIsOnService) {
		if (findPro) {
			console.log('pas composant');
			console.log(userIsOnService, findPro);
			return <ServiceProInComming navigation={navigation} />;
		} else {
			return <ServiceSearchPro navigation={navigation} />;
		}
	} else {
		if (consumerService.step === 1) {
			return <ServiceStepOne navigation={navigation} />;
		} else if (consumerService.step === 2) {
			return <ServiceStepTwo navigation={navigation} />;
		} else if (consumerService.step === 3) {
			return <ServiceStepThree navigation={navigation} />;
		} else if (consumerService.step === 4) {
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
