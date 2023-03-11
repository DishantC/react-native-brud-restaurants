import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import Menu, { MenuItem, MenuDivider } from "react-native-material-menu";
import add from "../Assets/add.png";

const CustomMenu = (props) => {
  return (
    <View style={props.menustyle}>
      <Menu
        visible={true}
        anchor={<Text onPress={showMenu}>Show menu</Text>}
        onRequestClose={hideMenu}
      >
        <MenuItem onPress={hideMenu}>Menu item 1</MenuItem>
        <MenuItem onPress={hideMenu}>Menu item 2</MenuItem>
        <MenuItem disabled>Disabled item</MenuItem>
        <MenuDivider />
        <MenuItem onPress={hideMenu}>Menu item 4</MenuItem>
      </Menu>
    </View>
  );
};

export default CustomMenu;
