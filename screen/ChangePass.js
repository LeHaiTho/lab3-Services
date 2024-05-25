import React, {useEffect} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useMyContextController} from '../store';
import Input from '../components/Input';
import ButtonComponent from '../components/ButtonComponent';

export default function ChangePassword({navigation}) {
  const [controller, dispatch] = useMyContextController();
  const {userLogin} = controller;
  const [curenPassword, setCurenPassword] = React.useState('');
  const [newPassword, setNewPassWord] = React.useState('');
  const [confirmNewPassword, setConfirmNewPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);

  useEffect(() => {
    if (userLogin == null) navigation.navigate('Signin');
  }, [userLogin]);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const reauthenticate = curenPassword => {
    var user = auth().currentUser;
    var cred = auth.EmailAuthProvider.credential(user.email, curenPassword);
    return user.reauthenticateWithCredential(cred);
  };

  const handleChangePassword = () => {
    if (newPassword !== confirmNewPassword) {
      Alert.alert('Don not match password');
      return;
    }
    reauthenticate(curenPassword)
      .then(() => {
        var user = auth().currentUser;
        user
          .updatePassword(newPassword)
          .then(() => {
            firestore()
              .collection('USERS')
              .doc(userLogin.email)
              .update({password: newPassword});
          })
          .catch(e => console.log(e.message));
      })
      .catch(e => console.log(e.message));
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',
        padding: 30,
      }}>
      <Input
        label={'Mật khẩu hiện tại'}
        value={curenPassword}
        onChangeText={setCurenPassword}
        password
      />
      <Input
        label={'Mật khẩu mới'}
        value={newPassword}
        onChangeText={setNewPassWord}
        password
      />
      <Input
        label={'Nhập lại mật khẩu mới'}
        value={confirmNewPassword}
        onChangeText={setConfirmNewPassword}
        password
      />

      <ButtonComponent onPress={handleChangePassword} title={'CẬP NHẬT '} />
    </View>
  );
}
