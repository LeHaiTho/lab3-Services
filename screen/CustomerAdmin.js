import React, {useEffect} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {IconButton, Text} from 'react-native-paper';
import {useMyContextController} from '../store';
import {FlatList} from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import COLORS from '../constants/color';

export default function CustomerAdmin({navigation}) {
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [controller, dispatch] = useMyContextController();
  const {userLogin} = controller;
  const [userLst, setUserlst] = React.useState([]);
  const cUSER = firestore().collection('USERS');

  useEffect(() => {
    if (userLogin == null) {
      navigation.navigate('Signin');
    } else setIsAdmin(userLogin.role == 'admin');

    cUSER
      .where('role', 'in', ['customer'])
      .orderBy('role', 'asc')
      .onSnapshot(response => {
        var arr = [];
        response.forEach(doc => arr.push(doc.data()));
        setUserlst(arr);
      });
  }, [userLogin]);

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('ProfileAllUser', {
            fullname: item.fullname,
            role: item.role,
            email: item.email,
            phone: item.phone,
          })
        }>
        <View
          style={{
            padding: 10,
            borderColor: COLORS.grey,
            borderWidth: 1,
            borderRadius: 5,
            marginBottom: 10,
            marginHorizontal: 15,
          }}>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'column',
              padding: 5,
              marginLeft: 5,
              marginRight: 5,
            }}>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>Email: </Text>
              <Text style={{fontSize: 18}}>{item.email}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                User name:{' '}
              </Text>
              <Text style={{fontSize: 18}}>{item.fullname}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>Role: </Text>
              <Text style={{fontSize: 18}}>{item.role}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          margin: 10,
        }}>
        <Text style={{color: '#000', fontWeight: 'bold', fontSize: 16}}>
          Danh sách người dùng
        </Text>
        <IconButton
          icon="plus-circle"
          size={30}
          iconColor={COLORS.blue}
          onPress={() => navigation.navigate('Signup')}
        />
      </View>
      <FlatList
        // style={{borderWidth: 1, borderColor: 'grey'}}
        data={userLst}
        keyExtractor={(item, index) => index.toString()}
        // keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  borderFlatlst: {
    borderWidth: 1,
    borderColor: 'grey',
    marginBottom: 10,
    margin: 10,
    borderRadius: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
});
