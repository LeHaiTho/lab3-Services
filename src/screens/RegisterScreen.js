import React, { useEffect, useState } from 'react'
import { Keyboard, Text, View, ScrollView } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Input from '../components/Input'
import COLORS from '../constants/color'
import { createAccount } from '../context'
import Button from '../components/Button'
import { HelperText } from 'react-native-paper'

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullname, setFullname] = useState('')
  const [errorEmail, setErrorEmail] = React.useState('');
  const [errorPassword, setErrorPassword] = React.useState('');
  const [errorFullname, setErrorFullname] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('')
  const [errorconfirmPassword, setErrorConfirmPassword] = React.useState('');
  const [disable, setDisable] = React.useState(false)
  let reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  useEffect(() => {

    if (email === '') {
      setErrorEmail('Vui lòng điền thông tin')
    } else if (!email.match(reg)) {
      setErrorEmail('Địa chỉ email không hợp lệ')
    } else {
      setErrorEmail('')
    }
    if (fullname === '') {
      setErrorFullname('Điền thông tin họ và tên')
    } else {
      setErrorFullname('')
    }
    if (password.length < 6) {
      setErrorPassword('Mật khẩu cần 6 từ khóa trở lên')
    } else {
      setErrorPassword('')
    }
    if (confirmPassword !== password) {
      setErrorConfirmPassword('Mật khẩu không trùng khớp')
    } else {
      setErrorConfirmPassword('')
    }
    if (email === '' || password === '' || confirmPassword === '' || fullname === '' || password !== confirmPassword) {
      setDisable(true)
    }
    else { setDisable(false) }



  }, [email, password, fullname, confirmPassword])

  const handleRegister = () => {
    createAccount(email, password, fullname)
    navigation.navigate("LoginScreen")
  }

  return (
    <ScrollView style={{
      paddingTop: 50,
      paddingHorizontal: 20,
      backgroundColor: COLORS.white,
      flex: 1,
    }}>
      <View style={{
        marginVertical: 20,
        backgroundColor: COLORS.white,
      }}>
        <Input label={'Fullname'}
          value={fullname}
          iconName={'account-box-outline'}
          placeholder={'Enter your fullname'}
          onChangeText={setFullname}
        />
        {errorFullname && <HelperText type="error">{errorFullname}</HelperText>}

        <Input label={'Email'}
          iconName={'email-outline'}
          placeholder={'Enter your email address'}
          onChangeText={setEmail}
          value={email}
        />
        {errorEmail && <HelperText type="error">{errorEmail}</HelperText>}
        <Input label={'Password'}
          iconName={'lock-outline'}
          placeholder={'Enter your password'}
          onChangeText={setPassword}
          value={password}
          password
        />
        {errorPassword && <HelperText type="error">{errorPassword}</HelperText>}
        <Input label={'Confirm Password'}
          iconName={'shield-lock-outline'}
          placeholder={'Enter confirm password'}
          value={confirmPassword}
          password
          onChangeText={setConfirmPassword}
        />
        {errorconfirmPassword && (<HelperText type="error">{errorconfirmPassword}</HelperText>
        )}
        <Button title="Register"
          disable={disable}
          onPress={handleRegister} />
        <Text style={{
          color: COLORS.black,
          textAlign: 'center',
          fontSize: 16,
          fontWeight: 'bold',
          marginTop: 10
        }}
          onPress={() => navigation.navigate('LoginScreen')}
        > Already have account? Login
        </Text>
      </View>
    </ScrollView >

  )
}


export default RegisterScreen