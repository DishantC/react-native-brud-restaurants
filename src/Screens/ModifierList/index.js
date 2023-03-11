import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  FlatList,
} from "react-native";
import styles from "./styles";
import { PX } from "../../Components/Pixel/index";
import deleted from "../../Assets/delete.png";
import { Fonts } from "../../utils";
import { hasNotch } from "react-native-device-info";
import backArrow from "../../Assets/backArrow.png";
import DeletePopup from "../../Components/DeletePopup";
import {
  GetModifier,
  GetItemModifier,
  DeleteModifier,
} from "../../services/Api";

export const ModifierList = ({ navigation, route }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modifierData, setModifierData] = useState([]);
  const [modifierId, setModifierId] = useState("");

  useEffect(() => {
    const subscribe = navigation.addListener("focus", () => {
      GetItemDetails(route.params.itemId);
    });
  }, []);

  const GetItemDetails = async (id) => {
    const item_id = encodeURIComponent(id);
    const requestBody = `item_id=${item_id}`;
    const response = await GetItemModifier(requestBody);

    console.log("Get Items::", response);
    setModifierData(response.data);
  };

  const deleteModifier = async (id) => {
    const modifier_id = encodeURIComponent(id);
    const requestBody = `modifier_id=${modifier_id}`;
    const response = await DeleteModifier(requestBody);

    if (response.sucecess) {
      setModalVisible(false);
      alert(response.message);
    } else {
      setModalVisible(false);
      alert("Something is Wrong.");
    }
    GetItemDetails(route.params.itemId);
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          height: hasNotch() ? PX(35) : PX(10),
          backgroundColor: "#000",
        }}
      />
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: PX(20),
          marginBottom: PX(130),
        }}
      >
        <View style={[styles.headerView]}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              style={{ height: PX(20), width: PX(20), resizeMode: "contain" }}
              source={backArrow}
            />
          </TouchableOpacity>

          <Text style={styles.headerText}>Modifier</Text>
          <Image
            style={{ height: PX(20), width: PX(20), resizeMode: "contain" }}
          />
        </View>

        <FlatList
          data={modifierData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={(item, index) => {
            console.log("Get Data:::::::::", item);
            return (
              <View
                style={{
                  width: "100%",
                  paddingTop: PX(40),
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    width: "60%",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    height: PX(40),
                    paddingHorizontal: PX(10),
                  }}
                >
                  <Text
                    style={{
                      color: "#2D2D2D",
                      fontSize: PX(14),
                      fontFamily: Fonts.FONTS.MontserratMedium,
                    }}
                  >
                    {item?.item?.group_name}
                  </Text>
                  {/* <Image
                    style={{
                      width: PX(10),
                      height: PX(10),
                      resizeMode: 'contain',
                    }}
                    source={downArrow}
                  /> */}
                </View>
                <TouchableOpacity
                  style={styles.changeButton}
                  onPress={() =>
                    navigation.navigate("AddModifier", {
                      items: item,
                      from: "edit",
                    })
                  }
                >
                  <Text style={styles.changeText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  // onPress={() => deleteModifier(item.item.id)}
                  onPress={() => {
                    setModifierId(item.item.id);
                    setModalVisible(true);
                  }}
                >
                  <Image
                    style={{
                      width: PX(25),
                      height: PX(25),
                      resizeMode: "contain",
                    }}
                    source={deleted}
                  />
                </TouchableOpacity>
              </View>
            );
          }}
        />

        {/* <View style={{width: '100%', marginTop: PX(20)}}>
          <View style={[styles.headerView]}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                style={{height: PX(20), width: PX(20), resizeMode: 'contain'}}
                source={backArrow}
              />
            </TouchableOpacity>

            <Text style={styles.headerText}>Modifier</Text>
            <Image
              style={{height: PX(20), width: PX(20), resizeMode: 'contain'}}
            />
          </View>

          <View
            style={{
              width: '100%',
              paddingTop: PX(20),
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingVertical: PX(30),
            }}>
            <View
              style={{
                width: '60%',
                height: PX(40),
                paddingHorizontal: PX(10),
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: '#2D2D2D',
                  fontSize: PX(14),
                  fontFamily: Fonts.FONTS.MontserratMedium,
                }}>
                Size
              </Text>
            </View>
            <TouchableOpacity style={styles.changeButton}>
              <Text style={styles.changeText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => {
                setModalVisible(true);
              }}>
              <Image
                style={{
                  width: PX(25),
                  height: PX(25),
                  resizeMode: 'contain',
                }}
                source={deleted}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              width: '100%',
              paddingTop: PX(20),
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingVertical: PX(30),
            }}>
            <View
              style={{
                width: '60%',
                height: PX(40),
                paddingHorizontal: PX(10),
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: '#2D2D2D',
                  fontSize: PX(14),
                  fontFamily: Fonts.FONTS.MontserratMedium,
                }}>
                Milk
              </Text>
            </View>
            <TouchableOpacity style={styles.changeButton} onPress={()=>navigation.navigate('AddModifier',{items:item,from:"edit"})}>
              <Text style={styles.changeText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => {
                setModalVisible(true);
              }}>
              <Image
                style={{
                  width: PX(25),
                  height: PX(25),
                  resizeMode: 'contain',
                }}
                source={deleted}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              width: '100%',
              paddingTop: PX(20),
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingVertical: PX(30),
            }}>
            <View
              style={{
                width: '60%',
                height: PX(40),
                paddingHorizontal: PX(10),
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: '#2D2D2D',
                  fontSize: PX(14),
                  fontFamily: Fonts.FONTS.MontserratMedium,
                }}>
                Extras
              </Text>
            </View>
            <TouchableOpacity style={styles.changeButton}>
              <Text style={styles.changeText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => {
                setModalVisible(true);
              }}>
              <Image
                style={{
                  width: PX(25),
                  height: PX(25),
                  resizeMode: 'contain',
                }}
                source={deleted}
              />
            </TouchableOpacity>
          </View> */}
        {/* </View> */}

        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() =>
            navigation.navigate("AddModifier", { itemId: route.params.itemId })
          }
        >
          <Text style={styles.buttonText}>Add New Modifier</Text>
        </TouchableOpacity>
      </View>

      {modalVisible && (
        <DeletePopup
          modalVisible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}
          deleteOnPress={() => deleteModifier(modifierId)}
          text={"Are you sure you want to delete\nmodifier group permanently ?"}
        />
      )}
    </View>
  );
};
