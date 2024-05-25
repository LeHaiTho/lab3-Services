import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import COLORS from '../constants/color';

const Button = ({title, onPress = () => {}, disable}) => {
  return (
    <TouchableOpacity
      disabled={disable}
      onPress={onPress}
      style={{
        height: 55,
        width: '100%',
        backgroundColor: disable ? COLORS.grey : COLORS.blue,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
      }}>
      <Text
        style={{
          color: COLORS.white,
          fontWeight: 'bold',
          fontSize: 18,
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({});

export default Button;
