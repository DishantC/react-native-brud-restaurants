import React, {useState} from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {PX} from '../../Components/Pixel/index';
import {hasNotch} from 'react-native-device-info';
import styles from './styles';
import logo from '../../Assets/logo1.png';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ResetPasswordApi} from '../../services/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AlertPopup from '../../Components/AlertPopup';
export const ResetPassword = ({navigation, route}) => {
  const [Confirm, setConfirm] = useState('');
  const [Password, setPassword] = useState('');
  const [alertPopup, setAlertPopup] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const resetPassword = async () => {
    if (Password == null || Password == '') {
      setAlertMessage('Please enter your password .');
      setAlertPopup(true);
      // Alert.alert('Payment','Please select first order item.')
    }
     else if (
      (Confirm == null || Confirm == '')
      //  &&
      // useRewardPoint == false
    ) {
      setAlertMessage('Please enter your confirm password .');
      setAlertPopup(true);
      // Alert.alert('Payment','Please select payment option.')
    }
   
    else{
    // const id1= await AsyncStorage.getItem('id')
    const id = encodeURIComponent(route.params?.id);
    const new_password = encodeURIComponent(Password);
    const confirm_password = encodeURIComponent(Confirm);

    const requestBody = `id=${id}&new_password=${new_password}&confirm_password=${confirm_password}`;

    const response = await ResetPasswordApi(requestBody);
    console.log('Get Api Response:::', response);
    if (!response.sucecess) {
      alert(response.message);
    } else {
      //  alert(response.message)
      //  navigation.replace('MainStack')
      navigation.navigate('LoginScreen');
    }
  }
    //  navigation.navigate('LoginScreen')
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          height: hasNotch() ? PX(35) : PX(10),
          backgroundColor: '#000',
        }}
      />
      <KeyboardAwareScrollView>
        <View style={styles.logo1}>
          <Image source={logo} style={styles.logo} />
        </View>

        <View style={styles.main}>
          <Text style={styles.header}>Setup New Password</Text>
          <Text style={styles.heder1}>
            Type in your new password and confirm
          </Text>
        </View>

        <View style={{width: '100%', alignItems: 'center', paddingTop: PX(50)}}>
          <View style={styles.email}>
            <Text style={styles.text}>Enter New Password</Text>
            <View style={styles.email1}>
              <TextInput
                value={Password}
                onChangeText={value => {
                  setPassword(value);
                }}
                placeholderTextColor="#2D2D2D"
                style={styles.textInputStyle}
                secureTextEntry={true}
                placeholder="*******"
              />
            </View>
          </View>
          <View style={styles.email}>
            <Text style={[styles.text, {marginTop: PX(25)}]}>
              Confirm New Password
            </Text>
            <View style={styles.email1}>
              <TextInput
                value={Confirm}
                onChangeText={value => {
                  setConfirm(value);
                }}
                placeholderTextColor="#2D2D2D"
                style={{
                  width: '100%',
                  height: PX(40),
                  color: '#000',
                  fontSize: PX(15),
                  fontFamily: 'Montserrat-Regular',
                }}
                secureTextEntry={true}
              />
            </View>
          </View>

          <View>
            <View style={styles.main3}>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => resetPassword()}>
                <Text style={styles.btnText}>Reset</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
      {alertPopup && (
        <AlertPopup
          modalVisible={alertPopup}
          onRequestClose={() => {
            setAlertPopup(false);
          }}
          title={'Add cart'}
          message={alertMessage}
        />
      )}
    </View>
  );
};
