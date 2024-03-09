export const getCurrentRoute = async ({navigation}) => {
	const currentRoute = await navigation.getCurrentRoute();

	if (currentRoute) {
		console.log('Route actuelle :', currentRoute.name);
		return currentRoute;
	} else {
		console.log('Impossible de récupérer la route actuelle');
	}
};
