import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, View, TouchableOpacity} from 'react-native';
import {Avatar, Button, Text, TextInput} from 'react-native-paper';
import {useMyContextController} from '../store';
import firestore from '@react-native-firebase/firestore';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import {useRoute} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import Input from '../components/Input';
import ButtonComponent from '../components/ButtonComponent';

export default function EditProfile({navigation}) {
  const [controller, dispatch] = useMyContextController();
  const {userLogin} = controller;
  const [fullname, setFullname] = useState('');
  const [phone, setPhone] = useState('');
  // const [emailEdit, setEmailEdit] = useState('');
  const [imageAvatar, setImageAvatar] = React.useState('');
  const id = 0;

  const USERS = firestore().collection('USERS');

  useEffect(() => {
    if (userLogin == null) navigation.navigate('Signin');
    const showInfo = USERS.doc(userLogin.email).onSnapshot(doc => {
      if (doc.exists) {
        const userData = doc.data();
        setFullname(userData.fullname);
        setPhone(userData.phone);
        setImageAvatar(userData.image);
      } else {
        Alert.alert('User not found');
      }
    });

    return () => {
      showInfo();
    };
  }, [userLogin]);

  const updateInfo = () => {
    USERS.doc(userLogin.email)
      .update({
        fullname: fullname,
        phone: phone,
      })

      .then(response => {
        firestore()
          .collection('APPOIMENTS')
          .where('email', '==', userLogin.email)
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              doc.ref.update({customerId: fullname});
            });
          });
        Alert.alert('Cập nhật thành công!');
      })
      .catch(error =>
        console.error('Lỗi khi cập nhật thông tin người dùng: ', error),
      );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{flex: 1, padding: 10}}>
        <View>
          <Input
            label={'Họ và tên'}
            value={fullname}
            onChangeText={setFullname}
            iconName={'account'}
          />
        </View>
        <View>
          <Input
            iconName={'phone'}
            label="Số điện thoại"
            value={phone}
            onChangeText={setPhone}
          />
        </View>
        <ButtonComponent title={'CẬP NHẬT'} onPress={updateInfo} />
      </View>
    </View>
  );
}
