import React, {useEffect} from 'react';
import {View} from 'react-native';
import ButtonComponent from '../components/ButtonComponent';
import COLORS from '../constants/color';
import {logout, useMyContextController} from '../store';

export default function Setting({navigation}) {
  const [controller, dispatch] = useMyContextController();
  const {userLogin} = controller;
  useEffect(() => {
    if (userLogin == null) navigation.navigate('Signin');
  }, [navigation, userLogin]);
  const onSubmit = () => {
    logout(dispatch);
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        padding: 30,
        backgroundColor: COLORS.white,
      }}>
      <ButtonComponent
        onPress={() => navigation.navigate('ChangePass')}
        title={'Đổi mật khẩu'}
      />
      <ButtonComponent onPress={onSubmit} title={'Đăng xuất'} />
    </View>
  );
}
