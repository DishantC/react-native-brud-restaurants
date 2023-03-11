import React from "react";
import { StyleSheet } from "react-native";
import { PX } from "../../Components/Pixel/index";
import { Fonts } from "../../utils";

const styles = StyleSheet.create({
  logo: {
    width: PX(148),
    height: PX(80),
  },
  logo1: { height: "20%", justifyContent: "center", alignItems: "center" },
  main3: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 40,
  },
  btn: {
    width: "92%",
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
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  heder: {
    fontSize: PX(14),
    color: "#F55800",
    paddingTop: PX(15),
    fontFamily: Fonts.FONTS.MontserratRegular,
  },
  heder1: {
    fontSize: PX(21),
    color: "#000",
    fontFamily: Fonts.FONTS.MontserratSemiBold,
  },
  heder2: {
    height: "15%",
    width: "90%",
  },
  email: {
    paddingTop: PX(25),
    width: "90%",
  },
  text: {
    fontSize: PX(12),
    color: "#2D2D2D",
    fontFamily: Fonts.FONTS.MontserratRegular,
  },
  email1: {
    paddingTop: PX(5),
    width: "100%",
    borderColor: "#C4C4C4",
    borderBottomWidth: 2,
  },
  email2: {
    paddingTop: PX(2),
  },
  line: {
    width: PX(300),
    height: PX(2),
    backgroundColor: "#C4C4C4",
  },
  forgot: {
    flexDirection: "row",
    paddingTop: PX(20),
    width: "90%",
    alignSelf: "center",
  },
  forgot1: {
    fontSize: PX(15),
    color: "#000",
    fontFamily: Fonts.FONTS.MontserratMedium,
  },
  reset: {
    fontSize: PX(15),
    color: "#F55800",
    fontFamily: Fonts.FONTS.MontserratMedium,
  },
  footer: {
    flexDirection: "row",
    width: "100%",
    height: PX(70),
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
  },
  footer1: {
    fontSize: PX(15),
    color: "#fff",
  },
  create: {
    color: "#F55800",
    fontSize: PX(15),
  },
});
export default styles;
