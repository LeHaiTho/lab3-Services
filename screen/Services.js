import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import {IconButton, List, Text, TextInput} from 'react-native-paper';
import {useMyContextController} from '../store';
import firestore from '@react-native-firebase/firestore';
import Profile from './Profile';
import COLORS from '../constants/color';
import Input from '../components/Input';

export default function Services({navigation}) {
  const [controller, dispatch] = useMyContextController();
  const {userLogin} = controller;
  const [service, setService] = useState([]);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [name, setName] = React.useState('');
  const [serviceData, setServiceData] = React.useState([]);
  const cSERVICES = firestore().collection('SERVICES');
  useEffect(() => {
    if (userLogin == null) {
      navigation.navigate('Signin');
    } else setIsAdmin(userLogin.role == 'admin');

    cSERVICES.onSnapshot(respone => {
      var arr = [];
      respone.forEach(doc => arr.push(doc.data()));
      setService(arr);
      setServiceData(arr);
    });
  }, [navigation, userLogin]);
  useEffect(() => {
    setServiceData(
      service.filter(data =>
        data.serviceName.toLocaleLowerCase().includes(name.toLocaleLowerCase()),
      ),
    );
  }, [name]);

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          padding: 10,
          justifyContent: 'space-between',
          borderColor: COLORS.grey,
          borderWidth: 1,
          marginVertical: 10,
          borderRadius: 10,
          alignItems: 'center',
        }}
        onPress={() => navigation.navigate('ServiceDetail', {id: item.id})}>
        <Text style={{fontWeight: 'bold', fontSize: 18}}>
          {item.serviceName}
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text
            style={{fontSize: 18, fontStyle: 'italic', color: COLORS.darkBlue}}>
            {item.price} đ
          </Text>
          <Image source={{uri: item.image}} style={{width: 100, height: 50}} />
        </View>
      </TouchableOpacity>
    );
  };

  const handleSearch = () => {
    console.log(name);
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View
        style={{
          backgroundColor: COLORS.blue,
          height: 50,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
        }}>
        <Text style={{marginLeft: 10, color: '#fff', fontSize: 20}}>
          {userLogin !== null && userLogin.fullname}
        </Text>
        <IconButton
          icon="account-circle"
          size={30}
          iconColor="#fff"
          onPress={() => navigation.navigate('Profile')}
        />
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          justifyContent: 'center',
          padding: 10,
        }}>
        <Input
          value={name}
          onChangeText={setName}
          placeholder={'Tìm kiếm dịch vụ...'}
          onPress={handleSearch}
        />
        <View
          style={{
            height: 50,
            backgroundColor: '#fff',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 10,
          }}>
          <Text style={{color: '#000', fontWeight: 'bold', fontSize: 16}}>
            Danh sách dịch vụ
          </Text>
          {isAdmin && (
            <IconButton
              icon="plus-circle"
              size={30}
              iconColor={COLORS.blue}
              onPress={() => navigation.navigate('AddNewService')}
            />
          )}
        </View>
        <FlatList
          data={serviceData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
}
