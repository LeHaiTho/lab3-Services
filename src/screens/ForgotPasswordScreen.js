import { View, Text, Alert } from 'react-native'
import React, { useState } from 'react'
import { Button, TextInput } from 'react-native-paper'
import auth from '@react-native-firebase/auth'

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('')

  const handleSendPassword = () => {
    auth().sendPasswordResetEmail(email)
      .then(() => {
        Alert.alert(`Vui lòng kiểm tra ${email}`)
        setEmail('')
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
      <Button onPress={handleSendPassword}>Send email</Button>
    </View>
  )
}

export default ForgotPasswordScreen