import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  Alert,
} from 'react-native';
import {PX} from '../../Components/Pixel/index';
import {hasNotch} from 'react-native-device-info';
import styles from './styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import backArrow from '../../Assets/backArrow.png';
import lock from '../../Assets/lock.png';
import {orderListApi, orderRequestApi} from '../../services/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Loader} from '../../Components/Loader';
import moment from 'moment';
import {Fonts} from '../../utils';

const Array1 = [
  {
    name: 'Alex Grade',
    date: 'Dec 05, 2021 3:58 PM',
    status: '#5214578',
    item: 'Items - 8',
    amount: '$70',
    paid: 'Paid - Loyalty Points',
  },
  {
    name: 'John Peter',
    date: 'Dec 05, 2021 3:58 PM',
    status: '#5216523',
    item: 'Items - 5',
    amount: '$14',
    paid: 'Paid - Loyalty Points',
  },
  {
    name: 'Alex Grade',
    date: 'Dec 05, 2021 3:58 PM',
    shoppingDate: '20 Dec',
    status: '#5214578',
    item: 'Items - 3',
    amount: '$30',
    paid: 'Paid - Loyalty Points',
  },
];

const Array = [
  {
    name: 'Alex Grade',
    date: 'Dec 05, 2021 3:58 PM',
    status: '#5214578',
    item: 'Items - 8',
    amount: '$70',
    paid: 'Paid - Loyalty Points',
    Image: require('../../Assets/lock.png'),
    save: 'SERVING',
  },
  {
    name: 'John Peter',
    date: 'Dec 05, 2021 3:58 PM',
    status: '#5216523',
    item: 'Items - 5',
    amount: '$14',
    paid: 'Paid - Loyalty Points',
    Image: require('../../Assets/lock.png'),
    save: 'SERVING',
  },
  {
    name: 'Alex Grade',
    date: 'Dec 05, 2021 3:58 PM',
    shoppingDate: '20 Dec',
    status: '#5214578',
    item: 'Items - 3',
    amount: '$30',
    paid: 'Paid - Loyalty Points',
    Image: require('../../Assets/lock.png'),
    save: 'SERVING',
  },
];
export const SettingScreen = ({navigation, route}) => {
  const [visible, setVisible] = useState(0);
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState([]);
  const [stateUpdate, setStateUpdate] = useState(false);
  const [extraData, setExtraData] = React.useState(new Date());
  const [orderCancel, setOrderCancel] = useState(false);
  const [orderAccept, setOrderAccept] = useState(false);
  const [orderPrepare, setOrderPrepare] = useState(false);
  const [openOrders, setOpenOrders] = useState([]);

  useEffect(() => {
    const subscribe = navigation.addListener('focus', () => {
      orderList();
      if (route.params?.from == 'home') {
        setVisible(1);
      }
    });
  }, []);

  const orderList = async () => {
    try {
      setLoading(true);
      const id1 = await AsyncStorage.getItem('id');
      console.log('Get ID::', id1);
      const restaurant_id = encodeURIComponent(id1);
      const requestBody = `restaurant_id=${restaurant_id}`;
      const response = await orderListApi(requestBody);
      if (response.sucecess) {
        setLoading(false);
        let open = [];
        let newOrder = [];
        await response.data?.map((item, index) => {
          if (item.status == 1) {
            newOrder.push(item);
          } else if (item.status == 4) {
            open.push(item);
          }
        });
        setOrderData(newOrder);
        setOpenOrders(open);
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

  const itemVisible = item => {
    setStateUpdate(true);
    let dataItem = orderData;
    dataItem.filter(i => {
      if (i._id == item._id) {
        if (i.visibleStatus) {
          return (i.visibleStatus = false);
        } else {
          return (i.visibleStatus = true);
        }
      }
    });
    console.log('GEt TUEMMML', dataItem);

    setOrderData(dataItem);
    setExtraData(new Date());
    setStateUpdate(false);
    setLoading(true);
    setLoading(false);
  };

  const itemVisible1 = item => {
    setStateUpdate(true);
    let dataItem = openOrders;
    dataItem.filter(i => {
      if (i._id == item._id) {
        if (i.visibleStatus) {
          return (i.visibleStatus = false);
        } else {
          return (i.visibleStatus = true);
        }
      }
    });
    console.log('GEt TUEMMML', dataItem);

    setOpenOrders(dataItem);
    setExtraData(new Date());
    setStateUpdate(false);
    setLoading(true);
    setLoading(false);
  };

  const onCancelOrder = async id => {
    const order_id = encodeURIComponent(id);
    const status = encodeURIComponent('3');

    const requestBody = `order_id=${order_id}&status=${status}`;
    const response = await orderRequestApi(requestBody);
    console.log('Get Cancel Order>>>', response);
    if (response.sucecess) {
      setLoading(false);
      setOrderCancel(true);
      orderList();
    } else {
      setLoading(false);
      Alert.alert(' ', response.message);
    }
  };

  const onAcceptOrder = async id => {
    console.log('Requested:::', id);
    const order_id = encodeURIComponent(id);
    const status = encodeURIComponent('4');
    const requestBody = `order_id=${order_id}&status=${status}`;
    const response = await orderRequestApi(requestBody);
    if (response.sucecess) {
      setLoading(false);
      setOrderCancel(true);
      setOrderAccept(true);
      orderList();
    } else {
      setLoading(false);
      Alert.alert(' ', response.message);
    }
  };

  const onPrepareOrder = async id => {
    console.log('Get IDDDD:::::', id);
    const order_id = encodeURIComponent(id);
    const status = encodeURIComponent(4);
    const requestBody = `order_id=${order_id}&status=${status}`;
    const response = await orderRequestApi(requestBody);
    if (response.sucecess) {
      setLoading(false);
      setOrderCancel(true);
      setOrderAccept(false);
      setOrderPrepare(true);
      orderList();
    } else {
      setLoading(false);
      Alert.alert(' ', response.message);
    }
  };

  const onDeliveredOrder = async id => {
    try {
      setLoading(true);
      const order_id = encodeURIComponent(id);
      const status = encodeURIComponent('5');
      const requestBody = `order_id=${order_id}&status=${status}`;
      const response = await orderRequestApi(requestBody);
      if (response.sucecess) {
        setLoading(false);
        orderList();
        console.log('Get ITem:::', response);
      } else {
        setLoading(false);
        Alert.alert(' ', response.message);
      }
    } catch (err) {
      setLoading(false);
      console.log('Get error:::', err);
    }
  };

  const renderItem = ({item, index}) => {
    console.log('Get Repsonsnsnss:::', item._id);
    return (
      <TouchableOpacity
        style={{alignItems: 'center', justifyContent: 'center'}}
        disabled={true}
        onPress={() => itemVisible(item)}>
        <View style={styles.box1}>
          <View style={{width: '90%'}}>
            <View style={styles.date}>
              <Text style={styles.date1}>#{item.order_code}</Text>
              <Text style={styles.date5}>
                {moment(item.createdAt).format('MMM DD, YYYY hh:mm a')}
              </Text>
            </View>
            <View style={styles.date}>
              {/* <Text style={styles.name}>{item.payment_type}</Text> */}
              {/* <Text style={styles.date1}>{item.date}</Text> */}
            </View>
          </View>
          <View
            style={{
              width: '100%',
              height: PX(2),
              backgroundColor: '#E5E5E5',
              marginTop: PX(10),
            }}
          />
          <View style={{width: '90%'}}>
            <TouchableOpacity
              style={styles.date}
              onPress={() => itemVisible(item)}>
              <Text style={styles.item10}>items - {item.items_count}</Text>
              {/* {!item.visibleStatus &&
              <Text style={styles.name}>{item.total}</Text>} */}
            </TouchableOpacity>
            {/* {!item.visibleStatus &&
            <Text style={styles.paid}>{'Paid - Loyalty Points'}</Text>}
            {item.visibleStatus &&
            <> */}
            {item.cart_items.map((item1, index1) => {
              return (
                <>
                  <View style={styles.date3}>
                    <Text style={styles.date1}>
                      {item1.qty} X {item1.item_name}
                    </Text>
                    <Text style={styles.date4}>${item1.item_total}</Text>
                  </View>
                  {item1.modifiers.map((item2, index2) => {
                    return (
                      <>
                        {index2 % 2 != 0 ? (
                          <View
                            style={{
                              paddingTop: PX(10),
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <View
                              style={{
                                marginLeft: PX(5),
                                height: PX(4),
                                width: PX(4),
                                borderRadius: PX(6),
                                backgroundColor: '#000',
                              }}></View>
                            <Text style={styles.date2}>
                              {item2.modifier_name}
                            </Text>
                          </View>
                        ) : (
                          <View style={{height: 0, width: 0}}></View>
                        )}
                      </>
                    );
                  })}
                </>
              );
            })}

            <View
              style={{
                width: '100%',
                height: PX(2),
                backgroundColor: '#E5E5E5',
                marginTop: PX(25),
              }}
            />
            <View style={{width: '100%', paddingTop: PX(15)}}>
              <Text style={styles.order}>Order Instruction</Text>
              <Text style={styles.text}>{item.order_instructions}</Text>
            </View>
            <View
              style={{
                width: '100%',
                height: PX(2),
                backgroundColor: '#E5E5E5',
                marginTop: PX(15),
              }}
            />
            <View style={{width: '100%'}}>
              <View style={styles.total2}>
                <Text style={styles.total1}>$0</Text>
                <Text style={styles.total}>${parseFloat(item.total)}</Text>
              </View>
              <View style={styles.total3}>
                <Text style={styles.tax}>Tax</Text>
                <Text style={styles.tax}>Paid - Credit Card</Text>
              </View>

              <View style={styles.date3}>
                <TouchableOpacity
                  style={{
                    width: '47%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#AF0000',
                    borderRadius: PX(30),
                    height: PX(35),
                  }}
                  onPress={() => onCancelOrder(item._id)}>
                  <Text style={styles.btn}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: '47%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#67C117',
                    borderRadius: PX(30),
                    height: PX(35),
                  }}
                  onPress={() => onAcceptOrder(item._id)}>
                  <Text style={styles.btn}>Accept</Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* </>
            } */}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderItem1 = ({item, index}) => {
    return (
      <TouchableOpacity
        style={{alignItems: 'center', justifyContent: 'center'}}
        onPress={() => itemVisible1(item)}>
        <View style={styles.box1}>
          <View style={{width: '90%'}}>
            <View style={styles.date}>
              <Text style={styles.date1}>#{item.order_code}</Text>
              <Text style={styles.date5}>
                {moment(item.createdAt).format('MMM DD,YYYY hh:mm a')}
              </Text>
            </View>
            <View style={styles.date}>
              <Text style={styles.name}>{item.payment_type}</Text>
              {/* <Text style={styles.date1}>{item.date}</Text> */}
            </View>
          </View>
          <View
            style={{
              width: '100%',
              height: PX(2),
              backgroundColor: '#E5E5E5',
              marginTop: PX(10),
            }}
          />
          <View style={{width: '90%'}}>
            <TouchableOpacity
              style={styles.date}
              onPress={() => itemVisible1(item)}>
              <Text style={styles.item10}>items - {item.items_count}</Text>
            </TouchableOpacity>
            {/* {!item.visibleStatus &&
            <Text style={styles.name}>{item.total}</Text>}
          </TouchableOpacity>
          {!item.visibleStatus &&
          <Text style={styles.paid}>{'Paid - Loyalty Points'}</Text>}
          {item.visibleStatus &&
          <> */}
            {item.cart_items.map((item1, index1) => {
              return (
                <>
                  <View style={styles.date3}>
                    <Text style={styles.date1}>
                      {item1.qty} X {item1.item_name}
                    </Text>
                    <Text style={styles.date4}>${item1.item_total}</Text>
                  </View>
                  {item1.modifiers.map((item2, index2) => {
                    return (
                      <>
                        {index2 % 2 != 0 ? (
                          <View
                            style={{
                              paddingTop: PX(10),
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <View
                              style={{
                                marginLeft: PX(5),
                                height: PX(4),
                                width: PX(4),
                                borderRadius: PX(6),
                                backgroundColor: '#000',
                              }}></View>
                            <Text style={styles.date2}>
                              {item2.modifier_name}
                            </Text>
                          </View>
                        ) : (
                          <View style={{height: 0, width: 0}}></View>
                        )}
                      </>
                    );
                  })}
                </>
              );
            })}

            <View
              style={{
                width: '100%',
                height: PX(2),
                backgroundColor: '#E5E5E5',
                marginTop: PX(25),
              }}
            />
            <View style={{width: '100%', paddingTop: PX(15)}}>
              <Text style={styles.order}>Order Instruction</Text>
              <Text style={styles.text}>{item.order_instructions}</Text>
            </View>
            <View
              style={{
                width: '100%',
                height: PX(2),
                backgroundColor: '#E5E5E5',
                marginTop: PX(15),
              }}
            />
            <View style={{width: '100%'}}>
              <View style={styles.total2}>
                <Text style={styles.total1}>$0</Text>
                <Text style={styles.total}>${parseFloat(item.total)}</Text>
              </View>
              <View style={styles.total3}>
                <Text style={styles.tax}>Tax</Text>
                <Text style={styles.tax}>Paid - Credit Card</Text>
              </View>

              <View style={{paddingTop: PX(18), alignItems: 'flex-end'}}>
                {item.status == 4 && (
                  <TouchableOpacity
                    style={{
                      width: '50%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#67C117',
                      borderRadius: PX(30),
                      height: PX(35),
                    }}
                    onPress={() => onDeliveredOrder(item._id)}>
                    <Text style={styles.btn}>Order Ready</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
            {/* </>
          } */}
          </View>
        </View>
      </TouchableOpacity>
    );
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
      <View style={styles.headerView}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image
            style={{height: PX(20), width: PX(20), resizeMode: 'contain'}}
            source={backArrow}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Order Status</Text>
        <Image style={{height: PX(20), width: PX(20), resizeMode: 'contain'}} />
      </View>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: '50%'}}>
        <View style={styles.headerView1}>
          <TouchableOpacity
            onPress={() => {
              setVisible(0);
            }}>
            {openOrders.length > 0 ? (
              <View
                style={{
                  height: 10,
                  width: 10,
                  borderRadius: 10,
                  alignSelf: 'flex-end',
                }}></View>
            ) : null}
            <Text
              style={[
                styles.title,
                {color: visible == 0 ? '#000' : '#C4C4C4'},
              ]}>
              New Orders
            </Text>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <View
                style={[
                  styles.dot,
                  {backgroundColor: visible == 0 ? '#F55800' : '#ffff'},
                ]}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            // style={{width:'43%'}}
            onPress={() => {
              setVisible(1);
            }}>
            {openOrders.length > 0 ? (
              <View
                style={{
                  height: 10,
                  width: 10,
                  borderRadius: 10,
                  backgroundColor: 'red',
                  alignSelf: 'flex-end',
                  marginRight: PX(-10),
                }}></View>
            ) : null}

            <Text
              style={[
                styles.title,
                {color: visible == 1 ? '#000' : '#C4C4C4'},
              ]}>
              Open Orders
            </Text>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <View
                style={[
                  styles.dot,
                  {backgroundColor: visible == 1 ? '#F55800' : '#ffff'},
                ]}
              />
            </View>
          </TouchableOpacity>
        </View>

        {visible == 0 ? (
          <>
            <View style={{alignItems: 'center'}}>
              <View style={{width: '95%'}}>
                <FlatList
                  data={orderData}
                  renderItem={renderItem}
                  keyExtractor={(item, index) => index.toString()}
                  // showsVerticalScrollIndicator={false}
                  scrollEnabled={false}
                  extraData={extraData}
                  ListEmptyComponent={() => {
                    return (
                      <View
                        style={{
                          width: '100%',
                          alignItems: 'center',
                          justifyContent: 'center',
                          height: PX(100),
                        }}>
                        <Text
                          style={{
                            fontFamily: Fonts.FONTS.MontserratMedium,
                            fontSize: PX(18),
                            color: '#000',
                          }}>
                          No New Orders
                        </Text>
                      </View>
                    );
                  }}
                />
              </View>
            </View>
          </>
        ) : (
          <>
            <View style={{alignItems: 'center'}}>
              <View style={{width: '95%'}}>
                <FlatList
                  data={openOrders}
                  renderItem={renderItem1}
                  keyExtractor={(item, index) => index.toString()}
                  // showsVerticalScrollIndicator={false}
                  scrollEnabled={false}
                  extraData={extraData}
                  ListEmptyComponent={() => {
                    return (
                      <View
                        style={{
                          width: '100%',
                          alignItems: 'center',
                          justifyContent: 'center',
                          height: PX(100),
                        }}>
                        <Text
                          style={{
                            fontFamily: Fonts.FONTS.MontserratMedium,
                            fontSize: PX(18),
                            color: '#000',
                          }}>
                          No Open Orders
                        </Text>
                      </View>
                    );
                  }}
                />
              </View>
            </View>
          </>
        )}
      </KeyboardAwareScrollView>
    </View>
  );
};
