import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { hasNotch } from "react-native-device-info";
import { PX } from "./Pixel";
import { useNavigation } from "@react-navigation/native";
import { Fonts } from "../utils";

const Header = ({ title, onPress, rightIconName, canGoBack, rightClick }) => {
  const navigation = useNavigation();
  const [backArrow, setBackArrow] = useState(false);
  // const canGoBack = navigation.canGoBack()

  const goBack = () => {
    (onPress && onPress()) || (!canGoBack && navigation.goBack());
  };

  return (
    <View>
      <View
        style={{
          height: hasNotch() ? PX(35) : PX(10),
          backgroundColor: "#fff",
        }}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent:
            !canGoBack || rightIconName ? "space-between" : "center",
          height: PX(80),
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 5,
        }}
      >
        {!backArrow && (
          <TouchableOpacity
            onPress={goBack}
            disabled={canGoBack}
            style={{
              width: PX(30),
              height: PX(40),
              justifyContent: "center",
              alignItems: "center",
              paddingLeft: PX(10),
            }}
          >
            {!canGoBack && (
              <Image
                source={require("../Assets/backArrow.png")}
                style={styles.ImageStyle}
              />
            )}
          </TouchableOpacity>
        )}
        <Text
          style={{
            textAlign: "center",
            fontSize: PX(18),
            color: "#000",
            fontFamily: Fonts.FONTS.MontserratSemiBold,
          }}
        >
          {title}
        </Text>
        <TouchableOpacity style={{ paddingRight: PX(20) }} onPress={rightClick}>
          <Image source={rightIconName} style={styles.ImageStyle1} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  ImageStyle: {
    height: PX(18),
    width: PX(18),
    resizeMode: "contain",
  },
  ImageStyle1: {
    height: PX(25),
    width: PX(25),
    resizeMode: "contain",
  },
});
