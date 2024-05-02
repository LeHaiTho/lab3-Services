import { View, Text, Alert } from 'react-native'
import React, { useState } from 'react'
import { Button, TextInput } from 'react-native-paper'
import auth from '@react-native-firebase/auth'
import { createAccount } from '../context'

const RegisterScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullname, setFullname] = useState('')
  const [phone, setPhone] = useState('')

  const handleCreateAccount = () => {
    createAccount(email, password, phone, fullname)
  }
  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      gap: 10,
      padding: 10
    }}>
      <TextInput
        label='Full name'
        value={fullname}
        onChangeText={setFullname}
      />
      <TextInput
        label='Phone number'
        value={phone}
        onChangeText={setPhone}
      />
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

      <Button
        onPress={handleCreateAccount}
        textColor='white'
        buttonColor='purple'
        style={{
          padding: 5
        }}
      >
        Create account
      </Button>
    </View>
  )
}

export default RegisterScreen