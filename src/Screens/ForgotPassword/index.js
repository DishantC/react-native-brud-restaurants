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
import {forgotPasswordApi} from '../../services/Api';
import {Loader} from '../../Components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ForgotPassword = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const registerApi = async () => {
    var email1 = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    try {
      if (email == '') {
        alert('Please Enter EmailId.');
      } else if (!email1.test(email)) {
        // setAlertMessage('Please Enter Valid  EmailId.')
        // setAlertPopup(true)
        alert('Please Enter Valid  EmailId.');
      } else {
        setLoading(true);
        const emailId = encodeURIComponent(email);
        const requestBody = `email=${emailId}`;
        const response = await forgotPasswordApi(requestBody);
        console.log('Response:::', response, email);

        if (!response?.sucecess) {
          setLoading(false);
          console.log('Response:::', response);
          alert(response.message);
        } else {
          setLoading(false);
          // alert(response.data.otp)

          navigation.navigate('OTPScreen', {
            id: response.data.id,
            email: email,
            otp: response.data.otp,
            from: 'forgot',
          });
        }
      }
    } catch (err) {
      alert('Server Issue.');
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          height: hasNotch() ? PX(35) : PX(10),
          backgroundColor: '#000',
        }}
      />
      <Loader isLoding={loading} />
      <KeyboardAwareScrollView>
        <View style={styles.logo1}>
          <Image source={logo} style={styles.logo} />
        </View>

        <View style={styles.main}>
          <Text style={styles.header}>Forgot Password</Text>
          <Text style={styles.heder1}>Enter your email id and get code</Text>
        </View>

        <View style={{width: '100%', alignItems: 'center', paddingTop: PX(50)}}>
          <View style={styles.email}>
            <Text style={styles.text}>Email address</Text>
            <View style={styles.email1}>
              <TextInput
                placeholder="Enter Email"
                value={email}
                onChangeText={value => {
                  setEmail(value);
                }}
                style={styles.textInputStyle}
                placeholderTextColor="#2D2D2D"
              />
            </View>
          </View>

          <View style={styles.main3}>
            <TouchableOpacity style={styles.btn} onPress={() => registerApi()}>
              <Text style={styles.btnText}>Get Code</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};
