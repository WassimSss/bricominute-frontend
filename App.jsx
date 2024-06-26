import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AcceuilScreen from './screens/AcceuilScreen';
import RegisterScreen from './screens/RegisterScreen';
import ConnectionScreen from './screens/ConnectionScreen';
import HomeScreen from './screens/HomeScreen';
import HomeScreenConsumer from './screens/consumer/HomeScreenConsumer';
import DocumentScreen from './screens/DocumentScreen';
import PaiementScreen from "./screens/PaiementScreen";
import Messagerie from './screens/Messagerie'
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import user from './reducers/user';
import inscription from './reducers/inscription';

import AsyncStorage from '@react-native-async-storage/async-storage';
import InscriptionproScreen from './screens/InscriptionproScreen';
import LegalInformationPage from './screens/consumer/LegalInformationPage'
import TransactionPage from './screens/consumer/TransactionPage'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfilScreen from './screens/consumer/ProfilScreen';
import MessageScreen from './screens/consumer/MessageScreen';
import ServiceScreen from './screens/consumer/ServiceScreen';
import NotesScreen from './screens/consumer/NotesScreen'
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import consumerServices from './reducers/consumerServices'
import { Provider } from 'react-redux';
import ProScreen from "./screens/pro/ProScreen";
import HelpCenterPage from './screens/consumer/HelpCenterPage'


const reducers = combineReducers({ consumerServices, user, inscription });
const persistConfig = { key: 'bricominute', storage: AsyncStorage };

const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
// redux imports

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName = '';

        if (route.name === 'Home') {
          iconName = 'home';
        } else if (route.name === 'Service') {
          iconName = 'plus-square-o';
        } else if (route.name === 'Messagerie') {
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
      <Stack.Screen name="Messagerie" component={Messagerie} />
      <Tab.Screen name="Profil" component={ProfilScreen} />
    </Tab.Navigator>
  );
}

export default function App() {


  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Acceuil" component={AcceuilScreen} />
            <Stack.Screen name="Inscription" component={RegisterScreen} />
            <Stack.Screen name="TabNavigator" component={TabNavigator} />
            <Stack.Screen name="Document" component={DocumentScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Connection" component={ConnectionScreen} />
            <Stack.Screen name="Note" component={NotesScreen} />
            <Stack.Screen name="Insciptionpro" component={InscriptionproScreen} />
            <Stack.Screen name="paiement" component={PaiementScreen} />
            <Stack.Screen name="Pro" component={ProScreen} />
            <Stack.Screen name="Messagerie" component={Messagerie} />
            <Tab.Screen name="LegalInformation" component={LegalInformationPage} />
            <Tab.Screen name="HelpCenter" component={HelpCenterPage} />
            <Tab.Screen name="Transaction" component={TransactionPage} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}