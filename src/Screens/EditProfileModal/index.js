import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  Platform,
} from "react-native";
import styles from "./styles";
import { PX } from "../../Components/Pixel/index";
import { hasNotch } from "react-native-device-info";
import CalendarStrip from "react-native-calendar-strip";
import { Fonts } from "../../utils";
import Header from "../../Components/Header";
import earning from "../../Assets/Earning_Today.png";
import order from "../../Assets/new_order.png";
import manage from "../../Assets/manage_menu.png";
import { Colors } from "react-native/Libraries/NewAppScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import logout from "../../Assets/logout.png";
import { orderListApi } from "../../services/Api";
import { Loader } from "../../Components/Loader";
import moment from "moment";
import { LineChart } from "react-native-chart-kit";

export const EditProfileModal = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [newOrder, setNewOrder] = useState(0);
  const [openOrder, setOpenOrder] = useState(0);
  const [closeOrder, setCloseOrder] = useState(0);
  const [totalEarning, setTotalEarning] = useState(0);
  const [yesterDay, setYesterDay] = useState(0);
  const [graphValue, setGraphValue] = useState([0, 0, 0, 0]);
  const [modalVisible, setModalVisible] = useState(false);
  const month = new Date().getMonth();
  const date = new Date().getDate();
  const year = new Date().getFullYear();
  const lateDate = date - 3;
  console.log("GEt Data::::", date);
  const Logout = () => {
    setModalVisible(false);
    AsyncStorage.setItem("id", "");
    navigation.navigate("AuthStack");
  };
  useEffect(() => {
    const subscribe = navigation.addListener("focus", () => {
      orderList();
    });
  }, []);

  const orderList = async () => {
    try {
      setLoading(true);
      const timeStamp = new Date().getTime();
      const yesterdayTimeStamp = timeStamp - 24 * 60 * 60 * 1000;
      const id1 = await AsyncStorage.getItem("id");
      console.log("Get ID::", id1);
      const restaurant_id = encodeURIComponent(id1);
      const requestBody = `restaurant_id=${restaurant_id}`;
      const response = await orderListApi(requestBody);
      if (response.sucecess) {
        setLoading(false);
        let open = [];
        let newOrder = [];
        let close = [];
        let graph = [];
        let total = 0;
        let yesTotal = 0;
        await response.data?.map((item, index) => {
          if (
            moment(item.createdAt).format("DD-MM-YYYY") ==
            moment(new Date()).format("DD-MM-YYYY")
          ) {
            if (item.status == 1) {
              newOrder.push(item);
            } else if (item.status == 4) {
              open.push(item);
            } else if (item.status == 5) {
              console.log("Get ITme::", item?.cart_items);
              item?.cart_items?.map((item1, index1) => {
                total = total + item1.item_total;
                // graph.push(item1.item_total)
                console.log("Get ITme::", item1.item_total);
              });
              close.push(item);
              // setGraphValue(graph)
            }
          }

          if (
            moment(item.createdAt).format("DD-MM-YYYY") >=
              moment(new Date().setDate(new Date().getDate() - 4)).format(
                "DD-MM-YYYY"
              ) &&
            moment(item.createdAt).format("DD-MM-YYYY") <=
              moment(new Date()).format("DD-MM-YYYY")
          ) {
            if (item.status == 5) {
              item?.cart_items?.map((item1, index1) => {
                graph.push(item1.item_total);
                console.log("Get ITme::", item1.item_total);
              });
            } else {
              graph.push(0);
            }
            console.log("Get ITme::", item?.cart_items);
          }
          console.log(
            "Get Date:::::",
            moment(item.createdAt).format("DD-MM-YYYY"),
            new Date().setDate(new Date().getDate() - 4)
          );
          if (
            moment(item.createdAt).format("DD-MM-YYYY") ==
            moment(new Date().setDate(new Date().getDate() - 1)).format(
              "DD-MM-YYYY"
            )
          ) {
            console.log("Get ITme:: YesterDaY", item?.status);
            if (item.status == 5) {
              item?.cart_items?.map((item1, index1) => {
                yesTotal = yesTotal + item1.item_total;
                console.log("Get ITme::", item1.item_total);
              });
            }
          }
        });
        // setGraphValue(graph.reverse())
        setNewOrder(newOrder.length);
        setOpenOrder(open.length);
        setCloseOrder(close.length);
        setTotalEarning(total);
        setYesterDay(yesTotal);
      } else {
        setLoading(false);
        Alert.alert(" ", response.message);
      }
    } catch (err) {
      setLoading(false);
      console.log("Error::::", err);
      alert("Server issue.");
    }
  };

  const onDateChange = async (dates) => {
    console.log("GEt DATA:::", dates);
    try {
      setLoading(true);
      const id1 = await AsyncStorage.getItem("id");
      console.log("Get ID::", id1);
      const restaurant_id = encodeURIComponent(id1);
      const requestBody = `restaurant_id=${restaurant_id}`;
      const response = await orderListApi(requestBody);
      if (response.sucecess) {
        setLoading(false);
        let open = [];
        let newOrder = [];
        let close = [];
        let graph = [];
        let total = 0;
        let yesTotal = 0;
        await response.data?.map((item, index) => {
          console.log(
            "Get Date:::::",
            moment(item.createdAt).format("DD-MM-YYYY"),
            moment(dates).format("DD-MM-YYYY")
          );
          if (
            moment(item.createdAt).format("DD-MM-YYYY") ==
            moment(dates).format("DD-MM-YYYY")
          ) {
            if (item.status == 1) {
              newOrder.push(item);
            } else if (item.status == 4) {
              open.push(item);
            } else if (item.status == 5) {
              console.log("Get ITme::", item.total);
              item?.cart_items?.map((item1, index1) => {
                // total=total+item1.item_total
                // graph.push(item1.item_total)
                console.log("Get ITme::", item1.item_total);
              });
              total = total + item.total;
              close.push(item);
              // setGraphValue(graph)
            }
          }
          console.log(
            "Get Date:::::",
            moment(item.createdAt).format("DD-MM-YYYY") >=
              moment(new Date().setDate(new Date(dates).getDate() - 4)).format(
                "DD-MM-YYYY"
              ) &&
              moment(item.createdAt).format("DD-MM-YYYY") <=
                moment(new Date(dates)).format("DD-MM-YYYY")
          );
          if (
            moment(item.createdAt).format("DD-MM-YYYY") >=
              moment(new Date().setDate(new Date(dates).getDate() - 4)).format(
                "DD-MM-YYYY"
              ) &&
            moment(item.createdAt).format("DD-MM-YYYY") <=
              moment(new Date(dates)).format("DD-MM-YYYY")
          ) {
            if (item.status == 5) {
              item?.cart_items?.map((item1, index1) => {
                graph.push(parseInt(item1.item_total));
                console.log("Get ITme::", item1.item_total);
              });
            } else {
              graph.push(0);
            }
          }

          if (
            moment(item.createdAt).format("DD-MM-YYYY") ==
            moment(new Date().setDate(new Date(dates).getDate() - 1)).format(
              "DD-MM-YYYY"
            )
          ) {
            console.log("Get ITme:: YesterDaY", item?.status);
            if (item.status == 5) {
              item?.cart_items?.map((item1, index1) => {
                yesTotal = yesTotal + item1.item_total;
                console.log("Get ITme::", item1.item_total);
              });
            }
          }
        });
        setTimeout(() => {
          console.log("Get Graph Value::", graph);
          if (graph.length > 3) {
            setGraphValue(graph);
          } else {
            for (i = 1; i < 4; i++) {
              graph.push(0);
            }
            console.log("Get Graph Value::", graph);
            setGraphValue(graph);
          }

          setNewOrder(newOrder.length);
          setOpenOrder(open.length);
          setCloseOrder(close.length);
          setTotalEarning(total);
          setYesterDay(yesTotal);
          console.log("Get ITme::", totalEarning);
        }, 200);
      } else {
        setLoading(false);
        Alert.alert(" ", response.message);
      }
    } catch (err) {
      setLoading(false);
      console.log("Error::::", err);
      alert("Server issue.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.modalView}>
        <View style={styles.cross1}>
          <Image
            source={require("../../Assets/logo-white.png")}
            style={styles.logo}
          />
          {/* <TouchableOpacity
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Image
                      source={require('../../Assets/cross.png')}
                      style={styles.cross}
                    />
                  </TouchableOpacity> */}
        </View>

        <View style={styles.menu}>
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center" }}
            onPress={() => {
              setModalVisible(false), navigation.navigate("AddCustomer");
            }}
          >
            <Image
              source={require("../../Assets/edit.png")}
              style={styles.menuImage}
            />
            <Text style={styles.text2}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center" }}
            onPress={() => Logout()}
          >
            <Image
              source={logout}
              style={{ width: PX(25), height: PX(25), resizeMode: "contain" }}
            />
            <Text style={styles.text10}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
