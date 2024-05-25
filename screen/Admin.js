import React from 'react';
import {View, Button} from 'react-native';
import {Icon, IconButton, Text} from 'react-native-paper';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import RouterServices from '../routers/RouterServices';
// import 'react-native-gesture-handler';
import Transaction from './Transaction';
import Customer from './Customer';
import Setting from './Setting';
import CustomerAdmin from './CustomerAdmin';
import COLORS from '../constants/color';

const Tab = createBottomTabNavigator();
export default function Admin() {
  return (
    <Tab.Navigator initialRouteName="RouterServices">
      <Tab.Screen
        name="RouterServices"
        component={RouterServices}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: () => (
            <Icon source="home" color={COLORS.blue} size={26} />
          ),
          tabBarLabelStyle: {color: COLORS.blue, fontSize: 13},
        }}
      />
      <Tab.Screen
        name="Transaction"
        component={Transaction}
        options={{
          tabBarLabel: 'Transaction',
          headerStyle: {backgroundColor: COLORS.blue},
          headerTitleStyle: {color: 'white'},
          tabBarIcon: () => (
            <Icon source="cash" color={COLORS.blue} size={26} />
          ),
          tabBarLabelStyle: {color: COLORS.blue, fontSize: 13},
        }}
      />
      <Tab.Screen
        name="Customer"
        component={CustomerAdmin}
        options={{
          tabBarLabel: 'Customer',
          headerStyle: {backgroundColor: COLORS.blue},
          headerTitleStyle: {color: 'white'},
          tabBarIcon: () => (
            <Icon source="account-multiple" color={COLORS.blue} size={26} />
          ),
          tabBarLabelStyle: {color: COLORS.blue},
        }}
      />
      <Tab.Screen
        name="Setting"
        component={Setting}
        options={{
          tabBarLabel: 'Setting',
          headerStyle: {backgroundColor: COLORS.blue},
          headerTitleStyle: {color: 'white'},
          tabBarIcon: () => <Icon source="cog" color={COLORS.blue} size={26} />,
          tabBarLabelStyle: {color: COLORS.blue},
        }}
      />
    </Tab.Navigator>
  );
}
