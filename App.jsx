import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AcceuilScreen from './screens/AcceuilScreen';
import RegisterScreen from './screens/RegisterScreen';
import ConnectionScreen from './screens/ConnectionScreen';

const Stack = createNativeStackNavigator();



export default function App() {


  return (
 
  <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Acceuil" component={AcceuilScreen} />
      <Stack.Screen name="Inscription" component={RegisterScreen} />
      <Stack.Screen name="Connection" component={ConnectionScreen} />
    </Stack.Navigator>
  </NavigationContainer>

  );
}


