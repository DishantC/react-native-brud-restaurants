import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import styles from './styles';
import {PX} from '../../Components/Pixel/index';
import reset from '../../Assets/reset.png';

export const ResetMessage = ({navigation, route}) => {
  return (
    <View style={styles.container}>
      <Image
        style={{width: PX(210), height: PX(200), resizeMode: 'contain'}}
        source={reset}
      />
      <Text style={styles.msgText}>
        we have sent you a password recovery link on your register email address
      </Text>

      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => navigation.replace('ResetPassword')}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>
    </View>
  );
};
