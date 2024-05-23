import {View, Text} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ServicesScreen from './ServicesScreen';
import {TabActions} from '@react-navigation/native';
import {Icon} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import TransactionScreen from './TransactionScreen';
import CustomersScreen from './CustomersScreen';
import Setting from './Setting';
import RoutesService from '../routes/RoutesService';

const Tab = createBottomTabNavigator();
const Admin = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        options={{
          title: 'Home',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="home" color={'black'} size={26} />
          ),
        }}
        name="RoutesService"
        component={RoutesService}
      />
      <Tab.Screen
        options={{
          title: 'Home',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="cash" color={'black'} size={26} />
          ),
        }}
        name="TransactionScreen"
        component={TransactionScreen}
      />
      <Tab.Screen
        options={{
          title: 'Home',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="account-group"
              color={'black'}
              size={26}
            />
          ),
        }}
        name="CustomersScreen"
        component={CustomersScreen}
      />
      <Tab.Screen
        options={{
          title: 'Home',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="account-cog"
              color={'black'}
              size={26}
            />
          ),
        }}
        name="Setting"
        component={Setting}
      />
    </Tab.Navigator>
  );
};

export default Admin;
