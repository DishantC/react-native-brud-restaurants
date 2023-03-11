import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  PermissionsAndroid,
  Platform,
  Modal,
  Keyboard,
  Alert,
} from "react-native";
import styles from "./styles";
import { PX } from "../../Components/Pixel/index";
import { hasNotch } from "react-native-device-info";
import logo from "../../Assets/logo1.png";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import firstStep from "../../Assets/shop-outline.png";
import uploadBanner from "../../Assets/uploadbanner.png";
import open from "../../Assets/open.png";
import CountryPicker, { DARK_THEME } from "react-native-country-picker-modal";
import backArrow from "../../Assets/backArrow.png";
import calendar from "../../Assets/calendar.png";
import {
  CafeProfileApi,
  SetupCafeApi,
  UploadImage,
  TimeData,
} from "../../services/Api";
import { Loader } from "../../Components/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GetLocation from "react-native-get-location";
import MapView, { Marker } from "react-native-maps";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import ImagePopup from "../../Components/ImagePopup";
import TimePopup from "../../Components/TimePopup";
import MapboxGL from "@react-native-mapbox-gl/maps";
import ImagePicker from "react-native-image-crop-picker";
import map from "../../Assets/map.png";
import { Fonts } from "../../utils";
import downArrow from "../../Assets/downArrow.png";
import search from "../../Assets/search.png";
import addressMap from "../../Assets/addressMap.png";

const Array1 = [
  {
    name: "Sunday",
    time: "",
    start: "",
    end: "",
  },
  {
    name: "Monday",
    time: "",
    start: "",
    end: "",
  },
  {
    name: "Tuesday",
    time: "",
    start: "",
    end: "",
  },
  {
    name: "Wednesday",
    time: "",
    start: "",
    end: "",
  },
  {
    name: "Thursday",
    time: "",
    start: "",
    end: "",
  },
  {
    name: "Friday",
    time: "",
    start: "",
    end: "",
  },
  {
    name: "Saturday",
    time: "",
    start: "",
    end: "",
  },
];

let data = [
  {
    label: "Alabama",
    value: "Alabama",
  },
  {
    label: "Alaska",
    value: "Alaska",
  },
  {
    label: "Arizona",
    value: "Arizona",
  },
  {
    label: "Arkansas",
    value: "Arkansas",
  },
  {
    label: "California",
    value: "California",
  },
  {
    label: "Colorado",
    value: "Colorado",
  },
  {
    label: "Connecticut",
    value: "Connecticut",
  },
  {
    label: "Delaware",
    value: "Delaware",
  },
  {
    label: "Florida",
    value: "Florida",
  },
  {
    label: "Georgia",
    value: "Georgia",
  },
  {
    label: "Hawaii",
    value: "Hawaii",
  },
  {
    label: "Idaho",
    value: "Idaho",
  },
  {
    label: "Illinois",
    value: "Illinois",
  },
  {
    label: "Indiana",
    value: "Indiana",
  },
  {
    label: "Iowa",
    value: "Iowa",
  },
  {
    label: "Kansas",
    value: "Kansas",
  },
  {
    label: "Kentucky[D]",
    value: "Kentucky[D]",
  },
  {
    label: "Louisiana",
    value: "Louisiana",
  },
  {
    label: "Maine",
    value: "Maine",
  },
  {
    label: "Maryland",
    value: "Maryland",
  },
  {
    label: "Massachusetts",
    value: "Massachusetts[D]",
  },
  {
    label: "Michigan",
    value: "Michigan",
  },
  {
    label: "Minnesota",
    value: "Minnesota",
  },
  {
    label: "Mississippi",
    value: "Mississippi",
  },
  {
    label: "Missouri",
    value: "Missouri",
  },
  {
    label: "Montana",
    value: "Montana",
  },
  {
    label: "Nebraska",
    value: "Nebraska",
  },
  {
    label: "Nevada",
    value: "Nevada",
  },
  {
    label: "New Hampshire",
    value: "New Hampshire",
  },
  {
    label: "New Jersey",
    value: "New Jersey",
  },
  {
    label: "New Mexico",
    value: "New Mexico",
  },
  {
    label: "New York",
    value: "New York",
  },
  {
    label: "North Carolina",
    value: "North Carolina",
  },
  {
    label: "North Dakota",
    value: "North Dakota",
  },
  {
    label: "Ohio",
    value: "Ohio",
  },
  {
    label: "Oklahoma",
    value: "Oklahoma",
  },
  {
    label: "Oregon",
    value: "Oregon",
  },
  {
    label: "Pennsylvania",
    value: "Pennsylvania[D]",
  },
  {
    label: "Rhode Island",
    value: "Rhode Island",
  },
  {
    label: "South Carolina",
    value: "South Carolina",
  },
  {
    label: "South Dakota",
    value: "South Dakota",
  },
  {
    label: "Tennessee",
    value: "Tennessee",
  },
  {
    label: "Texas",
    value: "Texas",
  },
  {
    label: "Utah",
    value: "Utah",
  },
  {
    label: "Vermont",
    value: "Vermont",
  },
  {
    label: "Virginia",
    value: "Virginia[D]",
  },
  {
    label: "Washington",
    value: "Washington",
  },
  {
    label: "West Virginia",
    value: "West Virginia",
  },
  {
    label: "Wisconsin",
    value: "Wisconsin",
  },
  {
    label: "Wyoming",
    value: "Wyoming",
  },
];

