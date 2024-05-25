import {Alert, StyleSheet, View} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import React from 'react';
import auth from '@react-native-firebase/auth';
import Input from '../components/Input';
import ButtonComponent from '../components/ButtonComponent';
import COLORS from '../constants/color';

function ForgotPass({navigation}) {
  const [email, setEmail] = React.useState('');
  const handlResetPass = () => {
    auth()
      .sendPasswordResetEmail(email)
      .then(() => Alert.alert('Vui lòng kiểm tra email'))
      .catch(e => Alert.alert(e.message));
  };
  return (
    <View
      style={{
        backgroundColor: '#fff',
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
      }}>
      <Text style={{color: COLORS.blue, fontWeight: 'bold', fontSize: 25}}>
        Thay đổi mật khẩu
      </Text>
      <Input
        label={'Email'}
        value={email}
        onChangeText={setEmail}
        iconName={'email'}
        placeholder={'Điền địa chỉ email'}
      />
      <ButtonComponent title={'Gửi đến email'} onPress={handlResetPass} />
      <View style={{flexDirection: 'column'}}>
        <Text
          onPress={() => navigation.navigate('Signin')}
          style={{
            marginTop: 10,
            fontStyle: 'italic',
            textAlign: 'right',
            color: COLORS.blue,
            fontWeight: 'medium',
            fontSize: 20,
          }}>
          Back
        </Text>
      </View>
    </View>
  );
}
export default ForgotPass;
