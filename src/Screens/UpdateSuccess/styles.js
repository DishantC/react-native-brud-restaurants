import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {PX} from '../../Components/Pixel/index';
import {Fonts} from '../../utils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: PX(40),
  },
  msgText: {
    fontSize: PX(14),
    textAlign: 'center',
    fontFamily: Fonts.FONTS.MontserratMedium,
    color: '#2D2D2D',
    paddingVertical: PX(10),
  },
  msgText1: {
    fontSize: PX(23),
    textAlign: 'center',
    fontFamily: Fonts.FONTS.MontserratMedium,
    color: '#F55800',
  },
  buttonStyle: {
    width: '100%',
    backgroundColor: '#F55800',
    alignItems: 'center',
    justifyContent: 'center',
    height: PX(50),
    borderRadius: PX(25),
    marginTop: PX(35),
  },
  buttonText: {
    fontSize: PX(16),
    color: '#fff',
    fontFamily: Fonts.FONTS.MontserratBold,
  },
});

export default styles;
