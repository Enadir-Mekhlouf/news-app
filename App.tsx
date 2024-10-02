import React, {useEffect} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text} from 'react-native';
import LoginPage from './App/screens/Login';
import Home from './App/screens/Home';
import axios from 'axios';
import SignUP from './App/screens/SignUp';

const App = () => {
  return (
    <SafeAreaView
      style={{flex: 1, padding: 1, backgroundColor: 'white', width: '100%'}}>
      {/* <Home /> */}
      <LoginPage />
      {/* <SignUP /> */}
    </SafeAreaView>
  );
};

export default App;
