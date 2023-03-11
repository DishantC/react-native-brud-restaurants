import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { PX } from "../../Components/Pixel/index";
import { Fonts } from "../../utils";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItem: "center",
  },
  headerText: {
    fontSize: PX(18),
    fontFamily: Fonts.FONTS.MontserratBold,
    color: "#000",
  },
  headerView: {
    height: PX(80),
    alignItems: "center",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    paddingHorizontal: PX(20),
  },
  headerText: {
    fontSize: PX(18),
    fontFamily: Fonts.FONTS.MontserratBold,
    color: "#000",
  },
  headerView1: {
    height: PX(80),
    alignItems: "center",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    paddingHorizontal: PX(40),
    paddingTop: PX(25),
  },
  title: {
    fontSize: PX(18),
    fontFamily: Fonts.FONTS.MontserratSemiBold,
  },
  dot: {
    width: PX(110),
    height: PX(3),
    // borderRadius: PX(3),
    alignContent: "center",
    marginTop: PX(13),
    // marginLeft:PX(-10),
  },
  box: {
    width: "95%",
    height: PX(527),
    backgroundColor: "#fff",
    borderRadius: PX(15),
    marginTop: PX(10),
    alignItems: "center",
  },
  box1: {
    width: "100%",
    minHeight: PX(145),
    backgroundColor: "#fff",
    borderRadius: PX(15),
    alignItems: "center",
    marginTop: PX(15),
    paddingVertical: PX(15),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  date: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: PX(15),
  },
  date1: {
    fontSize: PX(14),
    fontFamily: Fonts.FONTS.MontserratMedium,
    color: "#000",
  },
  date5: {
    fontSize: PX(14),
    fontFamily: Fonts.FONTS.MontserratRegular,
    color: "#000",
  },
  item: {
    fontSize: PX(15),
    fontFamily: Fonts.FONTS.MontserratBold,
    color: "#000",
  },
  paid: {
    fontSize: PX(15),
    fontFamily: Fonts.FONTS.MontserratMedium,
    color: "#848484",
    textAlign: "right",
    paddingTop: PX(5),
  },
  name: {
    fontSize: PX(15),
    fontFamily: Fonts.FONTS.MontserratMedium,
    color: "#F55800",
  },
  order: {
    fontSize: PX(15),
    fontFamily: Fonts.FONTS.MontserratMedium,
    color: "#000",
    marginTop: PX(4),
  },
  date4: {
    fontSize: PX(13),
    fontFamily: Fonts.FONTS.MontserratMedium,
    color: "#848484",
  },
  text: {
    fontSize: PX(13),
    fontFamily: Fonts.FONTS.MontserratMedium,
    color: "#848484",
    paddingTop: PX(5),
  },
  date3: {
    flexDirection: "row",
    // fontSize:PX(13),
    // fontFamily: Fonts.FONTS.MontserratMedium,
    // color:'#000',
    paddingTop: PX(18),
    justifyContent: "space-between",
  },
  date2: {
    fontSize: PX(13),
    fontFamily: Fonts.FONTS.MontserratMedium,
    color: "#000",
    marginLeft: PX(5),
  },
  white: {
    fontSize: PX(15),
    color: "#F55800",
    fontFamily: Fonts.FONTS.MontserratMedium,
    paddingTop: PX(10),
  },
  item10: {
    fontSize: PX(15),
    fontFamily: Fonts.FONTS.MontserratMedium,
    color: "#000",
  },
  total: {
    color: "#F55800",
    fontFamily: Fonts.FONTS.MontserratMedium,
    paddingTop: PX(10),
    fontSize: PX(15),
  },
  total1: {
    color: "#000",
    fontFamily: Fonts.FONTS.MontserratMedium,
    paddingTop: PX(12),
    fontSize: PX(13),
  },
  total2: {
    flexDirection: "row",
    // fontSize:PX(13),
    // fontFamily: Fonts.FONTS.MontserratMedium,
    // color:'#000',
    paddingTop: PX(5),
    justifyContent: "space-between",
  },
  total3: {
    flexDirection: "row",
    // fontSize:PX(13),
    // fontFamily: Fonts.FONTS.MontserratMedium,
    // color:'#000',
    paddingTop: PX(5),
    justifyContent: "space-between",
  },
  tax: {
    fontFamily: Fonts.FONTS.MontserratMedium,
    fontSize: PX(12),
    color: "#848484",
  },
  btn: {
    color: "#fff",
    fontFamily: Fonts.FONTS.MontserratBold,
    fontSize: PX(14),
  },
  text1: {
    color: "#FECB2F",
    fontSize: PX(12),
    fontFamily: Fonts.FONTS.MontserratBold,
  },
  save: {
    color: "#67C117",
    fontSize: PX(12),
    fontFamily: Fonts.FONTS.MontserratBold,
  },
  Image: {
    width: PX(12.86),
    height: PX(12.86),
    marginLeft: "47%",
    tintColor: "#67C117",
  },
});

export default styles;