const mapBox_token =
  "pk.eyJ1IjoiYnJ1ZHJld2FyZHMiLCJhIjoiY2wwMGYwZWduMGoyajNkbmY0ZGo2NDR5bSJ9.fBDDTBfSZ5GC8pSYyP41BQ";

export const AddCustomer = ({ navigation, route }) => {
  const [pageIndex, setPageIndex] = useState(0);
  const [name, setName] = useState("");
  const [managerName, setManagerName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [countryName, setcountryName] = useState("US");
  const [countryCode, setcountryCode] = useState("+1");
  const [Value, setValue] = useState(null);
  const [address, setAddress] = useState("");
  const [state, setState] = useState("Alabama");
  const [city, setCity] = useState("");
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const [email, setEmail] = useState("");
  const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mapVisible, setMapVisible] = useState(false);
  const [imageVisible, setImageVisible] = useState(false);
  const [timeVisible, setTimeVisible] = useState(false);
  const [index, setIndex] = useState(0);
  const [timingData, setTimingData] = useState(Array1);
  const [images, setImages] = useState([]);
  const [about, setAbout] = useState("");
  const [stateModal, setStateModal] = useState(false);
  const [backValue, setBackValue] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [AllData, setAllData] = useState([]);
  const ref_ResName = useRef();
  const ref_managerName = useRef();
  const ref_email = useRef();
  const ref_mobileNumber = useRef();
  const ref_fullAddress = useRef();
  const ref_city = useRef();
  const ref_des = useRef();

  MapboxGL.setAccessToken(mapBox_token);

  const onCountrySelect = (country) => {
    setcountryName(country.cca2);
    setcountryCode("+" + country.callingCode[0]);
  };

  useEffect(() => {
    // dataGet()
    const subscribe = navigation.addListener("focus", () => {
      dataGet();
    });
  }, []);

  const onSearch = async (test) => {
    setSearchText(test);
    try {
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${test}.json?access_token=pk.eyJ1IjoiYnJ1ZHJld2FyZHMiLCJhIjoiY2wwMGYwZWduMGoyajNkbmY0ZGo2NDR5bSJ9.fBDDTBfSZ5GC8pSYyP41BQ`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          setAllData(result.features);
          console.log("Get Error::", result.features[0].center[0]);
          console.log("Get Error::", result.features[0].center[1]);
        })
        .catch((error) => console.log("error", error));
    } catch (err) {
      console.log("Get Error::", err);
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
          var filename = image.path.substring(image.path.lastIndexOf("/") + 1);
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

  const selectedDate = (mode) => {
    setTimeVisible(false);
    if (mode?.time) {
      timingData[index].time = mode.time;
      timingData[index].start = mode.start;
      timingData[index].end = mode.end;
    } else {
      timingData[index].time = mode;
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

  const getCurrentLocation = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then((location) => {
        console.log(location);
      })
      .catch((error) => {
        const { code, message } = error;
        console.warn(code, message);
      });
  };

  const getFullAddress = async (long, lat) => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/Market%20Street%20and%20Fremont%20Street.json?types=address&proximity=${parseFloat(
        long
      )},${parseFloat(lat)}&access_token=${mapBox_token}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  const dataGet = async () => {
    setLoading(true);
    const id1 = await AsyncStorage.getItem("id");
    const id = encodeURIComponent(id1);
    const requestBody = `id=${id}`;
    const response = await CafeProfileApi(requestBody);
    if (!response.sucecess) {
      setLoading(false);
      alert(response.message);
    } else {
      setLoading(false);
      setName(response.data.restaurant_name);
      setManagerName(response.data.manager_name);

      let newText = "";
      let cleaned = ("" + response.data.phone_number).replace(/\D/g, "");
      for (var i = 0; i < cleaned.length; i++) {
        if (i == 3) {
          newText = newText + "-";
        } else if (i == 6) {
          newText = newText + "-";
        }
        newText = newText + cleaned[i];
      }
      setValue(newText);
      setAddress(response.data.full_address);
      setState(response.data.state);
      setCity(response.data.city);
      setLat(response.data.lattitude);
      setLong(response.data.longitude);
      setEmail(response.data.email);
      setAbout(response.data.about);
      getFullAddress(response.data.longitude, response.data.lattitude);

      response.data?.images.map((item, index) => {
        var filename = item.substring(item.lastIndexOf("/") + 1);
        images.push({ uri: item, fileName: filename });
      });
      setcountryCode("+" + response.data.country_code);
      var filename = response.data.image.substring(
        response.data.image.lastIndexOf("/") + 1
      );
      var type = response.data.image.substring(
        response.data.image.lastIndexOf(".") + 1
      );
      setProfile([
        {
          uri: response.data.image,
          fileName: filename,
          type: `image/${type}`,
        },
      ]);
      if (response?.data?.cafe_timing[0]?.sunday?.time == "custom") {
        (timingData[0].time = response.data?.cafe_timing[0]?.sunday?.time),
          (timingData[0].start = response.data?.cafe_timing[0]?.sunday?.start),
          (timingData[0].end = response.data?.cafe_timing[0]?.sunday?.end);
      } else {
        timingData[0].time = response.data?.cafe_timing[0]?.sunday?.time;
      }

      if (response.data?.cafe_timing[0]?.monday?.time == "custom") {
        (timingData[1].time = response.data?.cafe_timing[0]?.monday?.time),
          (timingData[1].start = response.data?.cafe_timing[0]?.monday?.start),
          (timingData[1].end = response.data?.cafe_timing[0]?.monday?.end);
      } else {
        timingData[1].time = response.data?.cafe_timing[0]?.monday?.time;
      }

      if (response.data?.cafe_timing[0]?.tuesday?.time == "custom") {
        (timingData[2].time = response.data?.cafe_timing[0]?.tuesday?.time),
          (timingData[2].start = response.data?.cafe_timing[0]?.tuesday?.start),
          (timingData[2].end = response.data?.cafe_timing[0]?.tuesday?.end);
      } else {
        timingData[2].time = response.data?.cafe_timing[0]?.tuesday?.time;
      }

      if (response.data?.cafe_timing[0]?.wednesday?.time == "custom") {
        (timingData[3].time = response.data?.cafe_timing[0]?.wednesday?.time),
          (timingData[3].start =
            response.data?.cafe_timing[0]?.wednesday?.start),
          (timingData[3].end = response.data?.cafe_timing[0]?.wednesday?.end);
      } else {
        timingData[3].time = response.data?.cafe_timing[0]?.wednesday?.time;
      }

      if (response.data?.cafe_timing[0]?.thursday?.time == "custom") {
        (timingData[4].time = response.data?.cafe_timing[0]?.thursday?.time),
          (timingData[4].start =
            response.data?.cafe_timing[0]?.thursday?.start),
          (timingData[4].end = response.data?.cafe_timing[0]?.thursday?.end);
      } else {
        timingData[4].time = response.data?.cafe_timing[0]?.thursday?.time;
      }

      if (response.data?.cafe_timing[0]?.friday?.time == "custom") {
        (timingData[5].time = response.data?.cafe_timing[0]?.friday?.time),
          (timingData[5].start = response.data?.cafe_timing[0]?.friday?.start),
          (timingData[5].end = response.data?.cafe_timing[0]?.friday?.end);
      } else {
        timingData[5].time = response.data?.cafe_timing[0]?.friday?.time;
      }

      if (response.data?.cafe_timing[0]?.saturday?.time == "custom") {
        (timingData[6].time = response.data?.cafe_timing[0]?.saturday?.time),
          (timingData[6].start =
            response.data?.cafe_timing[0]?.saturday?.start),
          (timingData[6].end = response.data?.cafe_timing[0]?.saturday?.end);
      } else {
        timingData[6].time = response.data?.cafe_timing[0]?.saturday?.time;
      }
    }
  };

  const onProfileApi = async () => {
    if (name == "") {
      Alert.alert("Registration", "Please Enter Restaurant Name.");
    } else if (managerName == "") {
      Alert.alert("Registration", "Please Enter Manager Name.");
    } else if (Value == "") {
      Alert.alert("Registration", "Please Enter Mobile Number.");
    } else if (Value.length != 12) {
      Alert.alert("Registration", "Please Enter Valid Mobile Number.");
    } else {
      try {
        const id1 = await AsyncStorage.getItem("id");
        console.log("Get ID::", id1);
        setLoading(true);
        let sun = [];
        let mon = [];
        let tue = [];
        let wed = [];
        let thus = [];
        let fri = [];
        let sat = [];

        if (timingData[0].time == "custom") {
          sun = [
            {
              time: timingData[0].time,
              start: timingData[0].start,
              end: timingData[0].end,
            },
          ];
        } else {
          sun = [{ time: timingData[0].time }];
        }

        if (timingData[1].time == "custom") {
          mon = [
            {
              time: timingData[1].time,
              start: timingData[1].start,
              end: timingData[1].end,
            },
          ];
        } else {
          mon = [{ time: timingData[1].time }];
        }

        if (timingData[2].time == "custom") {
          tue = [
            {
              time: timingData[2].time,
              start: timingData[2].start,
              end: timingData[2].end,
            },
          ];
        } else {
          tue = [{ time: timingData[2].time }];
        }

        if (timingData[3].time == "custom") {
          wed = [
            {
              time: timingData[3].time,
              start: timingData[3].start,
              end: timingData[3].end,
            },
          ];
        } else {
          wed = [{ time: timingData[3].time }];
        }

        if (timingData[4].time == "custom") {
          thus = [
            {
              time: timingData[4].time,
              start: timingData[4].start,
              end: timingData[4].end,
            },
          ];
        } else {
          thus = [{ time: timingData[4].time }];
        }

        if (timingData[5].time == "custom") {
          fri = [
            {
              time: timingData[5].time,
              start: timingData[5].start,
              end: timingData[5].end,
            },
          ];
        } else {
          fri = [{ time: timingData[5].time }];
        }

        if (timingData[6].time == "custom") {
          sat = [
            {
              time: timingData[6].time,
              start: timingData[6].start,
              end: timingData[6].end,
            },
          ];
        } else {
          sat = [{ time: timingData[6].time }];
        }

        const id2 = encodeURIComponent(id1);
        const sunday = encodeURIComponent(JSON.stringify(sun));
        const monday = encodeURIComponent(JSON.stringify(mon));
        const tuesday = encodeURIComponent(JSON.stringify(tue));
        const wednesday = encodeURIComponent(JSON.stringify(wed));
        const thursday = encodeURIComponent(JSON.stringify(thus));
        const friday = encodeURIComponent(JSON.stringify(fri));
        const saturday = encodeURIComponent(JSON.stringify(sat));

        const request = `id=${id2}&sunday=${sunday}&monday=${monday}&tuesday=${tuesday}&wednesday=${wednesday}&thursday=${thursday}&friday=${friday}&saturday=${saturday}`;
        console.log("Sunday>>>>>>>", id1);

        const responses = await TimeData(request);
        console.log("Get Response::", responses);

        var formdata = new FormData();
        formdata.append("image", {
          name: profile[0]?.fileName,
          uri: profile[0]?.uri,
          type: profile[0]?.type,
        });

        const imagePath = await UploadImage(formdata);

        let arrayImage = [];
        images?.map((item, index) => {
          arrayImage.push(item.fileName);
        });
        if (arrayImage.length == 0) {
          alert("Please select restaurant banner images.");
        } else {
          let num = Value.replace("-", "");
          let num2 = num.replace("-", "");
          console.log("Get Numbers:::", num2);
          const id = encodeURIComponent(id1);
          const restaurant_name = encodeURIComponent(name);
          const manager_name = encodeURIComponent(managerName);
          const country_code = encodeURIComponent(countryCode);
          const phone_number = encodeURIComponent(num2);
          const full_address = encodeURIComponent(address);
          const City = encodeURIComponent(city);
          const State = encodeURIComponent(state);
          const lattitude = encodeURIComponent(lat);
          const longitude = encodeURIComponent(long);
          const image = encodeURIComponent(imagePath.data.filepath_url);
          const abouts = encodeURIComponent(about);
          const images1 = encodeURIComponent(arrayImage);

          const requestBody = `id=${id}&restaurant_name=${restaurant_name}&manager_name=${manager_name}&country_code=${country_code}&phone_number=${phone_number}&full_address=${full_address}&city=${City}&state=${State}&lattitude=${lattitude}&longitude=${longitude}&image=${image}&about=${abouts}&images=${images1}`;

          const res = await SetupCafeApi(requestBody);
          if (!res.sucecess) {
            setLoading(false);
            alert(res.message);
          } else {
            setLoading(false);
            alert(res.message);
            setPageIndex(0);
          }
        }
      } catch (err) {
        setLoading(false);
        console.log("Get Response:::", err);
      }
    }
  };

  const selectFile1 = async () => {
    setImageVisible(false);
    let options = {
      mediaType: "photo",
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    launchImageLibrary(options, async (response) => {
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

      var formdata = new FormData();
      formdata.append("image", {
        name: response.assets[0]?.fileName,
        uri: response.assets[0]?.uri,
        type: response.assets[0]?.type,
      });

      const imagePath = await UploadImage(formdata);
      images.push({
        uri: imagePath.data?.url,
        fileName: imagePath.data?.filepath_url,
      });
      setLoading(false);
    });
  };

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={[
          styles.itemView,
          { borderBottomWidth: timingData?.length - 1 == index ? 0 : 0.5 },
        ]}
      >
        <View style={styles.viewList}>
          <View
            style={{
              height: 35,
              width: 35,
              borderRadius: 35,
              backgroundColor:
                item.time == "Open 24 hours"
                  ? "rgba(55, 129, 252,0.2)"
                  : item.time == "Closed"
                  ? "rgba(255, 85, 85,0.2)"
                  : "rgba(103, 193, 23,0.2)",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              style={[
                styles.bagImage,
                {
                  tintColor:
                    item.time == "Open 24 hours"
                      ? "#3781FC"
                      : item.time == "Closed"
                      ? "#FF5555"
                      : "#67C117",
                },
              ]}
              source={calendar}
            />
          </View>
        </View>
        <View style={styles.subView}>
          <View>
            <Text style={styles.nameText}>{item.name}</Text>
            <Text style={styles.statusText}>
              {item.time == "custom"
                ? `Open at ${item.start} - ${item.end}`
                : `${item.time}`}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.changeButton}
            onPress={() => {
              setTimeVisible(true), setIndex(index);
            }}
          >
            <Text style={styles.changeText}>Change</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  const renderItem1 = ({ item, index }) => {
    return (
      <View style={styles.ImageRenderView}>
        <Image style={styles.renderImage} source={{ uri: item.uri }} />
      </View>
    );
  };

  const phoneNumberString = async (text) => {
    let newText = "";
    let cleaned = ("" + text).replace(/\D/g, "");
    for (var i = 0; i < cleaned.length; i++) {
      if (i == 3) {
        newText = newText + "-";
      } else if (i == 6) {
        newText = newText + "-";
      }
      newText = newText + cleaned[i];
    }
    setValue(newText);
    if (cleaned.length == 10) {
      Keyboard.dismiss();
      // ref_ResName.current.focus()
    }
  };

  const onclickMap = (item) => {
    setLong(item.center[0]);
    setLat(item.center[1]);
    setSearchText("");
  };

  const renderItem2 = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={{
          width: "95%",
          marginLeft: PX(10),
          height: PX(60),
        }}
        onPress={() => onclickMap(item)}
      >
        <Text
          style={{
            fontSize: PX(12),
            fontFamily: "Montserrat-Regular",
            color: "#000",
          }}
        >
          {item.place_name}
        </Text>
      </TouchableOpacity>
    );
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
      {mapVisible ? (
        <>
          <MapboxGL.MapView style={styles.map} onPress={(res) => {}}>
            <MapboxGL.Camera
              // draggable={true}
              zoomLevel={6}
              centerCoordinate={[parseFloat(lat), parseFloat(long)]}
            />
            <MapboxGL.PointAnnotation
              id={"pointAnnotation"}
              coordinate={[parseFloat(lat), parseFloat(long)]}
              draggable={true}
              onDragEnd={(e) => {
                console.log("dragEnd", parseFloat(lat), parseFloat(long));
                console.log("dragEnd", e.geometry.coordinates[0]);
                setLat(JSON.stringify(e.geometry.coordinates[0]));
                setLong(JSON.stringify(e.geometry.coordinates[1]));
              }}
            />
          </MapboxGL.MapView>
          <View
            style={{
              position: "absolute",
              height: PX(60),
              width: "85%",
              marginTop: PX(50),
              alignSelf: "center",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View
              style={{
                height: PX(50),
                width: "100%",
                borderRadius: PX(10),
                backgroundColor: "#fff",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Image
                style={{ height: PX(20), width: PX(20), resizeMode: "contain" }}
                source={search}
              />
              <TextInput
                value={searchText}
                onChangeText={(text) => onSearch(text)}
                placeholder="search area street name"
                placeholderTextColor={"#C4C4C4"}
                style={{
                  marginLeft: PX(10),
                  width: "70%",
                  fontSize: PX(16),
                  color: "#C4C4C4",
                }}
              />
              <Image
                style={{
                  height: PX(20),
                  width: PX(20),
                  resizeMode: "contain",
                  marginLeft: PX(10),
                }}
                source={addressMap}
              />
              {searchText != "" && (
                <View
                  style={{
                    height: PX(300),
                    width: "100%",
                    backgroundColor: "#fff",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "absolute",
                    top: PX(45),
                  }}
                >
                  <FlatList
                    data={AllData}
                    renderItem={renderItem2}
                    keyExtractor={(item, index) => index.toString()}
                  />
                </View>
              )}
            </View>
          </View>
        </>
      ) : (
        <>
          <View style={{ paddingHorizontal: PX(20), alignItems: "center" }}>
            <View
              style={[styles.headerView, { justifyContent: "space-between" }]}
            >
              <TouchableOpacity
                onPress={() => {
                  backValue
                    ? [setPageIndex(0), setBackValue(false)]
                    : pageIndex != 0
                    ? setPageIndex(pageIndex - 1)
                    : navigation.goBack();
                }}
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
              <Text style={styles.headerText}>Edit Cafe</Text>
              <Image
                style={{ height: PX(20), width: PX(20), resizeMode: "contain" }}
              />
            </View>
          </View>

          {pageIndex == 0 ? (
            <KeyboardAwareScrollView
              showsVerticalScrollIndicator={false}
              behavior="padding"
              contentContainerStyle={{
                paddingBottom: pageIndex == 2 ? PX(150) : PX(200),
              }}
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  height: "30%",
                }}
              >
                <Image
                  source={require("../../Assets/main.png")}
                  style={{
                    borderRadius: 50,
                    width: 99,
                    height: 99,
                    borderWidth: PX(3),
                    borderColor: "#ffff",
                  }}
                />
                <View
                  style={{
                    position: "absolute",
                    right: PX(170),
                    bottom: PX(53),
                    width: PX(21),
                    height: PX(21),
                    backgroundColor: "#ffffff",
                    borderRadius: PX(10),
                    justifyContent: "center",
                    alignItems: "center",
                    borderColor: "#000",
                    borderWidth: 0.2,
                  }}
                >
                  <Image
                    source={require("../../Assets/camero.png")}
                    style={{
                      width: PX(11.06),
                      height: PX(8.85),
                    }}
                  />
                </View>
              </View>
              <View
                style={{
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <View style={styles.dataView}>
                  <Text style={styles.textInputTitle}>
                    Enter Restaurant Name
                  </Text>
                  <TextInput
                    ref={ref_ResName}
                    value={name}
                    onChangeText={(text) => {
                      setName(text);
                    }}
                    placeholder="Book Cafe"
                    style={styles.textInputStyle}
                    returnKeyType={"next"}
                    onSubmitEditing={() => ref_managerName.current.focus()}
                  />

                  <Text style={styles.textInputTitle1}>Manager full Name</Text>
                  <TextInput
                    ref={ref_managerName}
                    value={managerName}
                    onChangeText={(text) => {
                      setManagerName(text);
                    }}
                    placeholder="Doron  Eliezer"
                    style={styles.textInputStyle}
                    returnKeyType={"next"}
                    onSubmitEditing={() => ref_email.current.focus()}
                  />

                  <Text style={styles.textInputTitle1}>Email Id</Text>
                  <TextInput
                    ref={ref_email}
                    value={email}
                    onChangeText={(text) => {
                      setEmail(text);
                    }}
                    placeholder="Doron  Eliezer"
                    style={styles.textInputStyle}
                    editable={false}
                    returnKeyType={"next"}
                    onSubmitEditing={() => ref_mobileNumber.current.focus()}
                  />

                  <Text style={styles.textInputTitle1}>Phone Number</Text>

                  <View style={styles.textInputView1}>
                    <View style={[styles.imageView1, { flexDirection: "row" }]}>
                      <Image
                        style={{
                          height: PX(25),
                          width: PX(22),
                          resizeMode: "contain",
                        }}
                        source={require("../../Assets/flag.png")}
                      />
                      <Text
                        style={{
                          fontFamily: Fonts.FONTS.MontserratRegular,
                          fontSize: PX(14),
                          marginLeft: PX(5),
                          color: "#000",
                        }}
                      >
                        +1
                      </Text>
                      <Image style={styles.Images} source={downArrow} />
                    </View>
                    <TextInput
                      ref={ref_mobileNumber}
                      value={Value}
                      onChangeText={(text) => phoneNumberString(text)}
                      style={styles.TextInputStyle1}
                      placeholder={"Mobile Number"}
                      keyboardType={"decimal-pad"}
                      // returnKeyType={'next'}
                      maxLength={14}
                    />
                  </View>
                </View>
                <TouchableOpacity
                  style={{ marginTop: PX(15) }}
                  onPress={() => {
                    setPageIndex(2), setBackValue(true);
                  }}
                >
                  <Text style={styles.hours}>Set Operational Hours</Text>
                </TouchableOpacity>

                <View
                  style={{
                    width: "100%",
                    backgroundColor: "#fff",
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 1,
                    },
                    shadowOpacity: 0.22,
                    shadowRadius: 2.22,

                    elevation: 3,
                    height: "23%",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: PX(30),
                  }}
                >
                  <TouchableOpacity
                    style={styles.Button}
                    onPress={() => {
                      setPageIndex(1);
                    }}
                  >
                    <Text style={styles.BtnText}>Done</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </KeyboardAwareScrollView>
          ) : (
            <>
              {pageIndex == 1 ? (
                <KeyboardAwareScrollView
                  showsVerticalScrollIndicator={false}
                  behavior="padding"
                  contentContainerStyle={{ paddingBottom: PX(300) }}
                >
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      height: "33%",
                    }}
                  >
                    <Image
                      source={
                        profile.length > 0
                          ? { uri: profile[0].uri }
                          : require("../../Assets/cafeImage.png")
                      }
                      style={{
                        borderRadius: PX(15),
                        width: PX(351),
                        height: PX(182),
                      }}
                    />
                    <TouchableOpacity
                      style={{
                        position: "absolute",
                        right: "47%",
                        bottom: PX(22),
                        width: PX(23),
                        height: PX(23),
                        backgroundColor: "#ffffff",
                        borderRadius: PX(23),
                        justifyContent: "center",
                        alignItems: "center",
                        borderColor: "#000",
                        borderWidth: 0.5,
                      }}
                      onPress={() => {
                        setImageVisible(true);
                      }}
                    >
                      <Image
                        source={require("../../Assets/camero.png")}
                        style={{
                          width: PX(11.06),
                          height: PX(8.85),
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <View style={styles.dataView}>
                      <Text style={styles.textInputTitle}>Images</Text>
                      <ScrollView horizontal>
                        <FlatList
                          data={images}
                          renderItem={renderItem1}
                          keyExtractor={(item, index) => index.toString()}
                          horizontal
                          scrollEnabled={false}
                        />
                        <TouchableOpacity
                          style={{
                            height: PX(50),
                            width: PX(60),
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                          onPress={() => selectFile1()}
                        >
                          <Image
                            style={{
                              height: PX(40),
                              width: PX(40),
                              resizeMode: "contain",
                            }}
                            source={require("../../Assets/add.png")}
                          />
                        </TouchableOpacity>
                      </ScrollView>

                      <Text style={styles.textInputTitle1}>Street Address</Text>
                      <TextInput
                        ref={ref_fullAddress}
                        value={address}
                        onChangeText={(text) => {
                          setAddress(text);
                        }}
                        placeholder="Book Cafe"
                        style={styles.textInputStyle}
                        returnKeyType="next"
                        onSubmitEditing={() => ref_city.current.focus()}
                      />

                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                          width: "100%",
                        }}
                      >
                        <View style={{ width: "48%" }}>
                          <Text style={styles.textInputTitle1}>State</Text>
                          <TouchableOpacity
                            style={{
                              width: "100%",
                              borderBottomColor: "#C4C4C4",
                              borderBottomWidth: 1,
                              paddingTop: PX(27),
                              paddingBottom: PX(10),
                            }}
                            onPress={() => {
                              setStateModal(!stateModal);
                            }}
                          >
                            <Text style={styles.textState}>{state}</Text>
                          </TouchableOpacity>
                        </View>
                        <View style={{ width: "48%" }}>
                          <Text style={styles.textInputTitle1}>City</Text>
                          <TextInput
                            ref={ref_city}
                            value={city}
                            onChangeText={(text) => {
                              setCity(text);
                            }}
                            placeholder="Los Angeles"
                            style={styles.textInputStyle}
                            returnKeyType={"next"}
                            onSubmitEditing={() => ref_des.current.focus()}
                          />
                        </View>
                      </View>
                      <Text
                        style={styles.locationText}
                        onPress={() => {
                          setMapVisible(true);
                        }}
                      >
                        Get Locations
                      </Text>

                      <Text style={styles.textInputTitle1}>About</Text>
                      <TextInput
                        ref={ref_des}
                        value={about}
                        onChangeText={(text) => {
                          setAbout(text);
                        }}
                        placeholder="Enter Description"
                        multiline={true}
                        style={styles.textInputStyle}
                      />
                    </View>
                    <View
                      style={{
                        width: "100%",
                        backgroundColor: "#fff",

                        height: "25%",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <TouchableOpacity
                        style={styles.Button1}
                        onPress={() => {
                          setPageIndex(2);
                        }}
                      >
                        <Text style={styles.BtnText}>Save</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </KeyboardAwareScrollView>
              ) : (
                <>
                  {pageIndex == 2 && (
                    <ScrollView
                      showsVerticalScrollIndicator={false}
                      contentContainerStyle={{ paddingBottom: PX(150) }}
                    >
                      <View
                        style={{
                          width: "100%",
                          paddingTop: PX(20),
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <FlatList
                          data={timingData}
                          renderItem={renderItem}
                          keyExtractor={(item, index) => index.toString()}
                          showsVerticalScrollIndicator={false}
                          scrollEnabled={false}
                        />
                      </View>
                      <View
                        style={{
                          width: "100%",
                          backgroundColor: "#fff",
                          shadowColor: "#000",
                          shadowOffset: {
                            width: 0,
                            height: 3,
                          },
                          shadowOpacity: 0.27,
                          shadowRadius: 4.65,

                          elevation: 6,
                          height: "20%",
                          alignItems: "center",
                          justifyContent: "center",
                          marginTop: PX(20),
                        }}
                      >
                        <TouchableOpacity
                          style={styles.Button1}
                          onPress={() => onProfileApi()}
                        >
                          <Text style={styles.BtnText}>Save</Text>
                        </TouchableOpacity>
                      </View>
                    </ScrollView>
                  )}
                </>
              )}
            </>
          )}
        </>
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

      {mapVisible ? (
        <TouchableOpacity
          onPress={() => {
            setMapVisible(false);
          }}
          style={{
            position: "absolute",
            bottom: PX(130),
            right: PX(30),
            width: PX(100),
            height: PX(50),
            backgroundColor: "#F55800",
            borderRadius: PX(5),
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontFamily: Fonts.FONTS.MontserratMedium,
              fontSize: PX(16),
              color: "#fff",
            }}
          >
            Confirm
          </Text>
        </TouchableOpacity>
      ) : null}

      {timeVisible && (
        <TimePopup
          modalVisible={timeVisible}
          onRequestClose={() => {
            setTimeVisible(false);
          }}
          mode={(mode) => selectedDate(mode)}
        />
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={stateModal}
        onRequestClose={() => {
          setStateModal(false);
        }}
      >
        <View style={styles.centeredView1}>
          <View
            style={{
              height: "100%",
              width: "100%",
              backgroundColor: "#fff",
              marginTop: hasNotch() ? PX(35) : 0,
            }}
          >
            <View
              style={{
                width: "94%",
                alignSelf: "center",
                marginVertical: PX(10),
                alignItems: "flex-end",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setStateModal(false);
                }}
              >
                <Image
                  style={{
                    height: PX(35),
                    width: PX(40),
                    resizeMode: "contain",
                    tintColor: "#000",
                  }}
                  source={require("../../Assets/cross.png")}
                />
              </TouchableOpacity>
            </View>

            <FlatList
              data={data}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
                    style={{
                      height: PX(60),
                      borderBottomColor: "#828282",
                      borderBottomWidth: 1,
                      width: "100%",
                      paddingHorizontal: PX(30),
                      justifyContent: "center",
                    }}
                    onPress={() => {
                      setStateModal(false), setState(item.value);
                    }}
                  >
                    <Text style={styles.stateText1}>{item.label}</Text>
                  </TouchableOpacity>
                );
              }}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: PX(100) }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};
