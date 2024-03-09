import { View, ActivityIndicator, StyleSheet, Dimensions, Text } from 'react-native';
import MapView from 'react-native-maps';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React, { useEffect } from 'react';
import { checkTokenAndRedirect } from '../../../utils/checkTokenAndRedirect';
import { useSelector } from 'react-redux';

const ServiceProInComming = ({ navigation }) => {
	const user = useSelector((state) => state.user.value);

	useEffect(() => {
		checkTokenAndRedirect(navigation, user);
	}, []);
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
					<Text style={styles.text}>Aziz</Text>
					<Text style={styles.text}>Momo Plomberie</Text>
				</View>
				<Text>
					<FontAwesome name="wechat" size={40} color="#786396" />;
				</Text>
				<Text style={styles.text}>4mn</Text>
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
