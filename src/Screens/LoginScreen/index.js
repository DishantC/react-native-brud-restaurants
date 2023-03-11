import React, { useState, useEffect } from "react";
import {
  Image,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import styles from "./styles";
import { PX } from "../../Components/Pixel/index";
import { hasNotch } from "react-native-device-info";
import { LoginApi } from "../../services/Api";
import { Loader } from "../../Components/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import messaging from "@react-native-firebase/messaging";
import { Fonts } from "../../utils";

export const LoginScreen = ({ navigation }) => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log(fcmToken);
      setToken(fcmToken);
    }
  };

  const ResetPassword = () => {
    navigation.navigate("ForgotPassword");
  };

  const loginApi = async () => {
    try {
      setLoading(true);
      console.log("Get Api Response:::", Email, Password, token);
      const email = encodeURIComponent(Email);
      const password = encodeURIComponent(Password);
      const device_token = encodeURIComponent(token);
      const requestBody = `email=${email}&password=${password}&device_token=${device_token}`;

      const response = await LoginApi(requestBody);

      if (!response.sucecess) {
        setLoading(false);
        alert(response.message);
      } else {
        setLoading(false);
        Alert.alert(" ", response.message);
        AsyncStorage.setItem("id", response.data.id);
        navigation.replace("MainStack");
      }
    } catch (err) {
      setLoading(false);
      console.log("Get Error:::", err);
    }
    //  navigation.navigate('OTPScreen');
  };

  return (
    <View style={styles.main}>
      <View style={{ height: hasNotch() ? PX(30) : PX(10) }} />
      <Loader isLoding={loading} />
      <View style={styles.logo1}>
        <Image source={require("../../Assets/logo1.png")} style={styles.logo} />
      </View>

      <View style={styles.heder2}>
        <Text style={styles.heder1}>Login your account</Text>
        <Text style={styles.heder}>
          Fill in your credentials and start ordering
        </Text>
      </View>
      <ScrollView
        style={{ width: "100%" }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ width: "98%", alignItems: "center" }}>
          <View style={styles.email}>
            <Text style={styles.text}>Email address</Text>
            <View style={styles.email1}>
              <TextInput
                placeholder="Enter Email"
                value={Email}
                onChangeText={(value) => {
                  setEmail(value);
                }}
                style={{
                  width: "100%",
                  height: PX(45),
                  color: "#000",
                  fontSize: PX(15),
                  marginTop: PX(5),
                  fontFamily: Fonts.FONTS.MontserratMedium,

                  paddingLeft: -1,

                  textAlign: "left",
                  alignSelf: "flex-start",
                }}
                placeholderTextColor="#2D2D2D"
              />
            </View>
          </View>

          <View style={styles.email}>
            <Text style={[styles.text, { marginTop: PX(20) }]}>Password</Text>
            <View style={styles.email1}>
              <TextInput
                value={Password}
                onChangeText={(value) => {
                  setPassword(value);
                }}
                placeholder="Enter Password"
                placeholderTextColor="#2D2D2D"
                style={{
                  width: "100%",
                  height: PX(40),
                  color: "#000",
                  fontSize: PX(15),
                  marginTop: PX(5),
                  fontFamily: Fonts.FONTS.MontserratMedium,
                  paddingLeft: -1,
                }}
                secureTextEntry={true}
              />
            </View>
          </View>

          <View style={{ width: "100%" }}>
            <View style={styles.main3}>
              <TouchableOpacity style={styles.btn} onPress={() => loginApi()}>
                <Text style={styles.btnText}>Login</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.forgot}>
              <Text style={styles.forgot1}>Forgot password ? </Text>
              <TouchableOpacity onPress={() => ResetPassword()}>
                <Text style={styles.reset}>Reset password</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
