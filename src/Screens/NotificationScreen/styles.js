import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {PX} from '../../Components/Pixel/index';
import {Fonts} from '../../utils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  headerView: {
    height: PX(60),
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: PX(18),
    fontFamily: Fonts.FONTS.MontserratSemiBold,
    color: '#000',
  },
  mainImage1: {
    marginVertical: PX(30),
    height: PX(180),
    width: '100%',
    resizeMode: 'contain',
  },
});

export default styles;
