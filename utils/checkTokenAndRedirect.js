export const checkTokenAndRedirect = (navigation, user, pageWantedToGo) => {
	
	console.log('check auth', user);
	console.log('pageWantedToGo : ', pageWantedToGo);
	// Si le user a un token (donc si il est connecté)
	if (user.token) {
		console.log('user a token');
		// Si c'est un professionnel
		if (user.pro) {
			console.log('redirect pro');
			navigation.navigate('Pro');
		} else {
			console.log('redirect part');
			navigation.navigate('TabNavigator');
		}
	} else {
		if (pageWantedToGo === 'Inscription') {
			console.log('redirect to Inscription');
			navigation.navigate('Inscription');
		} else if (pageWantedToGo === 'Connection') {
			navigation.navigate('Connection');
		}else {
			console.log('redirect to Acceuil');
			navigation.navigate('Acceuil');
		}
	}
};
