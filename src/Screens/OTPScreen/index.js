import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import {PX} from '../../Components/Pixel/index';
import {hasNotch} from 'react-native-device-info';
import logo from '../../Assets/logo1.png';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
  isLastFilledCell,
} from 'react-native-confirmation-code-field';
import {VerifyOTPApi, ResendOTPApi} from '../../services/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Loader} from '../../Components/Loader';

export const OTPScreen = ({navigation, route}) => {
  const inputCodeRef = useRef(null);
  const [email, setEmail] = useState('');
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [inputCodeProps, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const VerifyOtp = async () => {
    setLoading(true);
    const id = encodeURIComponent(route.params?.id);
    const otp = encodeURIComponent(value);

    const requestBody = `id=${id}&otp=${otp}`;
    const res = await VerifyOTPApi(requestBody);
    console.log('Get Api Response:::', res);
    if (!res.sucecess) {
      setLoading(false);
      alert(res.message);
    } else {
      setLoading(false);
      // alert(res.message)

      if (route.params?.from == 'forgot') {
        navigation.navigate('ResetPassword', {id: route.params?.id});
      } else {
        AsyncStorage.setItem('id', route.params?.id);
        navigation.navigate('CreatePassword', {id: route.params?.id});
      }
    }
    //  navigation.navigate('CreatePassword');
  };

  const resendOtp = async () => {
    setLoading(true);
    const id = encodeURIComponent(route.params?.id);
    const requestBody = `id=${id}`;
    const response = await ResendOTPApi(requestBody);
    console.log('Get Api Response:::', response);
    if (!response.sucecess) {
      setLoading(false);
      alert(response.message);
    } else {
      setLoading(false);
      // alert(response.data.otp)
      alert(response.message);
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
          <Text style={styles.header}>Enter Code</Text>
          <Text style={styles.heder1}>
            Submit code recieved on your Email id
          </Text>
        </View>

        <View style={{width: '100%', alignItems: 'center', paddingTop: PX(50)}}>
          <View style={styles.email}>
            <Text style={styles.text}>your 4 digit OTP</Text>
            <View style={styles.email1}>
              <CodeField
                ref={inputCodeRef}
                {...inputCodeProps}
                value={value}
                onChangeText={(value, i) => {
                  setValue(value);
                  // if (value && value.length === 4) {
                  //   VerifyOtp()
                  // }
                }}
                cellCount={4}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({index, symbol, isFocused}) => (
                  <View
                    style={[
                      styles.optTextView,
                      {
                        borderBottomColor: isFocused ? '#F55800' : '#848484',
                      },
                    ]}>
                    <Text
                      key={index}
                      style={[styles.cell, isFocused && styles.focusCell]}
                      onLayout={getCellOnLayoutHandler(index)}>
                      {symbol || (isFocused ? <Cursor /> : null)}
                    </Text>
                  </View>
                )}
              />
            </View>
          </View>
        </View>

        <View style={styles.main3}>
          <TouchableOpacity style={styles.btn} onPress={() => VerifyOtp()}>
            <Text style={styles.btnText}>Submit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{marginTop: PX(25)}}
            onPress={() => resendOtp()}>
            <Text style={styles.ResetText}>RESEND</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};
