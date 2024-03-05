import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/consumer/HomeScreen'
import ProfilScreen from './screens/consumer/ProfilScreen';
import MessageScreen from './screens/consumer/MessageScreen';
import ServiceScreen from './screens/consumer/ServiceScreen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = '';

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Service') {
            iconName = 'plus-square-o';
          } else if (route.name === 'Message') {
            iconName = 'wechat';
          } else if (route.name === 'Profil') {
            iconName = 'user';
          }

          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        tabBarStyle: { backgroundColor: '#786396' }, // Changez 'blue' par la couleur de fond souhaitée
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: '#979797',
        headerShown: false,
      })}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Service" component={ServiceScreen} />
        <Tab.Screen name="Message" component={MessageScreen} />
        <Tab.Screen name="Profil" component={ProfilScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
