import {View, Text, StyleSheet, TextInput} from 'react-native';
import React, {useState} from 'react';
import COLORS from '../constants/color';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button, IconButton} from 'react-native-paper';

const Input = ({
  label,
  iconName,
  error,
  password,
  value,
  onFocus = () => {},
  keyBoardType,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hidePassword, setHidePassword] = useState(password);
  return (
    <View style={{marginBottom: 5}}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: error
              ? COLORS.red
              : isFocused
              ? COLORS.darkBlue
              : COLORS.light,
          },
        ]}>
        <Icon
          name={iconName}
          style={{fontSize: 22, color: COLORS.darkBlue, marginRight: 10}}
        />
        <TextInput
          secureTextEntry={hidePassword}
          {...props}
          autoCorrect={false}
          value={value}
          onFocus={() => {
            onFocus;
          }}
          keyboardType={keyBoardType}
          onBlur={() => setIsFocused(false)}
          style={{color: COLORS.darkBlue, flex: 1}}
        />
        {password && (
          <Icon
            onPress={() => setHidePassword(!hidePassword)}
            name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
            style={{color: COLORS.darkBlue, fontSize: 22}}
          />
        )}
      </View>
      {error && (
        <Text style={{color: COLORS.red, fontSize: 12, marginTop: 7}}>
          {error}
        </Text>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    color: COLORS.grey,
    marginVertical: 5,
  },

  inputContainer: {
    height: 55,
    backgroundColor: COLORS.light,
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderWidth: 0.5,
    alignItems: 'center',
  },
});

export default Input;
