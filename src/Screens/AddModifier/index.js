import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  Switch,
  LogBox,
  Alert,
} from 'react-native';
import {PX} from '../../Components/Pixel/index';
import {hasNotch} from 'react-native-device-info';
import styles from './styles';
import logo from '../../Assets/logo1.png';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import firstStep from '../../Assets/shop-outline.png';
import uploadBanner from '../../Assets/uploadbanner1.png';
import open from '../../Assets/open.png';
import CountryPicker, {DARK_THEME} from 'react-native-country-picker-modal';
import backArrow from '../../Assets/backArrow.png';
import calendar from '../../Assets/calendar.png';
import {Fonts} from '../../utils';
import ProductType from '../../Components/ProductType';
import CategoryType from '../../Components/CategoryType';
import deleted from '../../Assets/delete.png';
import downArrow from '../../Assets/downArrow.png';
import radio from '../../Assets/radio.png';
import select from '../../Assets/select.png';
import {ModifierApi, UpdateModifier} from '../../services/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AlertPopup from '../../Components/AlertPopup';
import {Loader} from '../../Components/Loader';

let modifier = [{modifier_name: '', price: ''}];

export const AddModifier = ({navigation, route,item}) => {
  const [pageIndex, setPageIndex] = useState(1);
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [isEnabled, setIsEnabled] = useState(true);
  const [state, setState] = useState('');
  const [productModal, setProductModal] = useState(false);
  const [categoryModal, setCategoryModal] = useState(false);
  const [single, setSingle] = useState(true);
  const [multiple, setMultiple] = useState(false);
  const [alertPopup, setAlertPopup] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [value, setValue] = useState(1);
  const [loading, setLoading] = useState(false);
  const [modifierAdd, setModifierAdd] = useState(modifier);
  const [optional, setOptional] = useState(true);
  const [required, setRequired] = useState(false);
  const [value1, setValue1] = useState(2);
  const [values, setValues] = useState('');
  const [Price,setPrice] = useState('');

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const selectValue = from => {
    if (from == 'single') {
      setSingle(true);
      setMultiple(false);
      setValue(1);
    } else {
      setSingle(false);
      setMultiple(true);
      setValue(2);
    }
  };

  const selectValue1 = from => {
    if (from == 'optional') {
      setOptional(true);
      setRequired(false);
      setValue1(2);
    } else {
      setOptional(false);
      setRequired(true);
      setValue1(1);
    }
  };

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  useEffect(() => {
    const subscribe = navigation.addListener('focus', () => {
      if (route.params?.from == 'edit') {
        console.log('Get Items:::', route.params.items);
        setModifierAdd(route.params.items.item.modifiers);
        setAddress(route.params.items.item.group_name);
        if (route.params.items.item.select_as == 1) {
          setSingle(true);
          setMultiple(false);
          setValue(1);
        } else {
          setSingle(false);
          setMultiple(true);
          setValue(2);
        }
        if (route.params.items.item.status == 1) {
          setIsEnabled(true);
        } else {
          setIsEnabled(false);
        }
      }
    });
  }, []);

  const addModifier = async (item) => {

    if (address == null || address == '') {
      setAlertMessage('Please select Group name.');
      setAlertPopup(true);
      // Alert.alert('Payment','Please select first order item.')
    } 
  //  else if ( modifierAdd==null || modifierAdd == '') {
  //     setAlertMessage('Please select Modifier Name.');
  //     setAlertPopup(true);
  //     // Alert.alert('Payment','Please select first order item.')
  //   } 
  //  else if (values == null || values == '') {
  //     setAlertMessage('Please select  set Price.');
  //     setAlertPopup(true);
  //     // Alert.alert('Payment','Please select first order item.')
  //   } 
    
     else {

    try {
      let dataArray = [{modifier_name: state, price: city}];
      setLoading(true);
      const id1 = await AsyncStorage.getItem('id');
      console.log('Get ID::', modifierAdd);
      const restaurant_id = encodeURIComponent(route.params?.itemId);
      const group_name = encodeURIComponent(address);
      const modifiers = encodeURIComponent(JSON.stringify(modifierAdd));
      const select_as = encodeURIComponent(`${value}`);
      const is_required = encodeURIComponent(`${value1}`);
      const status = encodeURIComponent(isEnabled ? '1' : '0');

      const requestBody = `item_id=${restaurant_id}&group_name=${group_name}&modifiers=${modifiers}&select_as=${select_as}&status=${status}&is_required=${is_required}`;
      console.log('Get Api Response:::', requestBody);
      const response = await ModifierApi(requestBody);

      console.log('Get Api Response:::', response);
      if (!response.sucecess) {
        setLoading(false);
        Alert.alert(' ', response.message);
      } else {
        setLoading(false);
        Alert.alert(' ', response.message);
        modifier = [{modifier_name: '', price: ''}];
        setModifierAdd(modifier);
        setAddress('');
        setValue(1);
        setValue1(2);
        navigation.navigate('ModifierSuccess');
      }
    } catch (error) {
      console.log('error', error);
      setLoading(false);
    }
  }
  };

  const updateModifier = async () => {
    try {
      setLoading(true);
      const id1 = await AsyncStorage.getItem('id');
      console.log('Get ID::', modifierAdd);
      const restaurant_id = encodeURIComponent(route.params?.items.item.id);
      const group_name = encodeURIComponent(address);
      const modifiers = encodeURIComponent(JSON.stringify(modifierAdd));
      const select_as = encodeURIComponent(`${value}`);
      const is_required = encodeURIComponent(`${value1}`);
      const status = encodeURIComponent(isEnabled ? '1' : '0');

      const requestBody = `modifier_id=${restaurant_id}&group_name=${group_name}&modifiers=${modifiers}&select_as=${select_as}&status=${status}&is_required=${is_required}`;
      console.log('Get Api Response:::', requestBody);
      const response = await UpdateModifier(requestBody);

      console.log('Get Api Response:::', response);
      if (!response.sucecess) {
        setLoading(false);
        Alert.alert(' ', response.message);
      } else {
        setLoading(false);
        Alert.alert(' ', response.message);
        navigation.goBack();
      }
    } catch (error) {
      console.log('error', error);
      setLoading(false);
    }
  };

  const amountChanged = (text, index) => {
    let tmpAmount = '';
    let tmpValue = text.slice(-1);
    let newRawValue =   values +tmpValue;
    console.log('Get Both Value shows:::', newRawValue);
    if (modifierAdd[index].price.length > text.length) {
      modifierAdd[index].price = '';
    } else {
      if (newRawValue.length === 1) {
        tmpAmount = '0.0' + parseFloat(newRawValue).toFixed(2);
      } else if (newRawValue.length === 2) {
        tmpAmount = '0.' + parseFloat(newRawValue).toFixed(2);
        console.log('Get Both Value:::', newRawValue, newRawValue.length);
      } else {
        let intAmount = newRawValue.slice(0, newRawValue.length - 2);
        let centAmount = newRawValue.slice(-2);
        console.log('Get Both Value:::', intAmount, centAmount);
        tmpAmount =
          intAmount.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '.' + centAmount;
      }
      modifierAdd[index].price = tmpAmount;
      setValues( newRawValue);
    }
  };


//   const myString = 'The price is $12.99';
// const regex = /\.\d{2}$/;
// if (regex.test(myString)) {
//   console.log('Match found!');
// } else {
//   console.log('No match found.');
// }
  return (
    <View style={styles.container}>
      <View
        style={{
          height: hasNotch() ? PX(35) : PX(10),
          backgroundColor: '#000',
        }}
      />
      <Loader isLoding={loading} />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: PX(130)}}>
        <View style={{paddingHorizontal: PX(20), alignItems: 'center'}}>
          <View
            style={[
              styles.headerView,
              {justifyContent: pageIndex == 0 ? 'center' : 'space-between'},
            ]}>
            {pageIndex != 0 && (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image
                  style={{height: PX(20), width: PX(20), resizeMode: 'contain'}}
                  source={backArrow}
                />
              </TouchableOpacity>
            )}
            <Text style={styles.headerText}>
              {route.params?.from == 'edit'
                ? 'Edit Modifier Group'
                : 'Add Modifier Group'}
            </Text>
            {pageIndex != 0 && (
              <Image
                style={{height: PX(20), width: PX(20), resizeMode: 'contain'}}
              />
            )}
          </View>

          <View style={styles.dataView}>
            <Text style={styles.textInputTitle1}>Group name</Text>
            <TextInput
              value={address}
              onChangeText={text => {
                setAddress(text);
              }}
              placeholder="Extras"
              style={styles.textInputStyle}
            />
            <FlatList
              data={modifierAdd}
              renderItem={({item, index}) => {
                return (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                    }}>
                    <View
                      style={{width: modifierAdd.length < 2 ? '48%' : '44%'}}>
                      <Text style={styles.textInputTitle1}>Modifier Name</Text>
                      <TextInput
                        value={item.modifier_name}
                        onChangeText={text => {
                          setState(text);
                          modifierAdd[index].modifier_name = text;
                        }}
                        placeholder="State"
                        style={styles.textInputStyle}
                      />
                    </View>
                    <View
                      style={{width: modifierAdd.length < 2 ? '48%' : '44%'}}>
                      <Text style={styles.textInputTitle1}>Set Price</Text>
                      <View style={styles.textInputView1}>
                        <Text style={styles.dollarStyle}>$</Text>
                        <TextInput
                          value={ `${item.price}`}
                          onChangeText={text => {
                            amountChanged(text, index);
                             setValues(text)
                            // modifierAdd[index].price = text
                          }}
                         
                          keyboardType="number-pad"
                          placeholder="0.00"
                          placeholderTextColor={'#2D2D2D'}
                          style={styles.textInputStyle2}
                        />
                      </View>
                    </View>
                    {modifierAdd.length < 2 ? null : (
                      <TouchableOpacity
                        onPress={() => {
                          const existDataValue = modifierAdd;
                          const filterData = existDataValue.filter(
                            (dataValue, index1) => index1 !== index,
                          );
                          console.log(' =====>', filterData);
                          setModifierAdd(filterData);
                          // SetItemList
                        }}>
                        <Image
                          style={{
                            height: PX(20),
                            width: PX(20),
                            resizeMode: 'contain',
                          }}
                          source={require('../../Assets/delete.png')}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                );
              }}
              keyExtractor={(item, index) => index.toString()}
            />
            <Text
              style={styles.locationText}
              onPress={() => {
                let NewItemAdd = {
                  modifier_name: '',
                  price: '',
                };
                setModifierAdd(modifierAdd => [...modifierAdd, NewItemAdd]);
              }}>
              Add More
            </Text>
            <Text style={styles.textInputTitle1}>Select as</Text>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                paddingVertical: PX(20),
              }}>
              <View
                style={{
                  width: '48%',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <TouchableOpacity onPress={() => selectValue('single')}>
                  <Image
                    style={{
                      height: PX(30),
                      width: PX(30),
                      resizeMode: 'contain',
                    }}
                    source={single ? select : radio}
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    color: '#2D2D2D',
                    fontSize: PX(14),
                    fontFamily: Fonts.FONTS.MontserratMedium,
                    marginLeft: PX(10),
                    height: PX(25),
                  }}>
                  Single
                </Text>
              </View>

              <View
                style={{
                  width: '48%',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <TouchableOpacity onPress={() => selectValue('multiple')}>
                  <Image
                    style={{
                      height: PX(30),
                      width: PX(30),
                      resizeMode: 'contain',
                    }}
                    source={multiple ? select : radio}
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    color: '#2D2D2D',
                    fontSize: PX(14),
                    fontFamily: Fonts.FONTS.MontserratMedium,
                    marginLeft: PX(10),
                    height: PX(25),
                  }}>
                  Multiple
                </Text>
              </View>
            </View>

            <Text style={styles.requiredStyle}>Select as</Text>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                paddingVertical: PX(20),
              }}>
              <View
                style={{
                  width: '48%',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <TouchableOpacity onPress={() => selectValue1('optional')}>
                  <Image
                    style={{
                      height: PX(30),
                      width: PX(30),
                      resizeMode: 'contain',
                    }}
                    source={optional ? select : radio}
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    color: '#2D2D2D',
                    fontSize: PX(14),
                    fontFamily: Fonts.FONTS.MontserratMedium,
                    marginLeft: PX(10),
                    height: PX(25),
                  }}>
                  Optional
                </Text>
              </View>

              <View
                style={{
                  width: '48%',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <TouchableOpacity onPress={() => selectValue1('required')}>
                  <Image
                    style={{
                      height: PX(30),
                      width: PX(30),
                      resizeMode: 'contain',
                    }}
                    source={required ? select : radio}
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    color: '#2D2D2D',
                    fontSize: PX(14),
                    fontFamily: Fonts.FONTS.MontserratMedium,
                    marginLeft: PX(10),
                    height: PX(25),
                  }}>
                  Required
                </Text>
              </View>
            </View>

            <View
              style={{
                paddingVertical: PX(30),
                justifyContent: 'flex-start',
                flexDirection: 'row',
                width: '100%',
                alignItems: 'center',
              }}>
              <Switch
                trackColor={{false: '#767577', true: '#F55800'}}
                thumbColor={isEnabled ? '#fff' : '#F55800'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />

              <Text
                style={{
                  color: '#2D2D2D',
                  fontSize: PX(14),
                  fontFamily: Fonts.FONTS.MontserratMedium,
                  marginLeft: PX(10),
                }}>
                Enable Modifier
              </Text>
            </View>
          </View>

          <View style={styles.buttonView}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() =>
                route.params?.from == 'edit' ? updateModifier() : addModifier()
              }>
              <Text style={styles.btnText}>{route.params?.from == 'edit'
                ? 'Save'
                : 'Done'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
      {alertPopup && (
        <AlertPopup
          modalVisible={alertPopup}
          onRequestClose={() => {
            setAlertPopup(false);
          }}
          title={'Add cart'}
          message={alertMessage}
        />
      )}
    </View>
  );
};
