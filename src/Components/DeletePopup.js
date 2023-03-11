import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { PX } from "./Pixel";
import { Fonts } from "../utils";
import bargur from "../Assets/bargur.png";

const DeletePopup = ({ modalVisible, onRequestClose, text, deleteOnPress }) => {
  return (
    <Modal
      visible={modalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onRequestClose}
    >
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          top: 0,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TouchableWithoutFeedback onPress={onRequestClose}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View
          style={{
            height: "45%",
            width: "90%",
            paddingHorizontal: PX(20),
            backgroundColor: "#fff",
            borderRadius: PX(10),
            alignItems: "center",
            justifyContent: "space-between",
            paddingVertical: PX(40),
          }}
        >
          <Image
            style={{ height: PX(130), width: PX(150), resizeMode: "contain" }}
            source={bargur}
          />
          <Text
            style={{
              fontSize: PX(18),
              fontFamily: Fonts.FONTS.MontserratRegular,
              color: "#000",
              marginTop: PX(-30),
              textAlign: "center",
              lineHeight: PX(30),
            }}
          >
            {text}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <TouchableOpacity
              style={{
                height: PX(35),
                width: "48%",
                backgroundColor: "#E5E5E5",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: PX(40),
              }}
              onPress={onRequestClose}
            >
              <Text
                style={{
                  fontSize: PX(16),
                  fontFamily: Fonts.FONTS.MontserratMedium,
                  color: "#000",
                }}
              >
                Cancel
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                height: PX(35),
                width: "48%",
                backgroundColor: "#F55800",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: PX(40),
              }}
              onPress={deleteOnPress}
            >
              <Text
                style={{
                  fontSize: PX(16),
                  fontFamily: Fonts.FONTS.MontserratMedium,
                  color: "#fff",
                }}
              >
                Delete
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DeletePopup;

const styles = StyleSheet.create({
  modalOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
});
