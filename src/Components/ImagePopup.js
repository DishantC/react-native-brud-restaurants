import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import {PX} from './Pixel';
import {Fonts} from '../utils';

const ImagePopup = ({modalVisible, onRequestClose,takeImageOnPress,selectImageOnPress}) => {
  return (
    <Modal
      visible={modalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onRequestClose}>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          top: 0,
          alignItems: 'center',
          justifyContent: 'flex-end',
          backgroundColor: 'rgba(0,0,0,0.3)',
        }}>
       <TouchableOpacity style={{
            height: '70%',
            width: '100%',
            
       }} activeOpacity={1} onPress={onRequestClose}>

       </TouchableOpacity>
        <View
          style={{
            height: '30%',
            width: '100%',
            
            backgroundColor: '#fff',
            borderRadius: PX(10),
            justifyContent: 'space-between',
            paddingVertical: PX(40),
           
          }}>
          <Text
            style={{
              fontSize: PX(22),
              fontFamily: Fonts.FONTS.MontserratBold,
              color: '#000',
              marginTop: PX(-20),
              lineHeight: PX(40),
              paddingHorizontal: PX(20),
              marginBottom:PX(15)
            }}>
            Image Picker
          </Text>

          <TouchableOpacity
              style={{
                height: PX(40),
                width: '100%',
                justifyContent: 'center',
                borderRadius: PX(40),
                paddingHorizontal: PX(20),
              }} onPress={takeImageOnPress}>
              <Text
                style={{
                  fontSize: PX(16),
                  fontFamily: Fonts.FONTS.MontserratMedium,
                  color: '#000',
                }}>
                Take Image
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                height: PX(40),
                width: '100%',
                justifyContent: 'center',
                borderRadius: PX(40),
                paddingHorizontal: PX(20),
                marginBottom:PX(10)
              }} onPress={selectImageOnPress}>
              <Text
                style={{
                  fontSize: PX(16),
                  fontFamily: Fonts.FONTS.MontserratMedium,
                  color: '#000',
                }}>
                Select Image
              </Text>
            </TouchableOpacity>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              borderTopColor:"#000",
              borderTopWidth:1,
            }}>
            <TouchableOpacity
              style={{
                height: PX(50),
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: PX(40),
              }} onPress={onRequestClose}>
              <Text
                style={{
                  fontSize: PX(18),
                  fontFamily: Fonts.FONTS.MontserratMedium,
                  color: '#000',
                }}>
                Cancel
              </Text>
            </TouchableOpacity>

           
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ImagePopup;

const styles = StyleSheet.create({
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
});
