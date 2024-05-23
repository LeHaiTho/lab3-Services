import {View, Text, Image, FlatList} from 'react-native';
import React, {useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {IconButton} from 'react-native-paper';
import COLORS from '../constants/color';
import firestore from '@react-native-firebase/firestore';
const ServicesScreen = ({navigation}) => {
  const [services, setServices] = useState([]);
  const cSERVICES = firestore().collection('SERVICES');

  cSERVICES.onSnapshot(res => {
    const arr = [];
    res.forEach(u => arr.push(u.data()));
    setServices(arr);
  }, []);

  const renderItem = ({item}) => {
    const {serviceName, price, id} = item;
    return (
      <View
        style={{
          padding: 13,
          borderWidth: 1.5,
          borderColor: COLORS.grey,
          borderRadius: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 12,
        }}>
        <Text
          style={{
            color: 'black',
            fontSize: 16,
            fontWeight: 'bold',
          }}>
          {serviceName}
        </Text>
        <Text>{price} đ</Text>
      </View>
    );
  };
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 16,
        backgroundColor: 'white',
      }}>
      <View style={{alignItems: 'center'}}>
        <Image
          source={{
            uri: 'https://seeklogo.com/images/M/massage-envy-logo-A72A51F5FF-seeklogo.com.png',
          }}
          style={{
            width: 300,
            height: 120,
            resizeMode: 'contain',
          }}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 18,
            color: 'black',
          }}>
          Danh sách dịch vụ
        </Text>
        <IconButton
          icon={'plus-circle'}
          iconColor={COLORS.blue}
          onPress={() => navigation.navigate('AddNewServiceScreen')}
        />
      </View>
      <FlatList
        data={services}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default ServicesScreen;
