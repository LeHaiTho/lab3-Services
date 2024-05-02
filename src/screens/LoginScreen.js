import { View, Text, Alert } from 'react-native'
import React, { useState } from 'react'
import { Button, TextInput } from 'react-native-paper'
import auth from '@react-native-firebase/auth'

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        Alert.alert(`Đăng nhập thành công`)
        setEmail('')
        setPassword('')
      })
      .catch(err => Alert.alert(err.message))

  }
  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      gap: 10,
      padding: 10
    }}>
      <TextInput
        label='Email'
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        label='Password'
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button buttonColor='purple' textColor='white' onPress={handleLogin}> Login </Button>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <Button
          onPress={() =>
            navigation.navigate('RegisterScreen')
          }
        >
          Create a new account
        </Button>
        <Button onPress={() => navigation.navigate('ForgotPasswordScreen')}>
          Forgot your password
        </Button>
      </View>
    </View>
  )
}

export default LoginScreen