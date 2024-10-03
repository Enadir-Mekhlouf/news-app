import React, {useEffect} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignIN from './App/screens/Login';
import Home from './App/screens/Home';
import axios from 'axios';
import SignUP from './App/screens/SignUp';

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    // <SafeAreaView
    //   style={{flex: 1, padding: 1, backgroundColor: 'white', width: '100%'}}>
    //   <Home />
    //   {/* <LoginPage />
    //   <SignUP /> */}
    // </SafeAreaView>

    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SignIn"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="SignIn" component={SignIN} />
        <Stack.Screen name="SignUp" component={SignUP} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
