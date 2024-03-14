import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AcceuilScreen from './screens/AcceuilScreen';
import RegisterScreen from './screens/RegisterScreen';
import ConnectionScreen from './screens/ConnectionScreen';
import HomeScreen from './screens/HomeScreen';
import HomeScreenConsumer from './screens/consumer/HomeScreenConsumer'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfilScreen from './screens/consumer/ProfilScreen';
import MessageScreen from './screens/consumer/MessageScreen';
import ServiceScreen from './screens/consumer/ServiceScreen';
import NotesScreen from './screens/consumer/NotesScreen'
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import consumerServices from './reducers/consumerServices'

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
// redux imports
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import user from './reducers/user';

const store = configureStore({
  reducer: { user, consumerServices },
});

const TabNavigator = () => {
  return (
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
      <Tab.Screen name="Home" component={HomeScreenConsumer} />
      <Tab.Screen name="Service" component={ServiceScreen} />
      <Tab.Screen name="Message" component={MessageScreen} />
      <Tab.Screen name="Profil" component={ProfilScreen} />
    </Tab.Navigator>
  );
}

export default function App() {


  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
          <Stack.Screen name="Note" component={NotesScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Acceuil" component={AcceuilScreen} />
          <Stack.Screen name="Connection" component={ConnectionScreen} />
          <Stack.Screen name="Inscription" component={RegisterScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}


