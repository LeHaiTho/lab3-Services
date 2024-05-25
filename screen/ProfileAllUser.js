import React, {useEffect} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {Avatar, Button, Icon, Text} from 'react-native-paper';
import {logout, useMyContextController} from '../store';
import {useRoute} from '@react-navigation/native';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import COLORS from '../constants/color';

export default function ProfileAllUser({navigation}) {
  const [controller, dispatch] = useMyContextController();
  const route = useRoute();
  const {fullname, role, email, phone} = route.params;
  const {userLogin} = controller;
  const [imageAvatar, setImageAvatar] = React.useState('');
  const USERS = firestore().collection('USERS');
  useEffect(() => {
    if (userLogin == null) {
      navigation.navigate('Signin');
    }
    const showInfo = USERS.doc(email).onSnapshot(doc => {
      if (doc.exists) {
        const userData = doc.data();
        setImageAvatar(userData.image);
      } else {
        Alert.alert('User not found');
      }
    });
    return () => {
      showInfo();
    };
  }, [navigation, userLogin]);

  const onSubmit = () => {
    logout(dispatch);
  };

  return (
    <View
      style={{
        margin: 20,
      }}>
      <View style={{flexDirection: 'column'}}>
        <Icon source="account" size={30} color={COLORS.blue} />
        <Text style={{color: COLORS.blue, fontSize: 18, fontWeight: 'bold'}}>
          User Name:{' '}
        </Text>
        <Text>{fullname}</Text>
      </View>
      <View>
        <Icon source="email" size={30} color={COLORS.blue} />
        <Text style={{color: COLORS.blue, fontSize: 18, fontWeight: 'bold'}}>
          Email:{' '}
        </Text>
        <Text>{email}</Text>
      </View>
      <View>
        <Icon source="phone" size={30} color={COLORS.blue} />
        <Text style={{color: COLORS.blue, fontSize: 18, fontWeight: 'bold'}}>
          Phone:{' '}
        </Text>
        <Text>{phone}</Text>
      </View>
    </View>
  );
}
