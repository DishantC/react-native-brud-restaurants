import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import styles from './styles';
import {PX} from '../../Components/Pixel/index';
import balancecard from '../../Assets/balancecard.png';
import {Fonts} from '../../utils';
import {hasNotch} from 'react-native-device-info';
import calendar from '../../Assets/calendar.png';
import {orderEarningApi} from '../../services/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Loader} from '../../Components/Loader';
import moment, {parseZone} from 'moment';
import CalendarPicker from 'react-native-calendar-picker';

const array = [
  {
    num: '#5245789',
    date: '10-12-2021, 10:45 am',
    status: 'Anderw Peter',
    balance: '$62',
    card: 'Credit Card',
  },
  {
    num: '#5245789',
    date: '10-12-2021, 10:45 am',
    status: 'Anderw Peter',
    balance: '$62',
    card: 'Credit Card',
  },
  {
    num: '#5245789',
    date: '10-12-2021, 10:45 am',
    status: 'Anderw Peter',
    balance: '$62',
    card: 'Credit Card',
  },
  {
    num: '#5245789',
    date: '10-12-2021, 10:45 am',
    status: 'Anderw Peter',
    balance: '$62',
    card: 'Credit Card',
  },
  {
    num: '#5245789',
    date: '10-12-2021, 10:45 am',
    status: 'Anderw Peter',
    balance: '$62',
    card: 'Credit Card',
  },
  {
    num: '#5245789',
    date: '10-12-2021, 10:45 am',
    status: 'Anderw Peter',
    balance: '$62',
    card: 'Credit Card',
  },
  {
    num: '#5245789',
    date: '10-12-2021, 10:45 am',
    status: 'Anderw Peter',
    balance: '$62',
    card: 'Credit Card',
  },
  {
    num: '#5245789',
    date: '10-12-2021, 10:45 am',
    status: 'Anderw Peter',
    balance: '$62',
    card: 'Credit Card',
  },
];

