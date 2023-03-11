import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
  Animated,
} from 'react-native';
import styles from './styles';
import {PX} from '../../Components/Pixel/index';
import {hasNotch} from 'react-native-device-info';
import {Fonts} from '../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';

export const SplashScreen = ({navigation, route}) => {
  const width = new Animated.Value(60);
  const height = new Animated.Value(60);
  const width1 = new Animated.Value(80);
  const height1 = new Animated.Value(80);
  const width2 = new Animated.Value(100);
  const height2 = new Animated.Value(100);
  const duration = 1000;
  useEffect(() => {
    LoginCheck();
  }, []);

  useEffect(() => {
    messageListener();
  }, []);

  useEffect(() => {
    Animated.timing(
      width1, // The animated value to drive
      {
        toValue: 100, // Animate to opacity: 1 (opaque)
        duration: 1000, // Make it take a while
        useNativeDriver: false,
      },
    ).start(); // Starts the animation
    Animated.timing(
      height1, // The animated value to drive
      {
        toValue: 100, // Animate to opacity: 1 (opaque)
        duration: 1000, // Make it take a while
        useNativeDriver: false,
      },
    ).start();
  }, []);

  useEffect(() => {
    Animated.timing(
      width2, // The animated value to drive
      {
        toValue: 120, // Animate to opacity: 1 (opaque)
        duration: 1000, // Make it take a while
        useNativeDriver: false,
      },
    ).start(); // Starts the animation
    Animated.timing(
      height2, // The animated value to drive
      {
        toValue: 120, // Animate to opacity: 1 (opaque)
        duration: 1000, // Make it take a while
        useNativeDriver: false,
      },
    ).start();
  }, []);

  useEffect(() => {
    Animated.timing(
      width, // The animated value to drive
      {
        toValue: 80, // Animate to opacity: 1 (opaque)
        duration: 1000, // Make it take a while
        useNativeDriver: false,
      },
    ).start(); // Starts the animation
    Animated.timing(
      height, // The animated value to drive
      {
        toValue: 80, // Animate to opacity: 1 (opaque)
        duration: 1000, // Make it take a while
        useNativeDriver: false,
      },
    ).start();
  }, []);
  const messageListener = () => {
    messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
      const {notification, messageId} = remoteMessage;
      if (Platform.OS == 'ios') {
        PushNotificationIOS.addNotificationRequest({
          id: messageId,
          body: notification.body,
          title: notification.title,
        });
      } else {
        PushNotification.localNotification({
          channelId: 'channel-id',
          id: messageId,
          body: notification.body,
          title: notification.title,
        });
      }
    });
  };

  const LoginCheck = async () => {
    const id = await AsyncStorage.getItem('id');
    if (id != null) {
      navigation.replace('MainStack');
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
      <View style={styles.firstView}>
        <Animated.Image
          style={[styles.firstImage, {width: width, height: height}]}
          source={require('../../Assets/welcome1.png')}
        />
        <View
          style={{
            width: '100%',
            alignItems: 'flex-end',
            marginTop: PX(20),
          }}>
          <Animated.Image
            style={[styles.secondImage, {width: width1, height: height1}]}
            source={require('../../Assets/welcome2.png')}
          />
        </View>
        <Animated.Image
          style={[styles.thirdImage, {width: width2, height: height2}]}
          source={require('../../Assets/welcome3.png')}
        />
      </View>
      <View style={styles.secondView}>
        <Image
          style={styles.logoImage}
          source={require('../../Assets/logo.png')}
        />
        <Text style={styles.desText}>
          Find your perfect place for eat, meet and get rewards
        </Text>
        <View style={styles.ButtonView}>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => navigation.navigate('EmailLoginScreen')}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: PX(20),
          }}>
          <Text
            style={{
              fontSize: PX(15),
              color: '#fff',
              fontFamily: Fonts.FONTS.MontserratSemiBold,
            }}>
            start your day{' '}
          </Text>

          <Text
            style={styles.loginText}
            onPress={() => navigation.navigate('LoginScreen')}>
            Login
          </Text>
        </View>
      </View>

      <View style={{position: 'absolute', bottom: PX(20), right: PX(20)}}>
        <Text
          style={{
            fontFamily: Fonts.FONTS.MontserratSemiBold,
            fontSize: PX(15),
            color: '#828282',
          }}>
          {'Version 1.0 (2)'}
        </Text>
      </View>
    </View>
  );
};
