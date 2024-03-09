import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

import React, { useEffect } from 'react';
import {checkTokenAndRedirect} from '../../utils/checkTokenAndRedirect';

export default function MessageScreen({ navigation }) {
	const user = useSelector((state) => state.user.value);

	useEffect(() => {
		checkTokenAndRedirect(navigation, user);
	}, []);
	return (
		<View>
			<Text>Message</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ffffff',
		alignItems: 'center',
		justifyContent: 'center'
	}
});
