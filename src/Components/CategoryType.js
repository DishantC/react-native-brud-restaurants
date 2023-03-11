import React,{useEffect} from 'react';
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
import shadow from '../Assets/Shadow.png';
import selected from '../Assets/Selected.png';

const array = [
  {name: 'Non GMO', status: false},
  {name: 'Non Dairy', status: false},
  {name: 'Kosher', status: false},
  {name: 'Gluten-free', status: false},
];

const CategoryType = ({modalVisible, onRequestClose,productType,selectProductType}) => {

useEffect(()=>{
  array.map((item,index)=>{
    array.status = false
  })
},[])

const onPressDaa=(index,item1)=>{

  
  if(array[index].status==true){
  array[index].status = false
 }
else{
  array[index].status = true
  // selectProductType(item1.name);
}
let data=[]
array.filter(item => {
    if (item.status == true) {
      data.push(item.name)
     
    }
  });
  
  selectProductType(data);
  
  // onRequestClose

}

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
        onPress={()=>onPressDaa(index,item)}>
        <Text
          style={{fontFamily: Fonts.FONTS.MontserratMedium, fontSize: PX(15),color:'#000'}}>
          {item.name}
        </Text>

        {/* <TouchableOpacity> */}
          <Image
            style={{
              height: item.status ? PX(40) : PX(35),
              width: item.status ? PX(38) : PX(38),
              resizeMode: 'contain',
            }}
            source={item.status ? selected : shadow}
          />
        {/* </TouchableOpacity> */}
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      visible={modalVisible}
      animationType="slide"
      transparent={true}
      style={{backgroundColor: 'rgba(0,0,0,0.4)'}}
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
            height: '72%',
            width: '100%',
          }}
          onPress={onRequestClose}></TouchableOpacity>
        <View
          style={{
            height: '30%',
            width: '100%',
            backgroundColor: '#fff',
            borderRadius: PX(20),
          }}>
          <FlatList
            data={array}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    </Modal>
  );
};

export default CategoryType;

const styles = StyleSheet.create({
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
