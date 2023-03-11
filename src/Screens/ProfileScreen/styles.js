import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {PX} from '../../Components/Pixel/index';
import { Fonts } from '../../utils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerText2: {
    fontSize: PX(18),
    fontFamily: 'Montserrat-Bold',
    color: '#000',
  },
  textBox: {fontSize: PX(13)},
  textBox1: {
    fontSize: PX(15),
    paddingBottom: PX(5),
    width: '100%',
    fontFamily: 'Montserrat-Regular',
  },

  mainView: {
    width: '100%',
    // justifyContent:'space-between',
    // alignItems:'center'
  },
  deal1: {justifyContent: 'center', alignItems: 'center'},

  redeem: {
    width: PX(368),
    height: PX(172),
    paddingHorizontal: '10%',
  },
  Image: {
    // flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
    // width:'95%',
    paddingRight: '5%',
    paddingHorizontal: PX(13),
  },
  Image1: {
    // flexDirection:'row',
    alignItems: 'center',
    // width:'95%',
    paddingRight: PX(20),
  },
  Image2: {
    // flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
    // width:'95%',
    paddingRight: '5%',
    paddingHorizontal: PX(13),
  },
  search: {
    flexDirection: 'row',
    // justifyContent:'center',
    alignContent: 'center',
    paddingHorizontal: '2%',
    width: '90%',
    height: PX(52),
    borderRadius: PX(10),
    backgroundColor: '#FAFAFA',
    // paddingRight:'60%',
    // paddingTop:'5%',
    marginLeft: '5%',
    marginVertical:PX(10)
  },
  category: {
    width: '100%',
    //   height:PX(102),
  },
  box: {
    flexDirection: 'row',
    //   justifyContent:'space-between',
    //   alignItems:'center',
    //   paddingHorizontal:PX(12),
    paddingVertical: PX(15),
    //   paddingTop:'10%'
  },
  btn: {
    width: PX(75),
    height: PX(28),
    backgroundColor: '#F55800',
    borderRadius: PX(30),
    justifyContent: 'center',
    alignItems: 'center',
    // paddingHorizontal:'15%'
  },
  main: {
    width: '45%',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  img: {
    width: PX(125),
    height: PX(90),
    borderRadius:PX(10)
  },
  view: {
    width: '55%',
    // backgroundColor:'red'
  },
  name: {
    fontSize: PX(16),
    paddingTop: '2%',
    color: '#000',
    fontFamily: Fonts.FONTS.MontserratMedium,
    width: '98%',
  },
  view1: {
    width: '95%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '2%',
  },
  dec: {
    fontSize: PX(12),
    textAlign: 'left',
    color: '#848484',
    fontFamily: 'Montserrat-Regular',
    width: '98%',
    marginTop:PX(7)
  },
  box1: {
    flexDirection: 'row',
    paddingTop: '5%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  many: {
    // width:'39%'
  },
  textMany: {
    fontSize: PX(14),
    color: '#000',
    fontFamily: Fonts.FONTS.MontserratMedium,
  },
  btnText: {
    color: '#fff',
    fontSize: PX(13),
    fontFamily: Fonts.FONTS.MontserratSemiBold,
  },
  back1: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: PX(9),
    height: PX(9),
    borderRadius: PX(6),
    backgroundColor: '#F55800',
  },
  banner: {
    width: PX(368),
    height: PX(172),
    alignSelf: 'center',
    marginLeft: '5%',
    // justifyContent:'center',
    // paddingLeft:'10%'
  },
  img1: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft:PX(10)
  },
  img2: {
    width: PX(18),
    height: PX(18),
    resizeMode:'contain',
  
    
  },
  category1: {
    paddingTop: '5%',
    justifyContent: 'center',
    // alignItems: 'center',
    paddingHorizontal: PX(20),
  },
  emptyListStyle: {
    padding: PX(20),
    fontSize: 18,
    textAlign: 'center',
  },
  item: {
    height: '100%',
    width: '100%',
    paddingTop: '5%',
    paddingHorizontal: PX(20),
  },
  main1: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#fff',
    height: '80%',
    borderTopRightRadius: PX(25),
    borderTopLeftRadius: PX(25),
    bottom: 0,
    position: 'absolute',
  },
  backImg: {
    width: '100%',
    height: '30%',
    borderTopRightRadius: PX(25),
    borderTopLeftRadius: PX(25),
  },
  mainView1: {
    width: '95%',
    height: '75%',
    backgroundColor: '#ffffff',
    // justifyContent:'space-between',
    // alignItems:'center'
  },
  header: {
    fontSize: PX(16),
    paddingRight: '55%',
    paddingTop: PX(10),
    color: '#000',
    fontFamily: 'Montserrat-Regular',
  },
  header3: {
    fontSize: PX(12),
    paddingTop: PX(10),
    color: '#848484',
    fontFamily: 'Montserrat-Regular',
  },
  headerMain: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btnMain: {
    flexDirection: 'row',
    paddingTop: '5%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F9F9F9',
  },
  btn1: {
    width: PX(100),
    height: PX(52),
    borderRadius: PX(50),
    borderColor: '#F55800',
    paddingHorizontal: '5%',
    backgroundColor: '#FFF4EE',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: PX(2),
  },
  btn1Text: {
    fontSize: PX(24),
    color: '#F55800',
    fontFamily: 'Montserrat-Regular',
  },
  btn1Text2: {fontSize: PX(24), fontFamily: 'Montserrat-Regular'},
  btn2: {
    width: PX(238),
    height: PX(52),
    borderRadius: PX(50),
    backgroundColor: '#F55800',
    flexDirection: 'row',
    marginLeft: '2%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '5%',
  },
  add: {fontSize: PX(15), color: '#ffff', fontFamily: 'Montserrat-Bold'},
  total: {fontSize: PX(10), color: '#fff', fontFamily: 'Montserrat-Bold'},
});

export default styles;
