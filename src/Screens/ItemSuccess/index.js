import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import styles from "./styles";
import { PX } from "../../Components/Pixel/index";
import cold from "../../Assets/cold.png";

export const ItemSuccess = ({ navigation, route }) => {
  return (
    <View style={styles.container}>
      <Image
        style={{ height: PX(200), width: PX(200), resizeMode: "contain" }}
        source={cold}
      />
      <Text style={styles.msgText}>
        {"Yayyyy !! your item has been added\nsuccessfully. Check it in menu"}
      </Text>
      <Text
        style={styles.msgText1}
        // onPress={() => navigation.navigate('ModifierList',{modifierData:route.params.modifierData,itemId:route.params.itemId})}>
        onPress={() => navigation.replace("ProfileScreen")}
      >
        Menu
      </Text>
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => navigation.replace("AddItem")}
      >
        <Text style={styles.buttonText}>Add More Item</Text>
      </TouchableOpacity>
    </View>
  );
};
