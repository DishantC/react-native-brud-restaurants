import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import styles from "./styles";
import { PX } from "../../Components/Pixel/index";
import success from "../../Assets/success.png";
import Success from "../../Assets/SVG/success";

export const UpdateSuccess = ({ navigation, route }) => {
  return (
    <View style={styles.container}>
      <Success size={200} />
      <Text style={styles.msgText}>you have been Login</Text>
      <Text style={styles.msgText1}>Successfully !</Text>
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => navigation.replace("RegisterScreen")}
      >
        <Text style={styles.buttonText}>Done</Text>
      </TouchableOpacity>
    </View>
  );
};
