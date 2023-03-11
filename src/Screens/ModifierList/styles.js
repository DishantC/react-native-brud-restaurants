import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {PX} from '../../Components/Pixel/index';
import {Fonts} from '../../utils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerView: {
    height: PX(60),
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: PX(18),
    fontFamily: Fonts.FONTS.MontserratSemiBold,
    color: '#000',
  },
  msgText: {
    fontSize: PX(15),
    textAlign: 'center',
    fontFamily: Fonts.FONTS.MontserratMedium,
    color: '#2D2D2D',
    paddingVertical: PX(20),
    lineHeight: PX(28),
  },
  msgText1: {
    fontSize: PX(18),
    textAlign: 'center',
    fontFamily: Fonts.FONTS.MontserratMedium,
    color: '#F55800',
    marginTop: PX(30),
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
  changeText: {
    fontSize: PX(13),
    color: '#fff',
    fontFamily: Fonts.FONTS.MontserratSemiBold,
  },
  changeButton: {
    width: PX(65),
    height: PX(25),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F55800',
    borderRadius: PX(30),
  },
  deleteButton: {
    width: '15%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
