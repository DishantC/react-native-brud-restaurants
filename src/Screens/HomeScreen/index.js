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

export const HomeScreen = ({ navigation }) => {
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
              item?.cart_items?.map((item1, index1) => {
                total = total + item1.item_total;
                // graph.push(item1.item_total)
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
              });
            } else {
              graph.push(0);
            }
          }

          if (
            moment(item.createdAt).format("DD-MM-YYYY") ==
            moment(new Date().setDate(new Date().getDate() - 1)).format(
              "DD-MM-YYYY"
            )
          ) {
            if (item.status == 5) {
              item?.cart_items?.map((item1, index1) => {
                yesTotal = yesTotal + item1.item_total;
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
    try {
      setLoading(true);
      const id1 = await AsyncStorage.getItem("id");
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
            moment(dates).format("DD-MM-YYYY")
          ) {
            if (item.status == 1) {
              newOrder.push(item);
            } else if (item.status == 4) {
              open.push(item);
            } else if (item.status == 5) {
              item?.cart_items?.map((item1, index1) => {});
              total = total + item.total;
              close.push(item);
              // setGraphValue(graph)
            }
          }

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
            if (item.status == 5) {
              item?.cart_items?.map((item1, index1) => {
                yesTotal = yesTotal + item1.item_total;
                console.log("Get ITme::", item1.item_total);
              });
            }
          }
        });
        setTimeout(() => {
          if (graph.length > 3) {
            setGraphValue(graph);
          } else {
            for (i = 1; i < 4; i++) {
              graph.push(0);
            }
            setGraphValue(graph);
          }

          setNewOrder(newOrder.length);
          setOpenOrder(open.length);
          setCloseOrder(close.length);
          setTotalEarning(total);
          setYesterDay(yesTotal);
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
      <View
        style={{
          height: hasNotch() ? PX(35) : PX(10),
          backgroundColor: "rgb(240,240,240)",
        }}
      />
      <Loader isLoding={loading} />
      <View
        style={{
          height: PX(50),
          alignItems: "flex-end",
          justifyContent: "space-between",
          flexDirection: "row",
          width: "100%",
          paddingHorizontal: PX(20),
        }}
      >
        <TouchableOpacity></TouchableOpacity>
        <Text style={styles.title}>Dashboard</Text>
        <View style={{ width: PX(20), height: PX(20) }}></View>
      </View>
      <ScrollView
        contentContainerStyle={{ paddingBottom: PX(100) }}
        showsVerticalScrollIndicator={false}
      >
        <CalendarStrip
          scrollable
          style={{ height: 120, paddingTop: 20, paddingBottom: 10 }}
          iconContainer={{ flex: 0 }}
          selectedDate={new Date(year, month, date)}
          startingDate={new Date(year, month, lateDate)}
          onDateSelected={(date) => onDateChange(date)}
          scrollerPaging={false}
          showMonth={false}
          highlightDateNumberStyle={{ color: "#fff" }}
          highlightDateNumberContainerStyle={{
            borderRadius: 5,
            width: PX(30),
            height: PX(25),
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#F55800",
          }}
          highlightDateNameStyle={{
            color: "#000",
            width: PX(50),
            fontSize: PX(14),
            height: PX(20),
          }}
          iconStyle={{
            backgroundColor: "#fff",
            tintColor: "#fff",
            height: 1,
            width: 1,
          }}
          // scrollToOnSetSelectedDate={false}
          dateNameStyle={{
            fontSize: PX(14),
            color: "#000",
            fontFamily: Fonts.FONTS.MontserratMedium,
          }}
          dateNumberStyle={{
            fontSize: PX(14),
            color: "#000",
            fontFamily: Fonts.FONTS.MontserratMedium,
            // paddingTop: PX(17),
          }}
        />

        <View style={styles.mainView}>
          <View
            style={{
              height: PX(240),
              paddingRight: PX(20),
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={{ width: "52%", height: PX(240) }}
              onPress={() => navigation.navigate("Orders")}
            >
              <Image
                style={{
                  width: "100%",
                  height: PX(240),
                  resizeMode: "stretch",
                }}
                source={order}
              />

              <View
                style={{
                  position: "absolute",
                  top: PX(55),
                  width: PX(100),
                  height: PX(50),
                  left: PX(45),
                  backgroundColor: "rgb(6,23,32)",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: PX(28),
                    color: "#fff",
                    fontFamily: Fonts.FONTS.MontserratSemiBold,
                  }}
                >
                  {newOrder}
                </Text>
              </View>
            </TouchableOpacity>

            <View
              style={{
                width: "48%",
                justifyContent: "space-between",
                height: PX(210),
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={{ width: "100%", height: PX(95) }}
                onPress={() => navigation.navigate("Orders", { from: "home" })}
              >
                <View
                  style={{
                    backgroundColor: "#fff",
                    width: "100%",
                    height: PX(95),
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: PX(10),
                  }}
                >
                  <Text
                    style={{
                      fontSize: PX(28),
                      color: "#FFB800",
                      fontFamily: Fonts.FONTS.MontserratSemiBold,
                    }}
                  >
                    {openOrder}
                  </Text>
                  <Text
                    style={{
                      fontSize: PX(14),
                      color: "#000",
                      fontFamily: Fonts.FONTS.MontserratMedium,
                    }}
                  >
                    Open Orders
                  </Text>
                </View>
              </TouchableOpacity>
              <View
                style={{
                  backgroundColor: "#fff",
                  width: "100%",
                  height: PX(95),
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: PX(10),
                  marginBottom: PX(9),
                }}
              >
                <Text
                  style={{
                    fontSize: PX(28),
                    color: "#67C117",
                    fontFamily: Fonts.FONTS.MontserratSemiBold,
                  }}
                >
                  {closeOrder}
                </Text>
                <Text
                  style={{
                    fontSize: PX(14),
                    color: "#000",
                    fontFamily: Fonts.FONTS.MontserratMedium,
                  }}
                >
                  Closed Orders
                </Text>
              </View>
            </View>
          </View>

          <View>
            <Image
              style={{ width: "100%", height: PX(170), resizeMode: "stretch" }}
              source={earning}
            />
            <View
              style={{
                position: "absolute",
                top: PX(24),
                height: PX(100),
                backgroundColor: "#fff",
                width: PX(192),
                right: PX(20),
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <LineChart
                data={{
                  labels: [1, 100, 500, 1000, 2000],
                  datasets: [
                    {
                      data: graphValue,
                    },
                  ],
                }}
                width={140} // from react-native
                height={70}
                yAxisLabel=""
                // yAxisSuffix="k"
                // yAxisInterval={1} // optional, defaults to 1
                yLabelsOffset={0}
                chartConfig={{
                  backgroundColor: "#e26a00",
                  backgroundGradientFrom: "#fff",
                  backgroundGradientTo: "#fff",
                  decimalPlaces: 2, // optional, defaults to 2dp
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  labelColor: (opacity = 1) =>
                    `rgba(255, 255, 255, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },

                  propsForDots: {
                    r: "1",
                    strokeWidth: "0",
                    stroke: "#F55800",
                  },
                  fillShadowGradient: "#F55800",
                  fillShadowGradientOpacity: 1,
                  barPercentage: 1,
                }}
                hideLegend={true}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 16,
                  paddingRight: 0,
                  paddingTop: 0,
                  paddingLeft: 0,
                  alignSelf: "center",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              />
            </View>
            <View
              style={{
                position: "absolute",
                top: PX(100),
                height: PX(30),
                backgroundColor: "#fff",
                width: PX(130),
                right: PX(20),
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: "#F55800",
                  fontSize: PX(13),
                  fontFamily: Fonts.FONTS.MontserratSemiBold,
                }}
                onPress={() => navigation.navigate("Earnings")}
              >
                View Details
              </Text>
            </View>

            <View
              style={{
                position: "absolute",
                top: PX(70),
                height: PX(75),
                backgroundColor: "#fff",
                width: PX(130),
                left: PX(33),
              }}
            >
              <Text
                style={{
                  color: "#000",
                  fontSize: PX(20),
                  fontFamily: Fonts.FONTS.MontserratSemiBold,
                }}
              >
                ${totalEarning}
              </Text>
              <Text
                style={{
                  color: "#A4B0BE",
                  fontSize: PX(15),
                  fontFamily: Fonts.FONTS.MontserratMedium,
                  marginTop: PX(15),
                }}
              >
                {`($${yesterDay} Yesterday)`}
              </Text>
            </View>
          </View>

          <View>
            <Image
              style={{ width: "100%", height: PX(200), resizeMode: "stretch" }}
              source={manage}
            />
            <View
              style={{
                position: "absolute",
                bottom: PX(45),
                right: PX(60),
                height: PX(50),
                width: PX(170),
                backgroundColor: "#fff",
                paddingLeft: PX(10),
                // alignItems:'center'
              }}
            >
              <TouchableOpacity
                style={{
                  height: PX(27),
                  width: PX(130),
                  backgroundColor: "#F55800",
                  borderRadius: PX(20),
                  alignItems: "center",
                  justifyContent: "center",
                  marginLeft: PX(10),
                }}
                onPress={() => navigation.navigate("ProfileScreen")}
              >
                <Text
                  style={{
                    fontSize: PX(14),
                    color: "#fff",
                    fontFamily: Fonts.FONTS.MontserratMedium,
                  }}
                >
                  Add Item
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.cross1}>
              <Image
                source={require("../../Assets/logo-white.png")}
                style={styles.logo}
              />
              <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                <Image
                  source={require("../../Assets/cross.png")}
                  style={styles.cross}
                />
              </TouchableOpacity>
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
                  style={{
                    width: PX(25),
                    height: PX(25),
                    resizeMode: "contain",
                  }}
                />
                <Text style={styles.text10}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
