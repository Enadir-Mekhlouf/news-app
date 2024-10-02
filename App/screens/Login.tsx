import React from 'react';
import {Alert, Text, View} from 'react-native';
import {SafeAreaView, StyleSheet} from 'react-native';
import CustomTextInput from '../components/TextInput';
import CustomButton from '../components/CustomButton';
import axios from 'axios';
const SignIN = ({navigation}: any) => {
  const [text, onChangeText] = React.useState('');
  const [Password, onChangePassword] = React.useState('');
  const email = text;
  const password = Password;
  const HandleSubmit = async () => {
    try {
      const response = await axios.post('http://10.0.2.2:5000/auth/login/', {
        email,
        password,
      });
      console.log('Login successful:', response.data);
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
            <CustomButton title={'Start'} onPress={'hi'} theme={'primary'} />
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
