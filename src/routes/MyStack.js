import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React, { useEffect } from 'react'
import 'react-native-gesture-handler'
import { useMyContextController } from '../context'
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen'
import HomeScreen from '../screens/HomeScreen'
import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'
import { Appbar, Title } from 'react-native-paper'
const Stack = createStackNavigator()
const MyStack = ({ navigation }) => {
  const [controller, dispatch] = useMyContextController()
  const { userLogin } = controller
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: 'center',
        }}>

        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            headerLeft: null,
            title: 'Xin chào, ' +
              (userLogin != null && userLogin.fullname)
          }} />
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{
            title: 'Register'
          }} />

        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen} options={{
            title: 'Login',
            headerLeft: null,
          }}
        />

        <Stack.Screen
          name="ForgotPasswordScreen"
          component={ForgotPasswordScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MyStack