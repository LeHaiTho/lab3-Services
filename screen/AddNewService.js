import React, {useState} from 'react';
import {Alert, Image, StyleSheet, View} from 'react-native';
import {Button, HelperText, Text, TextInput} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import {useMyContextController} from '../store';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-crop-picker';
import Input from '../components/Input';
import ButtonComponent from '../components/ButtonComponent';

export default function AddNewService({navigation}) {
  const [controller, dispatch] = useMyContextController();
  const {userLogin} = controller;
  const [serviceName, setServiceName] = React.useState('');
  const [price, setPrice] = React.useState('');
  const hasErrorServiceName = () => serviceName == '';
  const [image, setImage] = useState('');
  const SERVICES = firestore().collection('SERVICES');
  const handleAddNewService = () => {
    SERVICES.add({
      serviceName,
      price,
      createBy: userLogin.fullname,
    })
      .then(respone => {
        const refImage = storage().ref('/services/' + respone.id + '.png');
        if (image != '') {
          refImage
            .putFile(image)
            .then(() => {
              refImage
                .getDownloadURL()
                .then(link => SERVICES.doc(respone.id).update({image: link}));
            })
            .catch(e => console.log(e.message));
        }
        SERVICES.doc(respone.id).update({id: respone.id});
        Alert.alert('Add new service success');
        navigation.goBack();
      })
      .catch(e => Alert.alert('Add new service fail'));
  };
  const hasErrorPrice = () => price <= 0;

  const handleUploadImage = () => {
    ImagePicker.openPicker({
      height: 300,
      width: 400,
      mediaType: 'photo',
      cropping: true,
    })
      .then(image => setImage(image.path))
      .catch(e => console.log(e.message));
  };

  return (
    <View style={{flex: 1, padding: 10, backgroundColor: 'white'}}>
      {image != '' && <Image source={{uri: image}} style={{height: 300}} />}
      <Input
        label="Tên dịch vụ"
        value={serviceName}
        onChangeText={setServiceName}
        placeholder="Điền tên dịch vụ"
      />
      <HelperText type="error" visible={hasErrorServiceName}>
        Không để trống tên dịch vụ
      </HelperText>
      <Input
        label="Giá dịch vụ"
        value={price}
        onChangeText={setPrice}
        placeholder="Điền giá dịch vụ"
      />
      <HelperText type="error" visible={hasErrorPrice}>
        {'Giá phải lớn hơn 0'}
      </HelperText>
      <Button onPress={handleUploadImage}>Thêm ảnh</Button>
      <ButtonComponent title={'Thêm dịch vụ'} onPress={handleAddNewService} />
    </View>
  );
}
