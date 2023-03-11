import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import styles from './styles';
import {PX} from '../../Components/Pixel/index';
import panner from '../../Assets/panner.png';

export const ModifierSuccess = ({navigation, route}) => {
  return (
    <View style={styles.container}>
      <Image
        style={{height: PX(200), width: PX(200), resizeMode: 'contain'}}
        source={panner}
      />
      <Text style={styles.msgText}>
        {
          'Yayyyy !! your modifier has been added\nsuccessfully. Check it in Modifiers'
        }
      </Text>
      <Text style={styles.msgText1} onPress={() => navigation.navigate('AddItem')}>
        Modifiers
      </Text>
      <TouchableOpacity style={styles.buttonStyle} onPress={() => navigation.replace('AddModifier')}>
        <Text style={styles.buttonText}>Add More Modifers</Text>
      </TouchableOpacity>
    </View>
  );
};
