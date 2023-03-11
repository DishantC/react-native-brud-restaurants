import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  LogBox,
  PermissionsAndroid,
  Platform,
  Alert,
} from "react-native";
import { PX } from "../../Components/Pixel/index";
import { hasNotch } from "react-native-device-info";
import styles from "./styles";
import logo from "../../Assets/logo1.png";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import firstStep from "../../Assets/shop-outline.png";
import uploadBanner from "../../Assets/uploadbanner1.png";
import open from "../../Assets/open.png";
import CountryPicker, { DARK_THEME } from "react-native-country-picker-modal";
import backArrow from "../../Assets/backArrow.png";
import calendar from "../../Assets/calendar.png";
import { Fonts } from "../../utils";
import ProductType from "../../Components/ProductType";
import CategoryType from "../../Components/CategoryType";
import deleted from "../../Assets/delete.png";
import downArrow from "../../Assets/downArrow.png";
import {
  ModifierApi,
  UploadImage,
  DeleteModifier,
  UpdateModifier,
  AddItemApi,
  GetItemModifier,
  UpdateItems,
} from "../../services/Api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Loader } from "../../Components/Loader";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import DeletePopup from "../../Components/DeletePopup";
import ImagePopup from "../../Components/ImagePopup";
import ImagePicker from "react-native-image-crop-picker";

