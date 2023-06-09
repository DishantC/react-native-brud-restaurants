import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {PX} from '../../Components/Pixel/index';
import {Fonts} from '../../utils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  headerView: {
    height: PX(60),
    alignItems: 'flex-end',
    width: '100%',
    flexDirection: 'row',
  },
  headerText: {
    fontSize: PX(21),
    fontFamily: Fonts.FONTS.MontserratSemiBold,
    color: '#000',
  },
  subTitleText: {
    fontSize: PX(13),
    fontFamily: Fonts.FONTS.MontserratMedium,
    color: '#000',
    textAlign: 'center',
    paddingVertical: PX(25),
  },
  stepText: {
    fontSize: PX(13),
    fontFamily: Fonts.FONTS.MontserratSemiBold,
    color: '#2D2D2D',
    textAlign: 'center',
  },
  mainImage: {
    marginVertical: PX(40),
    height: PX(150),
    width: PX(150),
    resizeMode: 'contain',
  },
  mainImage1: {
    marginVertical: PX(50),
    height: PX(180),
    width: PX(350),
    borderRadius:PX(10),
  },
  mainImage2: {
    marginVertical: PX(60),
    height: PX(150),
    width: PX(150),
    resizeMode: 'contain',
  },
  dataView: {width: '100%', justifyContent: 'center'},
  textInputStyle: {
    width: '100%',
    borderBottomColor: '#C4C4C4',
    borderBottomWidth: 1,
    paddingTop: PX(20),
    paddingBottom: PX(10),
    color: '#2D2D2D',
    fontSize: PX(15),
    fontFamily: Fonts.FONTS.MontserratMedium,
  },
  textState:{
    color: '#2D2D2D',
    fontSize: PX(15),
    fontFamily: Fonts.FONTS.MontserratMedium,
  },
  textInputTitle: {
    color: '#2D2D2D',
    fontSize: PX(12),
    fontFamily: Fonts.FONTS.MontserratMedium,
  },
  textInputTitle1: {
    color: '#2D2D2D',
    fontSize: PX(12),
    fontFamily: Fonts.FONTS.MontserratMedium,
    marginTop: PX(40),
  },
  textInputView: {
    width: '100%',
    height: PX(45),
    marginTop: PX(10),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent:'space-between'
  },
  imageView1: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#C4C4C4',
    borderBottomWidth: 1,
    paddingBottom: PX(6),
    width: '25%',
    height: PX(45),
  },
  TextInputStyle1: {
    fontSize: PX(14),
    height: PX(45),
    fontFamily: Fonts.FONTS.MontserratMedium,
    width: '69%',
    color: '#2D2D2D',
    paddingBottom: PX(6),
    marginLeft: PX(10),
    borderBottomColor: '#C4C4C4',
    borderBottomWidth: 1,
  },
  btn: {
    width: '100%',
    height: PX(52),
    backgroundColor: '#F55800',
    borderRadius: PX(60),
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: PX(18),
    fontFamily: Fonts.FONTS.MontserratSemiBold,
  },
  buttonView: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: PX(70),
  },
  locationText: {
    fontSize: PX(16),
    fontFamily: Fonts.FONTS.MontserratSemiBold,
    color: '#F55800',
    paddingTop: PX(15),
  },
  textStyles: {
    textAlign: 'center',
    fontSize: PX(14),
    color: '#979797',
    fontFamily: Fonts.FONTS.MontserratMedium,
    lineHeight: PX(30),
  },
  skipText: {
    textAlign: 'center',
    fontSize: PX(14),
    color: '#F55800',
    fontFamily: Fonts.FONTS.MontserratSemiBold,
    paddingTop: PX(80),
  },
  skipText1: {
    textAlign: 'center',
    fontSize: PX(14),
    color: '#F55800',
    fontFamily: Fonts.FONTS.MontserratSemiBold,
    paddingTop: PX(30),
  },
  stateText1: {
    fontSize: PX(14),
    color: '#000',
    fontFamily: Fonts.FONTS.MontserratSemiBold,
  },
  openingText: {
    textAlign: 'center',
    fontSize: PX(18),
    color: '#000',
    fontFamily: Fonts.FONTS.MontserratBold,
    paddingTop: PX(80),
  },
  itemView: {
    width: '100%',
    height: PX(80),
    alignSelf: 'center',
    borderRadius: PX(5),
    paddingVertical: PX(15),
    flexDirection: 'row',
    borderBottomColor: '#D4D4D4',
    borderBottomWidth: 0.5,
  },
  bagImage: {
    height: PX(17),
    width: PX(17),
    resizeMode: 'contain',
  },

  subView: {
    width: '80%',
    height: '100%',
    alignSelf: 'center',
    justifyContent: 'space-between',
    paddingLeft: PX(10),
    paddingVertical: PX(5),
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameText: {
    fontSize: PX(16),
    color: '#3D3D3D',
    fontFamily: Fonts.FONTS.MontserratSemiBold,
  },
  statusText: {
    fontSize: PX(14),
    color: '#3D3D3D',
    fontFamily: Fonts.FONTS.MontserratRegular,
    marginTop: PX(5),
  },
  changeText: {
    fontSize: PX(13),
    color: '#fff',
    fontFamily: Fonts.FONTS.MontserratSemiBold,
  },
  changeButton: {
    width: PX(75),
    height: PX(30),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F55800',
    borderRadius: PX(30),
  },
  Images:{
    width: PX(10),
    height: PX(10),
    resizeMode:'contain',
    marginLeft:PX(10)
  }
});

export default styles;
