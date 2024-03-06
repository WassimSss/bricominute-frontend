import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AcceuilScreen from './screens/AcceuilScreen';
import RegisterScreen from './screens/RegisterScreen';
import ConnectionScreen from './screens/ConnectionScreen';
import HomeScreen from './screens/HomeScreen';


const Stack = createNativeStackNavigator();

// redux imports
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import user from './reducers/user';

const store = configureStore({
  reducer: { user },
 });

export default function App() {


  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Acceuil" component={AcceuilScreen} />
          <Stack.Screen name="Connection" component={ConnectionScreen} />
          <Stack.Screen name="Inscription" component={RegisterScreen} />
        </Stack.Navigator>
      </NavigationContainer>
  </Provider>
  );
}


