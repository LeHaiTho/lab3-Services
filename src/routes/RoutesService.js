import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ServicesScreen from '../screens/ServicesScreen';
import AddNewServiceScreen from '../screens/AddNewServiceScreen';
import ServiceDetailScreen from '../screens/ServiceDetailScreen';
import COLORS from '../constants/color';

const Stack = createStackNavigator();
const RoutesService = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ServicesScreen"
        component={ServicesScreen}
        options={{headerLeft: false}}
      />
      <Stack.Screen
        name="AddNewServiceScreen"
        component={AddNewServiceScreen}
      />
      <Stack.Screen
        name="ServiceDetailScreen"
        component={ServiceDetailScreen}
      />
    </Stack.Navigator>
  );
};

export default RoutesService;
