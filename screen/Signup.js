import {Alert, StyleSheet} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import '@react-native-firebase/app';
import {signup} from '../store';
import React, {useEffect, useState} from 'react';
import {Keyboard, Text, View, ScrollView} from 'react-native';
import Input from '../components/Input';
import COLORS from '../constants/color';
import {createAccount} from '../context';
import ButtonComponent from '../components/ButtonComponent';
import {HelperText} from 'react-native-paper';

function Signup({navigation}) {
  const [email, setEmail] = React.useState('');
  const [pass, setPass] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [password, setPassword] = useState('');
  const [fullname, setFullname] = useState('');
  const [errorEmail, setErrorEmail] = React.useState('');
  const [errorPassword, setErrorPassword] = React.useState('');
  const [errorFullname, setErrorFullname] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [errorconfirmPassword, setErrorConfirmPassword] = React.useState('');
  const [disable, setDisable] = React.useState(false);
  let reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    if (email === '') {
      setErrorEmail('Vui lòng điền thông tin');
    } else if (!email.match(reg)) {
      setErrorEmail('Địa chỉ email không hợp lệ');
    } else {
      setErrorEmail('');
    }
    if (fullname === '') {
      setErrorFullname('Điền thông tin họ và tên');
    } else {
      setErrorFullname('');
    }
    if (password.length < 6) {
      setErrorPassword('Mật khẩu cần 6 từ khóa trở lên');
    } else {
      setErrorPassword('');
    }
    if (
      email === '' ||
      password === '' ||
      password.length < 6 ||
      fullname === ''
    ) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [email, password, fullname, confirmPassword]);

  const handleCreateAccount = () => {
    const role = 'customer';
    signup(email, password, fullname, phone, role);
    navigation.goBack();
  };

  return (
    <ScrollView
      style={{
        paddingTop: 50,
        paddingHorizontal: 20,
        backgroundColor: COLORS.white,
        flex: 1,
      }}>
      <View
        style={{
          marginVertical: 20,
          backgroundColor: COLORS.white,
        }}>
        <Input
          label={'Họ và tên'}
          value={fullname}
          iconName={'account-box-outline'}
          placeholder={'Nhập họ và tên'}
          onChangeText={setFullname}
        />
        {errorFullname && <HelperText type="error">{errorFullname}</HelperText>}

        <Input
          label={'Email'}
          iconName={'email-outline'}
          placeholder={'Nhập địa chỉ email'}
          onChangeText={setEmail}
          value={email}
        />
        {errorEmail && <HelperText type="error">{errorEmail}</HelperText>}
        <Input
          label={'Mật khẩu'}
          iconName={'lock-outline'}
          placeholder={'Nhập mật khẩu'}
          onChangeText={setPassword}
          value={password}
          password
        />
        {errorPassword && <HelperText type="error">{errorPassword}</HelperText>}
        <Input
          label={'Điện thoại'}
          iconName={'phone'}
          placeholder={'Nhập số điện thoại'}
          value={phone}
          onChangeText={setPhone}
        />
        <ButtonComponent
          title="ĐĂNG KÝ"
          disable={disable}
          onPress={handleCreateAccount}
        />
        <Text
          style={{
            color: COLORS.black,
            textAlign: 'center',
            fontSize: 16,
            fontWeight: 'bold',
            marginTop: 10,
          }}
          onPress={() => navigation.navigate('Signin')}>
          {' '}
          Quay lại đăng nhập
        </Text>
      </View>
    </ScrollView>
  );
}
export default Signup;
