import {View, Text, Alert} from 'react-native';
import React, {useEffect} from 'react';
import {useState} from 'react';
import Input from '../components/Input';
import {HelperText, TextInput} from 'react-native-paper';
import Button from '../components/Button';
import firestore from '@react-native-firebase/firestore';
import {useMyContextController} from '../context';

const AddNewServiceScreen = ({navigation}) => {
  const [serviceName, setServiceName] = useState('');
  const [price, setPrice] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const hasErrorServiceName = () => serviceName == '';
  const hasErrorPrice = () => price < 0;
  const SERVICES = firestore().collection('SERVICES');
  const [controller, dispatch] = useMyContextController();
  const {userLogin} = controller;

  const handleAddNewService = () => {
    SERVICES.add({
      serviceName,
      price,
      createdBy: userLogin.fullname,
    })
      .then(res => {
        Alert.alert('Add new service successfully added');
        SERVICES.doc(res.id).update({id: res.id});
        navigation.navigate('ServicesScreen');
        console.log('thêm thành công');
      })
      .catch(err => console.log(err));
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
      }}>
      <Input
        placeholder={'Add name service'}
        iconName={'room-service-outline'}
        value={serviceName}
        onChangeText={setServiceName}
      />

      <Input
        placeholder={'Add price service'}
        iconName={'cash'}
        value={price}
        onChangeText={setPrice}
      />

      <Button
        // disable={isDisabled}
        onPress={handleAddNewService}
        title={'Add new'}
      />
    </View>
  );
};

export default AddNewServiceScreen;
