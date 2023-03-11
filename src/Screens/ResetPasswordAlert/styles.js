import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { PX } from "../../Components/Pixel/index";
import { Fonts } from "../../utils";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: PX(40),
    backgroundColor: "#fff",
    paddingBottom: PX(80),
  },
  msgText: {
    fontSize: PX(14),
    paddingVertical: PX(10),
    textAlign: "center",
    fontFamily: Fonts.FONTS.MontserratRegular,
    color: "#000",
    letterSpacing: PX(0.2),
    lineHeight: PX(30),
  },
  buttonStyle: {
    width: "100%",
    backgroundColor: "#F55800",
    alignItems: "center",
    justifyContent: "center",
    height: PX(50),
    borderRadius: PX(25),
    marginTop: PX(35),
  },
  buttonText: {
    fontSize: PX(16),
    color: "#fff",
    fontFamily: Fonts.FONTS.MontserratSemiBold,
  },
});

export default styles;