export const NotificationScreen = ({navigation, route}) => {
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [selectedStartDate, setSelectedStartDate] = useState(
    moment(new Date().setDate(new Date().getDate() - 15)).format(
      'MMM DD, YYYY',
    ),
  );
  const [selectedEndDate, setSelectedEndDate] = useState(
    moment(new Date()).format('MMM DD, YYYY'),
  );
  const [dateModal, setDateModal] = useState(false);
  const minDate = new Date(2017, 6, 3); // Today
  const maxDate = new Date();
  const startDate = selectedStartDate ? selectedStartDate.toString() : '';
  const endDate = selectedEndDate ? selectedEndDate.toString() : '';
  useEffect(() => {
    const subscribe = navigation.addListener('focus', () => {
      orderList();
    });
  }, []);

  const orderList = async () => {
    try {
      setLoading(true);
      let orderItem = [];
      const id1 = await AsyncStorage.getItem('id');

      const restaurant_id = encodeURIComponent(id1);
      const start_date = encodeURIComponent('-');
      const end_date = encodeURIComponent('-');
      const requestBody = `restaurant_id=${restaurant_id}&start_date=${start_date}&end_date=${end_date}`;
      const response = await orderEarningApi(requestBody);
      if (response.sucecess) {
        setLoading(false);

        setTotalRevenue(response.totalEarn);
        let dataTotal = 0;
        await response?.data?.map((item, index) => {
          console.log('parseFloat(item.total)',parseFloat(item.total));
          console.log(
            'Get ID::',
            new Date(selectedStartDate),
            new Date(item.createdAt),
          );
          if (
            new Date(selectedStartDate) < new Date(item.createdAt) &&
            new Date(selectedEndDate) > new Date(item.createdAt)
          ) {
            dataTotal = dataTotal + parseFloat(item.total);
            orderItem.push(item);
          }
        }),
          setTotalAmount(dataTotal);
        setOrderData(orderItem.reverse());
      } else {
        setLoading(false);
        Alert.alert(' ', response.message);
      }
    } catch (err) {
      setLoading(false);
      console.log('Error::::', err);
      alert('Server issue.');
    }
  };

  const renderItem = ({item, index}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: PX(20),
          borderBottomColor: '#F0F0F0',
          borderBottomWidth: 1,
        }}>
        <View style={{paddingVertical: PX(15)}}>
          <Text
            style={{
              fontSize: PX(14),
              fontFamily: Fonts.FONTS.MontserratMedium,
              color: '#2D2D2D',
            }}>
            #{item.order_code}
          </Text>
          <Text
            style={{
              fontSize: PX(11),
              fontFamily: Fonts.FONTS.MontserratMedium,
              color: '#2D2D2D',
              paddingVertical: PX(5),
            }}>
            {moment(item.createdAt).format('MMM DD, YYYY hh:mm a')}
          </Text>
          <Text
            style={{
              fontSize: PX(12),
              fontFamily: Fonts.FONTS.MontserratMedium,
              color: '#C4C4C4',
            }}>
            {item.customer_name}
          </Text>
        </View>
        <View style={{alignItems: 'flex-end'}}>
          <Text
            style={{
              fontSize: PX(16),
              fontFamily: Fonts.FONTS.MontserratMedium,
              color: '#F55800',
            }}>
            ${parseInt(item.total)}
          </Text>
          <Text
            style={{
              fontSize: PX(12),
              fontFamily: Fonts.FONTS.MontserratMedium,
              color: '#C4C4C4',
              paddingTop: PX(5),
            }}>
            {'Credit Card'}
          </Text>
        </View>
      </View>
    );
  };
  const onDateChange = async (date, type) => {
    if (type === 'END_DATE') {
      console.log(date, type);
      setSelectedEndDate(moment(date).format('MMM DD, YYYY'));
      try {
        setLoading(true);
        let orderItem = [];
        const id1 = await AsyncStorage.getItem('id');

        const restaurant_id = encodeURIComponent(id1);
        const start_date = encodeURIComponent('-');
        const end_date = encodeURIComponent('-');
        const requestBody = `restaurant_id=${restaurant_id}&start_date=${start_date}&end_date=${end_date}`;
        const response = await orderEarningApi(requestBody);
        if (response.sucecess) {
          setLoading(false);

          setTotalRevenue(response.totalEarn);
          let dataTotal = 0;
          await response?.data?.map((item, index) => {
            console.log(
              'Get ID::',
              new Date(selectedStartDate),
              new Date(item.createdAt),
            );
            if (
              new Date(selectedStartDate) < new Date(item.createdAt) &&
              new Date(selectedEndDate) > new Date(item.createdAt)
            ) {
              dataTotal = dataTotal + parseFloat(item.total);
              orderItem.push(item);
            }
          }),
            setTotalAmount(dataTotal);
          setOrderData(orderItem.reverse());
        } else {
          setLoading(false);
          Alert.alert(' ', response.message);
        }
      } catch (err) {
        setLoading(false);
        console.log('Error::::', err);
        alert('Server issue.');
      }
      setTimeout(() => {
        setDateModal(false);
      }, 600);
    } else {
      console.log(date, type);
      setSelectedStartDate(moment(date).format('MMM DD, YYYY'));
    }
  };

  // console.log('parseFloat(totalAmount).toFixed(2)',parseFloat(totalAmount).toFixed(2));
  return (
    <View style={styles.container}>
      <View
        style={{
          height: hasNotch() ? PX(35) : PX(10),
          backgroundColor: '#000',
        }}
      />

      <View style={[styles.headerView, {justifyContent: 'center'}]}>
        <Text style={styles.headerText}>Earnings</Text>
      </View>

      <View
        style={{
          width: '100%',
          // paddingHorizontal: PX(20),
          alignItems: 'center',
          backgroundColor: '#FBFBFB',
        }}>
        <View style={{width: '96%'}}>
          <Image
            style={styles.mainImage1}
            resizeMode="stretch"
            source={balancecard}
          />
          <View
            style={{
              position: 'absolute',
              top: PX(88),
              height: PX(100),
              backgroundColor: '#051821',
              width: PX(150),
              left: PX(30),
            }}>
            <Text
              style={{
                color: '#fff',
                fontSize: PX(24),
                fontFamily: 'Montserrat-Regular',
              }}>
              ${totalRevenue}
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{width: '100%', backgroundColor: '#fff', paddingTop: PX(10)}}>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: PX(20),
            paddingBottom: PX(10),
          }}>
          <Text
            style={{
              fontSize: PX(18),
              fontFamily: Fonts.FONTS.MontserratSemiBold,
              color: '#2D2D2D',
            }}>
            Earning Details
          </Text>
          <TouchableOpacity
            onPress={() => {
              setDateModal(!dateModal);
            }}>
            {/* <Image
            style={{
              width: PX(25),
              height: PX(20),
              resizeMode: 'contain',
              tintColor: '#F55800',
            }}
            source={calendar}
          /> */}
            <Text
              style={{
                fontSize: PX(18),
                fontFamily: Fonts.FONTS.MontserratSemiBold,
                color: '#F55800',
              }}>
              Calendar
            </Text>
          </TouchableOpacity>
        </View>
        {dateModal && (
          <CalendarPicker
            startFromMonday={true}
            allowRangeSelection={true}
            minDate={minDate}
            maxDate={maxDate}
            todayBackgroundColor="#f2e6ff"
            selectedDayColor="#F55800"
            selectedDayTextColor="#FFFFFF"
            onDateChange={(date, time) => onDateChange(date, time)}
            handleOnPressDay={date => {
              console.log(date);
            }}
          />
        )}
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: PX(20),
            paddingTop: PX(25),
            paddingBottom: PX(10),
          }}>
          <Text
            style={{
              fontSize: PX(15),
              fontFamily: Fonts.FONTS.MontserratRegular,
              color: '#2D2D2D',
            }}>
            {selectedStartDate} - {selectedEndDate}
          </Text>
          <Text
            style={{
              fontSize: PX(16),
              fontFamily: Fonts.FONTS.MontserratSemiBold,
              color: '#67C117',
            }}>
            ${parseFloat(totalAmount).toFixed(2)}
          </Text>
        </View>
        <FlatList
          data={orderData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{paddingBottom: PX(500)}}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};
