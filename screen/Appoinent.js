import React, {useEffect} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {IconButton, Text} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useMyContextController} from '../store';
import {useRoute} from '@react-navigation/native';
import {FlatList} from 'react-native-gesture-handler';
import COLORS from '../constants/color';

export default function Appoinent({navigation}) {
  const cAPPOIMENT = firestore().collection('APPOIMENTS');
  const [controller, dispatch] = useMyContextController();
  const {userLogin} = controller;
  const [appoimetLst, setAppoimentLst] = React.useState([]);
  useEffect(() => {
    if (userLogin == null) {
      navigation.navigate('Signin');
      return;
    }
    const list = cAPPOIMENT
      .where('email', '==', userLogin.email)
      .onSnapshot(async response => {
        const newArr = [];
        for (const doc of response.docs) {
          const appointmentData = doc.data();
          const serviceDocRef = firestore()
            .collection('SERVICES')
            .doc(appointmentData.serviceId);

          const serviceDoc = await serviceDocRef.get();
          if (serviceDoc.exists) {
            const serviceData = serviceDoc.data();
            const appointmentWithServiceName = {
              ...appointmentData,
              service: serviceData.serviceName,
            };
            newArr.push(appointmentWithServiceName);
          }
        }
        setAppoimentLst(newArr);
      });
    return () => list();
  }, [userLogin]);

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={{
          borderRadius: 5,
          borderWidth: 1,
          borderColor: COLORS.grey,
          marginTop: 10,
          marginHorizontal: 20,
        }}
        onPress={() => navigation.navigate('AppointmentDetail', {id: item.id})}>
        <View style={{flexDirection: 'row', padding: 20}}>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'column',
              flex: 1,
            }}>
            <View style={{flexDirection: 'row'}}>
              <Text>Tên khách hàng: </Text>
              <Text>{item.customerId}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text>Tên dịch vụ: </Text>
              <Text>{item.service}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text>Thời gian: </Text>
              <Text>{item.datetime.toDate().toLocaleString()}</Text>
            </View>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}>
            <Text onPress={() => handleAccept(item.id)}>
              {item.complete ? (
                <Text
                  style={{color: 'green', fontWeight: 'bold', fontSize: 16}}>
                  Chấp nhận
                </Text>
              ) : (
                <Text style={{color: 'red', fontWeight: 'bold', fontSize: 16}}>
                  Chưa chấp nhận
                </Text>
              )}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <FlatList
        data={appoimetLst}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}
