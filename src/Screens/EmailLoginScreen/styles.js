import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { PX } from "../../Components/Pixel/index";
import { Fonts } from "../../utils";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  logo: {
    width: PX(148),
    height: PX(80),
  },
  logo1: {
    height: PX(120),
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: PX(25),
  },
  main3: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 40,
  },
  btn: {
    width: "95%",
    height: PX(52),
    backgroundColor: "#F55800",
    borderRadius: PX(60),
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontSize: PX(18),
    fontFamily: Fonts.FONTS.MontserratSemiBold,
  },
  main: {
    width: "90%",
    marginTop: PX(25),
  },
  header: {
    fontSize: PX(21),
    fontFamily: Fonts.FONTS.MontserratSemiBold,
    color: "#000",
  },
  heder1: {
    fontSize: PX(14),
    color: "#F55800",
    paddingTop: PX(15),
    fontFamily: Fonts.FONTS.MontserratRegular,
  },
  line: {
    width: PX(310),
    height: PX(2),
    backgroundColor: "#C4C4C4",
  },
  main2: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  email: {
    paddingTop: PX(10),
    width: "100%",
  },
  text: {
    fontSize: PX(12),
    color: "#2D2D2D",
    fontFamily: Fonts.FONTS.MontserratMedium,
  },
  email1: {
    paddingTop: PX(15),
    width: "100%",
    borderBottomWidth: 3,
    borderColor: "#E5E5E5",
  },
  email2: {
    paddingTop: PX(2),
  },
  textInputStyle: {
    width: "100%",
    height: PX(40),
    color: "#2D2D2D",
    fontSize: PX(15),
    fontFamily: Fonts.FONTS.MontserratMedium,
    paddingLeft: -1,
  },
});

export default styles;
