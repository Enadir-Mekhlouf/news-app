import React, {useEffect} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text} from 'react-native';

import Home from './App/screens/Home';
import axios from 'axios';

const App = () => {
  return (
    <SafeAreaView
      style={{flex: 1, padding: 1, backgroundColor: 'white', width: '100%'}}>
      <ScrollView>
        <Home />
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
