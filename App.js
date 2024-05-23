import 'react-native-gesture-handler';
import {View, Text} from 'react-native';
import React from 'react';
import RegisterScreen from './src/screens/RegisterScreen';
import MyStack from './src/routes/MyStack';
import {MyContextControllerProvider} from './src/context';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useEffect} from 'react';
const App = () => {
  const USERS = firestore().collection('USERS');
  const admin = {
    fullname: 'admin',
    email: 'letho11112002@gmail.com',
    password: 'admin123',
    phoneNumber: '324230840328',
    role: 'admin',
    address: 'Bình Dương',
  };
  useEffect(() => {
    USERS.doc(admin.email).onSnapshot(u => {
      if (!u.exists) {
        auth()
          .createUserWithEmailAndPassword(admin.email, admin.password)
          .then(() => {
            USERS.doc(admin.email).set(admin);
            console.log('add new admin account');
          });
      } else {
        console.log('admin account already exists');
      }
    });
  }, []);
  return (
    <MyContextControllerProvider>
      <MyStack />
    </MyContextControllerProvider>
  );
};

export default App;
