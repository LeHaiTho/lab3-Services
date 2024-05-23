import {View, Text, Alert, Image, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {HelperText} from 'react-native-paper';
import {login, useMyContextController} from '../context';
import COLORS from '../constants/color';
import Button from '../components/Button';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Input from '../components/Input';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorEmail, setErrorEmail] = React.useState('');
  const [errorPassword, setErrorPassword] = React.useState('');
  const [disable, setDisable] = React.useState(false);
  const [controller, dispatch] = useMyContextController();
  const {userLogin} = controller;

  useEffect(() => {
    if (userLogin !== null) {
      if (userLogin.role === 'admin') {
        console.log('Đi tới tài khoản admin');
        navigation.navigate('Admin');
      } else if (userLogin.role === 'customer') {
        console.log('đi tới tài khoản custom:', userLogin.email);
        navigation.navigate('Customer');
      }
    }
    if (email === '') {
      setErrorEmail('Vui lòng điền thông tin');
    } else {
      setErrorEmail('');
    }
    if (0 < password.length < 6) {
      setErrorPassword('Mật khẩu có độ dài hơn 6 kí tự');
    } else {
      setErrorPassword('');
    }
    if (email === '' || password === '') {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [userLogin, email, password]);
  const handleLogin = () => {
    login(dispatch, email, password);
  };

  return (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: 20,
        paddingVertical: 30,
        backgroundColor: COLORS.white,
        flex: 1,
      }}>
      <View
        style={{
          width: '100%',
          height: '30%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          style={{
            width: 100,
            height: 100,
            resizeMode: 'center',
          }}
          source={require('../assets/images/logo-vertical.png')}
        />
      </View>
      <Input
        label={'Email'}
        iconName={'email-outline'}
        placeholder={'Enter your email address'}
        onChangeText={setEmail}
        value={email}
      />
      {errorEmail && <HelperText type="error">{errorEmail}</HelperText>}
      <Input
        label={'Password'}
        iconName={'lock-outline'}
        placeholder={'Enter your password'}
        onChangeText={setPassword}
        value={password}
        password
      />
      {errorPassword && <HelperText type="error">{errorPassword}</HelperText>}
      <Button title="Login" disable={disable} onPress={handleLogin} />
      <Text
        style={{
          color: COLORS.black,
          textAlign: 'center',
          fontSize: 16,
          fontWeight: 'bold',
          marginTop: 10,
        }}
        onPress={() => navigation.navigate('RegisterScreen')}>
        Don't have account? Sign up
      </Text>
    </ScrollView>
  );
};

export default LoginScreen;
