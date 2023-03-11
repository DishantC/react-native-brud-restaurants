import React,{useState,useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableWithoutFeedback,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {PX} from './Pixel';
import {Fonts} from '../utils';
import radio from '../Assets/radio.png';
import select from '../Assets/select.png';
import {orderCategoryApi} from '../services/Api';
const array = [
  {name: 'Coffee', status: true},
  {name: 'Cold Coffee', status: false},
  {name: 'Hot Coffee', status: false},
  {name: 'Tea', status: false},
  {name: 'Pastries', status: false},
  {name: 'Sandwich', status: false},
];

const ProductType = ({modalVisible, onRequestClose, selectedProduct,sendProduct}) => {
  const [categoryName,setCategoryName]= useState('Coffee')
  const [category,setCategory] = useState([])
  const [loading,setLoading] = useState(false)

  useEffect(()=>{
    getCategory()
  },[])

  const getCategory=async()=>{
    setCategoryName(sendProduct)
    const itemList = await orderCategoryApi()
    console.log('Get Item List>>>>>>',itemList)
    if(itemList?.sucecess){
      setCategory(itemList.data)
    }
    else{
     alert(itemList.message)
    }
    
    }
  const selectItem = (index, item) => {
    console.log("Get ERror::",item)
    let arrays=category
    arrays.filter(item => {
      if (item.status == 2) {
        item.status = 1;
      }
    });
    arrays[index].status = 2;
    setCategory(arrays)
    setLoading(true)
    selectedProduct(item.category_name);
    setCategoryName(item.category_name)
    setLoading(false)
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={{
          width: '100%',
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          height: PX(50),
          paddingHorizontal: PX(15),
        }}
        onPress={() => selectItem(index, item)}>
        <Text
          style={{fontFamily: Fonts.FONTS.MontserratMedium, fontSize: PX(15),color:'#000'}}>
          {item.category_name}
        </Text>

        <TouchableOpacity onPress={() => selectItem(index, item)}>
          <Image
            style={{height: PX(30), width: PX(30), resizeMode: 'contain'}}
            source={item.category_name==categoryName ? select : radio}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      visible={modalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onRequestClose}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0,0,0,0.4)',
        }}>
        <TouchableOpacity
          style={{
            height: '60%',
            width: '100%',
          }}
          onPress={onRequestClose}></TouchableOpacity>
        <View
          style={{
            height: '40%',
            width: '100%',
            backgroundColor: '#fff',
            borderRadius: PX(20),
          }}>
          <FlatList
            data={category}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    </Modal>
  );
};

export default ProductType;

const styles = StyleSheet.create({
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
