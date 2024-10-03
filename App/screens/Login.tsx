import React, {useEffect, useState} from 'react';
import {Alert, Text, View} from 'react-native';
import {SafeAreaView, StyleSheet} from 'react-native';
import CustomTextInput from '../components/TextInput';
import CustomButton from '../components/CustomButton';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const SignIN = ({navigation}: any) => {
  const [text, onChangeText] = React.useState('');
  const [Password, onChangePassword] = React.useState('');
  const [Token, setToken] = React.useState<string | null>(null);
  const email = text;
  const password = Password;

  // testing the if its stored or no

  // useEffect(() => {
  //   const fetchToken = async () => {
  //     try {
  //       const valueid = await AsyncStorage.getItem('userToken');
  //       setToken(valueid);
  //       console.log('userToken', valueid);
  //     } catch (error) {
  //       console.error('Error fetching the token:', error);
  //     }
  //   };

  //   fetchToken(); // Call the async function inside useEffect
  // }, []);

  const HandleSubmit = async () => {
    try {
      const response = await axios.post('http://10.0.2.2:5000/auth/login/', {
        email,
        password,
      });
      console.log('login sucess', response.data);
      const {id, token} = response.data;
      const useridtoken = {id, token};
      console.log(id, token);

      await AsyncStorage.setItem('userToken', token);
      await AsyncStorage.setItem('userId', id);

      navigation.navigate('Home', useridtoken);
      // Handle successful login here (e.g., save token, navigate to another screen)
    } catch (error) {
      console.error(
        'Login failed:',
        error.response ? error.response.data : error.message,
      );
      Alert.alert('Login failed', error.response?.data?.msg || 'Login failed'); // Display error message
    } finally {
      // Reset loading state or perform any cleanup if needed
    }
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#ffffff',
      }}>
      <View
        style={{
          flex: 1,
          paddingBottom: '20%',
          alignItems: 'center',
          justifyContent: 'space-around',
          width: '100%',
        }}>
        <View style={{width: '80%'}}>
          <View style={{alignSelf: 'flex-start', paddingBottom: '20%'}}>
            <Text style={{fontSize: 30, color: '#050505'}}>Welcome Back !</Text>
          </View>
          <View>
            <Text>here is the :{Token ? Token : ''}</Text>

            <Text style={{color: '#050505'}}>Username</Text>
            <CustomTextInput
              value={text}
              onChangeText={onChangeText}
              placeholder={'Username'}
              secureTextEntry={false}
            />
          </View>
          <View style={{paddingBottom: '20%'}}>
            <Text style={{color: '#050505'}}>Password</Text>

            <CustomTextInput
              value={Password}
              onChangeText={onChangePassword}
              placeholder={'Password'}
              secureTextEntry={true}
            />
          </View>
        </View>
        <View style={styles.centeredView}>
          <View style={{padding: 5, width: 300}}>
            <CustomButton
              title={'Sign up'}
              onPress={() => navigation.navigate('SignUp')}
              theme={'primary'}
            />
          </View>

          <View style={{padding: 5, width: 300}}>
            <CustomButton
              title={'Sign In'}
              onPress={HandleSubmit}
              theme={'secondary'}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  input: {
    height: 40,
    width: 320,
    marginBottom: 10,
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#eeeeee',
  },
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonStart: {
    backgroundColor: '#444444',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonTextStart: {
    color: 'white',
    fontSize: 16,
  },

  button: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
  },
});
export default SignIN;
