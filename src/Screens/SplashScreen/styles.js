import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { PX } from "../../Components/Pixel/index";
import { Fonts } from "../../utils";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  firstView: {
    width: "100%",
    height: "45%",
    paddingTop: PX(20),
    paddingRight: PX(30),
  },
  firstImage: { width: PX(55), height: PX(70), resizeMode: "contain" },
  secondImage: { width: PX(130), height: PX(140), resizeMode: "contain" },
  thirdImage: {
    width: PX(100),
    height: PX(110),
    resizeMode: "contain",
    marginLeft: PX(80),
    marginTop: PX(20),
  },
  secondView: {
    width: "100%",
    height: "45%",
    paddingHorizontal: PX(30),
    alignItems: "center",
    justifyContent: "center",
    top: PX(40),
  },
  logoImage: { width: PX(120), height: PX(110), resizeMode: "contain" },
  ButtonView: {
    height: PX(100),
    width: "100%",
    justifyContent: "flex-end",
  },
  desText: {
    textAlign: "center",
    fontSize: PX(16),
    color: "#fff",
    letterSpacing: PX(0.7),
    fontFamily: Fonts.FONTS.MontserratRegular,
    lineHeight: PX(25),
  },
  buttonStyle: {
    width: "100%",
    backgroundColor: "#F55800",
    alignItems: "center",
    justifyContent: "center",
    height: PX(50),
    borderRadius: PX(25),
  },
  buttonText: {
    fontSize: PX(18),
    color: "#fff",
    fontFamily: Fonts.FONTS.MontserratSemiBold,
  },
  loginText: {
    fontSize: PX(15),
    color: "#F55800",
    fontFamily: Fonts.FONTS.MontserratSemiBold,
  },
});

export default styles;
