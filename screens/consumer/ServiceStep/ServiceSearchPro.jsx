import { View, Text, StyleSheet } from 'react-native';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import checkTokenAndRedirect from '../../../utils/checkTokenAndRedirect';

const ServiceSearchPro = ({ navigation }) => {
	const user = useSelector((state) => state.user.value);

	useEffect(() => {
		checkTokenAndRedirect(navigation, user);
	}, []);
	const idOrder = '65e9879330bf1f32ff2218cc';
	const idUser = '65e5ec8fa7d7b53b75681b38';
	// const consumerService = useSelector(state => state.consumerService.value)

	// Recuperer l'addresse de l'order
	const test = () => {
		console.log('yo');
		// const reformatedData = {
		//     idUser: '65e6e7249333d0bcd3044e5a',
		//     idJob: consumerService.jobs,
		//     idJobTask: consumerService.jobTasks,
		//     Date: consumerService.date,
		//     status: consumerService.status,
		//     price: consumerService.price,
		//     IdAddress: '202020'
		// }
		// On recup l'id de l'addresse avec le premier fetch
		fetch(`http://192.168.1.114:3000/orders/getIdAddress/${idOrder}`).then((data) => {
			// On recup lat et long de l'addresse avec le deuxieme fetch
			// grace a l'id addresse
			fetch(`http://192.168.1.114:3000/address/${data.idAddress}`).then((position) => {
				console.log(position);
			});
		});
	};
	// Recuperer la position des utilisateurs en ligne de moins
	//  de 10km de l'addresse

	// useEffect(() => {
	//     console.log('yo');
	//     fetch(`http://192.168.1.114:3000/orders/getIdAddress/${idOrder}`)
	//         .then(response => response.json())
	//         .then(data => {
	//             console.log('data : ', data);
	//             // On recup lat et long de l'addresse avec le deuxieme fetch
	//             // grace a l'id addresse
	//             fetch(`http://192.168.1.114:3000/address/${data.IdAddress}`)
	//                 .then(response => response.json())
	//                 .then(position => {
	//                     console.log('position : ', position);
	//                     fetch(`http://192.168.1.114:3000/user/findUserNearbyAndGiveOrder/${position.latitude}/${position.longitude}/${idOrder}`)
	//                         .then(response => response.json())
	//                         .then(userNearby => {
	//                             console.log('userNearby : ', userNearby);
	//                         })

	//                 })
	//         })
	// }, [])
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Recherche d'artisan en cours</Text>
			<LoadingSpinner />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 50
	},
	title: {
		fontSize: 30,
		fontWeight: 'bold',
		textAlign: 'center',
		margin: 30
	}
});

export default ServiceSearchPro;
