import React from 'react';
import {Alert, Text, View} from 'react-native';
import {SafeAreaView, StyleSheet, TextInput} from 'react-native';
import CustomTextInput from '../components/TextInput';
import CustomButton from '../components/CustomButton';
import axios from 'axios';

const SignUP = ({navigation}: any) => {
  const [text, onChangeText] = React.useState('');
  const [Password, onChangePassword] = React.useState('');
  const [email, onChangeEmail] = React.useState('');

  const name = text;
  const emailsend = email;
  const password = Password;
  const HandleSubmit = async () => {
    try {
      const response = await axios.post('http://10.0.2.2:5000/auth/register', {
        name,
        email: emailsend,
        password,
      });
      console.log('Signup successful:', response.data);
      // Handle successful signup (e.g., navigate to another screen or store token)
      navigation.navigate('SignIn');
    } catch (error) {
      console.error(
        'Signup failed:',
        error.response ? error.response.data : error.message,
      );
      Alert.alert(
        'Signup failed',
        error.response?.data?.msg || 'Signup failed',
      );
    } finally {
      // Reset loading or perform other actions after completion
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#ffffff',
        padding: 10,
      }}>
      <View
        style={{
          flex: 1,
          paddingBottom: '20%',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
        <View>
          <View style={{alignSelf: 'flex-start', paddingBottom: '20%'}}>
            <Text style={{fontSize: 30, color: '#050505'}}>
              Create Your Account
            </Text>
          </View>
          <View style={{paddingBottom: '20%'}}>
            <View>
              <Text style={{color: '#050505'}}>Username</Text>

              <CustomTextInput
                value={text}
                onChangeText={onChangeText}
                placeholder={'Username'}
                secureTextEntry={false}
              />
            </View>
            <View>
              <Text style={{color: '#050505'}}>Email</Text>

              <CustomTextInput
                value={email}
                onChangeText={onChangeEmail}
                placeholder={'Email'}
                secureTextEntry={false}
              />
            </View>
            <View>
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
                title={'Start'}
                onPress={() => navigation.navigate('Home')}
                theme={'primary'}
              />
            </View>

            <View style={{padding: 5, width: 300}}>
              <CustomButton
                title={'Sign up'}
                onPress={HandleSubmit}
                theme={'secondary'}
              />
            </View>
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

export default SignUP;
