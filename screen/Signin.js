import {Alert, StyleSheet, View, ScrollView, Image} from 'react-native';
import {Button, Icon, Text, TextInput} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import React, {useEffect, useState} from 'react';
import '@react-native-firebase/app';
import {login, useMyContextController} from '../store';
import Input from '../components/Input';
import ButtonComponent from '../components/ButtonComponent';
import COLORS from '../constants/color';
import ChangePassword from './ChangePass';

function Signin({navigation}) {
  const [email, setEmail] = useState('ad@gmail.com');
  const [password, setPassword] = useState('12341234');
  const [errorEmail, setErrorEmail] = React.useState('');
  const [errorPassword, setErrorPassword] = React.useState('');
  const [disable, setDisable] = React.useState(false);
  const [controller, dispatch] = useMyContextController();
  const {userLogin} = controller;

  useEffect(() => {
    if (userLogin != null) {
      if (userLogin.role == 'admin') {
        navigation.navigate('Admin');
      } else if (userLogin.role == 'customer') {
        navigation.navigate('Customer');
      }
    }
    console.log(userLogin);
  }, [navigation, userLogin]);

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
        justifyContent: 'center',
      }}>
      <Input
        label={'Địa chỉ email'}
        iconName={'email-outline'}
        placeholder={'Nhập địa chỉ email'}
        onChangeText={setEmail}
        value={email}
      />
      <Input
        label={'Mật khẩu'}
        iconName={'lock-outline'}
        placeholder={'Nhập mật khẩu'}
        onChangeText={setPassword}
        value={password}
        password
      />
      <ButtonComponent
        title="ĐĂNG NHẬP"
        disable={disable}
        onPress={handleLogin}
      />
      <Text
        style={{
          color: COLORS.black,
          textAlign: 'center',
          fontSize: 16,
          fontWeight: 'bold',
          marginTop: 20,
        }}
        onPress={() => navigation.navigate('Signup')}>
        Chưa có tài khoản? Đăng ký
      </Text>
      <Text
        style={{
          color: COLORS.black,
          textAlign: 'center',
          fontSize: 16,
          fontWeight: 'bold',
          marginTop: 20,
        }}
        onPress={() => navigation.navigate('ForgotPass')}>
        Quên mật khẩu
      </Text>
    </ScrollView>
  );
}
export default Signin;