export const AddItem = ({ navigation, route }) => {
  const [pageIndex, setPageIndex] = useState(1);
  const [address, setAddress] = useState("");
  const [product, setProduct] = useState("");
  const [city, setCity] = useState("");
  const [productModal, setProductModal] = useState(false);
  const [categoryModal, setCategoryModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState([]);
  const [productType, setProductType] = useState([]);
  const [itemId, setItemId] = useState("");
  const [itemName, setItemName] = useState("");
  const [modifierData, setModifierData] = useState([]);
  const [modifierId, setModifierId] = useState("");
  const [imageVisible, setImageVisible] = useState(false);
  const [des, setDes] = useState("");

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  const addItems = async () => {
    if (address == "") {
      Alert.alert("Add Item", "Please enter item name.");
    } else if (productType.length == 0) {
      Alert.alert("Add Item", "Please select product category.");
    } else if (city == "") {
      Alert.alert("Add Item", "Please enter item price.");
    } else if (profile.length == 0) {
      Alert.alert("Add Item", "Please select or take image.");
    } else {
      try {
        var formdata = new FormData();
        formdata.append("image", {
          name: profile[0]?.fileName,
          uri: profile[0]?.uri,
          type: profile[0]?.type,
        });

        const imagePath = await UploadImage(formdata);
        setLoading(true);
        const id1 = await AsyncStorage.getItem("id");
        console.log("Get ID::", id1);
        const id = encodeURIComponent(id1);
        const item_name = encodeURIComponent(address);
        const product_type = encodeURIComponent(productType);
        const category_type = encodeURIComponent(product);
        const price = encodeURIComponent(city);
        const image = encodeURIComponent(imagePath.data.filepath_url);
        const item_desc = encodeURIComponent(des);

        const requestBody = `id=${id}&item_name=${item_name}&item_desc=${item_desc}&product_type=${product_type}&category_type=${category_type}&price=${price}&image=${image}`;

        const response = await AddItemApi(requestBody);

        console.log("Get Api Response:::", response);
        if (!response.sucecess) {
          setLoading(false);
          Alert.alert(" ", response.message);
        } else {
          setLoading(false);
          setItemId(response.data.id);
          // alert(response.message)
          // navigation.navigate('ModifierSuccess')
          setPageIndex(pageIndex + 1);
        }
      } catch (error) {
        console.log("error", error);
        setLoading(false);
      }
    }
  };

  const updateItems = async () => {
    if (address == "") {
      Alert.alert("Add Item", "Please enter item name.");
    } else if (productType.length == 0) {
      Alert.alert("Add Item", "Please select product type.");
    } else if (city == "") {
      Alert.alert("Add Item", "Please enter item price.");
    } else if (profile.length == 0) {
      Alert.alert("Add Item", "Please select or take image.");
    } else {
      try {
        var formdata = new FormData();
        formdata.append("image", {
          name: profile[0]?.fileName,
          uri: profile[0]?.uri,
          type: profile[0]?.type,
        });

        const imagePath = await UploadImage(formdata);
        setLoading(true);
        const id1 = await AsyncStorage.getItem("id");
        console.log("Get ID::", id1);
        const item_id = encodeURIComponent(route.params?.items._id);
        const item_name = encodeURIComponent(address);
        const product_type = encodeURIComponent(productType);
        const category_type = encodeURIComponent(product);
        const price = encodeURIComponent(city);
        const image = encodeURIComponent(imagePath.data.filepath_url);
        const item_desc = encodeURIComponent(des);

        const requestBody = `item_id=${item_id}&item_name=${item_name}&item_desc=${item_desc}&product_type=${product_type}&category_type=${category_type}&price=${price}&image=${image}`;

        const response = await UpdateItems(requestBody);

        if (!response.sucecess) {
          setLoading(false);
          Alert.alert(" ", response.message);
        } else {
          setLoading(false);
          console.log("Get Api Response:::", route.params?.items.id);
          setItemId(route.params?.items._id);
          // alert(response.message)
          // navigation.navigate('ModifierSuccess')
          setPageIndex(pageIndex + 1);
        }
      } catch (error) {
        console.log("error", error);
        setLoading(false);
      }
    }
  };

  const selectFile = async () => {
    setImageVisible(false);
    if (Platform.OS == "ios") {
      let options = {
        mediaType: "photo",
        maxWidth: 300,
        maxHeight: 550,
        quality: 1,
      };
      launchImageLibrary(options, (response) => {
        console.log("Response = ", response);
        setLoading(true);
        if (response.didCancel) {
          alert("User cancelled camera picker");
          setLoading(false);
          return;
        } else if (response.errorCode == "camera_unavailable") {
          alert("Camera not available on device");
          setLoading(false);
          return;
        } else if (response.errorCode == "permission") {
          alert("Permission not satisfied");
          setLoading(false);
          return;
        } else if (response.errorCode == "others") {
          alert(response.errorMessage);
          setLoading(false);
          return;
        }
        setLoading(false);
        setProfile(response.assets);
      });
    } else {
      try {
        setImageVisible(false);
        ImagePicker.openPicker({
          width: 300,
          height: 400,
          cropping: true,
        }).then((image) => {
          console.log(image);
          var filename = image.path.substring(image.path.lastIndexOf("/") + 1);
          // setProfile(response.data.image)
          setProfile([
            {
              uri: image.path,
              fileName: filename,
              type: image.mime,
            },
          ]);
          // setProfile(response.assets);
        });
      } catch (err) {
        setImageVisible(false);
      }
    }
  };

  const requestCameraPermission = async () => {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: "Camera Permission",
            message: "App needs camera permission",
          }
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: "External Storage Write Permission",
            message: "App needs write permission",
          }
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert("Write permission err", err);
      }
      return false;
    } else return true;
  };

  const takeImage = async () => {
    setImageVisible(false);
    if (Platform.OS == "ios") {
      let options = {
        mediaType: "photo",
        maxWidth: 300,
        maxHeight: 550,
        quality: 1,
      };
      let isCameraPermitted = await requestCameraPermission();
      let isStoragePermitted = await requestExternalWritePermission();
      if (isCameraPermitted && isStoragePermitted) {
        launchCamera(options, (response) => {
          console.log("Response = ", response);
          setLoading(true);
          if (response.didCancel) {
            alert("User cancelled camera picker");
            setLoading(false);
            return;
          } else if (response.errorCode == "camera_unavailable") {
            alert("Camera not available on device");
            setLoading(false);
            return;
          } else if (response.errorCode == "permission") {
            alert("Permission not satisfied");
            setLoading(false);
            return;
          } else if (response.errorCode == "others") {
            alert(response.errorMessage);
            setLoading(false);
            return;
          }
          setLoading(false);

          setProfile(response.assets);
        });
      }
    } else {
      try {
        setImageVisible(false);
        ImagePicker.openCamera({
          width: 300,
          height: 400,
          cropping: true,
        }).then((image) => {
          console.log(image);
          var filename = image.path.substring(image.path.lastIndexOf("/") + 1);
          // setProfile(response.data.image)
          setProfile([
            {
              uri: image.path,
              fileName: filename,
              type: image.mime,
            },
          ]);
        });
      } catch (err) {
        setImageVisible(false);
      }
    }
  };

  useEffect(() => {
    const subscribe = navigation.addListener("focus", () => {
      if (route.params?.from == "edit") {
        var filename = route.params?.items.image.substring(
          route.params?.items.image.lastIndexOf("/") + 1
        );
        var type = route.params?.items.image.substring(
          route.params?.items.image.lastIndexOf(".") + 1
        );
        setAddress(route.params?.items.item_name);
        setProductType([route.params?.items.product_type]);
        setProduct(route.params?.items.category_type);
        setItemId(route.params?.items._id);
        setCity(route.params?.items.price);
        console.log("Get TYPE:>>>", route.params?.items._id);
        setProfile([
          {
            uri: route.params?.items.image,
            fileName: filename,
            type: `image/${type}`,
          },
        ]);
        setDes(route.params?.items.item_desc);
        GetItemDetails(route.params?.items._id);
      }
    });
  }, []);

  useEffect(() => {
    const subscribe = navigation.addListener("focus", () => {
      if (pageIndex != 1) {
        GetItemDetails(itemId);
      }
    });
  }, [pageIndex]);

  const GetItemDetails = async (id) => {
    console.log("Get ID:::", id);
    const item_id = encodeURIComponent(id);
    const requestBody = `item_id=${item_id}`;
    const response = await GetItemModifier(requestBody);

    console.log("Get Items::", response);
    setAddress(response.items_name);
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
    GetItemDetails(itemId);
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          height: hasNotch() ? PX(35) : PX(10),
          backgroundColor: "#000",
        }}
      />
      <Loader isLoding={loading} />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: PX(130) }}
      >
        <View style={{ paddingHorizontal: PX(20), alignItems: "center" }}>
          <View
            style={[
              styles.headerView,
              { justifyContent: pageIndex == 0 ? "center" : "space-between" },
            ]}
          >
            {pageIndex != 0 && (
              <TouchableOpacity
                onPress={() => navigation.replace("ProfileScreen")}
              >
                <Image
                  style={{
                    height: PX(20),
                    width: PX(20),
                    resizeMode: "contain",
                  }}
                  source={backArrow}
                />
              </TouchableOpacity>
            )}
            <Text style={styles.headerText}>
              {route.params?.from == "edit" ? "Edit Item" : "Add Item"}
            </Text>
            {pageIndex != 0 && (
              <Image
                style={{ height: PX(20), width: PX(20), resizeMode: "contain" }}
              />
            )}
          </View>
          {pageIndex == 1 ? (
            <>
              <TouchableOpacity
                onPress={() => {
                  setImageVisible(true);
                }}
                style={{ width: "100%" }}
              >
                <Image
                  style={[
                    styles.mainImage1,
                    { resizeMode: profile.length == 0 ? "stretch" : "cover" },
                  ]}
                  source={
                    profile.length > 0 ? { uri: profile[0].uri } : uploadBanner
                  }
                />
              </TouchableOpacity>

              <View style={styles.dataView}>
                <Text style={styles.textInputTitle}>Item name</Text>
                <TextInput
                  value={address}
                  onChangeText={(text) => {
                    setAddress(text);
                  }}
                  placeholder="Item name"
                  style={styles.textInputStyle}
                />

                <Text style={styles.textInputTitle1}>Product Category</Text>
                <TouchableOpacity
                  style={styles.textInputStyle}
                  onPress={() => {
                    setCategoryModal(true);
                  }}
                >
                  <Text
                    style={{
                      color: "#848484",
                      fontSize: PX(15),
                      fontFamily: Fonts.FONTS.MontserratMedium,
                    }}
                  >
                    {productType.length} selected
                  </Text>
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <View style={{ width: "48%" }}>
                    <Text style={styles.textInputTitle1}>Category Type</Text>
                    <TouchableOpacity
                      style={styles.textInputStyle}
                      onPress={() => {
                        setProductModal(true);
                      }}
                    >
                      <Text
                        style={{
                          color: "#000",
                          fontSize: PX(15),
                          fontFamily: Fonts.FONTS.MontserratMedium,
                        }}
                      >
                        {product}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{ width: "48%" }}>
                    <Text style={styles.textInputTitle1}>Set Price</Text>
                    <View style={styles.textInputView1}>
                      {city != "" && <Text style={styles.dollarStyle}>$</Text>}
                      <TextInput
                        value={city}
                        onChangeText={(text) => {
                          setCity(text);
                        }}
                        placeholder="$15"
                        keyboardType="number-pad"
                        style={styles.textInputStyle2}
                      />
                    </View>
                  </View>
                </View>

                <Text style={styles.textInputTitle1}>Item Description</Text>
                <TextInput
                  value={des}
                  onChangeText={(text) => {
                    setDes(text);
                  }}
                  placeholder="Description"
                  style={styles.textInputStyle}
                  multiline={true}
                />
              </View>
            </>
          ) : (
            <View
              style={{
                width: "100%",
                paddingVertical: PX(50),
              }}
            >
              <Text style={styles.textInputTitle1}>Item name</Text>
              <Text
                style={{
                  color: "#000",
                  fontSize: PX(15),
                  fontFamily: Fonts.FONTS.MontserratMedium,
                  marginTop: PX(25),
                }}
              >
                {address}
              </Text>
              <FlatList
                data={modifierData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={(item, index) => {
                  return (
                    <>
                      <Text style={styles.textInputTitle1}>Select Group</Text>
                      <View
                        style={{
                          width: "100%",
                          paddingTop: PX(20),
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
                            borderBottomColor: "#C4C4C4",
                            borderBottomWidth: 1,
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
                    </>
                  );
                }}
              />

              {/* <Text style={styles.textInputTitle1}>Select Group</Text>
              <View
                style={{
                  width: '100%',
                  paddingTop: PX(20),
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    width: '60%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottomColor: '#C4C4C4',
                    borderBottomWidth: 1,
                    height: PX(40),
                    paddingHorizontal: PX(10),
                  }}>
                  <Text
                    style={{
                      color: '#2D2D2D',
                      fontSize: PX(14),
                      fontFamily: Fonts.FONTS.MontserratMedium,
                    }}>
                    Extras
                  </Text>
                  <Image
                    style={{
                      width: PX(10),
                      height: PX(10),
                      resizeMode: 'contain',
                    }}
                    source={downArrow}
                  />
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

              <Text
                style={{
                  fontSize: PX(14),
                  fontFamily: Fonts.FONTS.MontserratMedium,
                  color: "#F55800",
                  paddingVertical: PX(50),
                }}
                onPress={() =>
                  navigation.navigate("AddModifier", { itemId: itemId })
                }
              >
                + Add Modifier Group
              </Text>
            </View>
          )}
          <View style={styles.buttonView}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                pageIndex == 2
                  ? navigation.navigate("ItemSuccess", {
                      modifierData: modifierData,
                      itemId: itemId,
                    })
                  : route.params?.from == "edit"
                  ? updateItems()
                  : addItems();
              }}
            >
              <Text style={styles.btnText}>
                {route.params?.from == "edit"
                  ? "Save"
                  : "Done" && pageIndex == 2
                  ? "Done"
                  : "Next"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>

      {productModal && (
        <ProductType
          modalVisible={productModal}
          onRequestClose={() => {
            setProductModal(!productModal);
          }}
          selectedProduct={(item) => {
            setProduct(item);
            setProductModal(!productModal);
          }}
          sendProduct={product}
        />
      )}

      {categoryModal && (
        <CategoryType
          modalVisible={categoryModal}
          onRequestClose={() => {
            setCategoryModal(!categoryModal);
          }}
          selectProductType={(item) => {
            setProductType(item);
          }}
          productType={productType}
        />
      )}

      {modalVisible && (
        <DeletePopup
          modalVisible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}
          deleteOnPress={() => deleteModifier(modifierId)}
          text={"Are you sure you want to delete\nthe modifier from item ?"}
        />
      )}

      {imageVisible && (
        <ImagePopup
          modalVisible={imageVisible}
          onRequestClose={() => {
            setImageVisible(false);
          }}
          takeImageOnPress={() => takeImage()}
          selectImageOnPress={() => selectFile()}
        />
      )}
    </View>
  );
};
