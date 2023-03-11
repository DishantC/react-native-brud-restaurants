import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import styles from './styles';
import {PX} from '../../Components/Pixel/index';
import {hasNotch} from 'react-native-device-info';
import {Fonts} from '../../utils';
import Header from '../../Components/Header';
import add from '../../Assets/add.png';
import Menu, {MenuItem, MenuDivider} from 'react-native-material-menu';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ItemListData, searchItems, orderCategoryApi} from '../../services/Api';
import {Loader} from '../../Components/Loader';

const categorys = [
  {
    name: 'Cappuccino',
  },
  {
    name: 'Espresso',
  },
  {
    name: 'Latte',
  },
  {
    name: 'Cold Coffee',
  },
];

const deals = [
  {
    img: require('../../Assets/drink.png'),
    name: 'Vanilla Cappuccino',
    many: '$5.50',
    dec: 'It blends rich vanilla flavor with bold espresso and steamed milk.',
  },
  {
    img: require('../../Assets/drink1.png'),
    name: 'Cappuccino Banana',
    many: '$5',
    dec: 'Banana dried chips on the top and sprinkle some sesame seeds ',
  },
  {
    img: require('../../Assets/drink2.png'),
    name: 'Caramel Cappuccino',
    many: '$6',
    dec: 'Sugar free caramel brulee lattes are the low carb version',
  },
  {
    img: require('../../Assets/drink3.png'),
    name: 'Oriental Cappuccino',
    many: '$4.50',
    dec: 'Old and modern elements of spiced coffee culture, brings an oriental twist',
  },
  {
    img: require('../../Assets/drink4.png'),
    name: 'Iced Cappuccino',
    many: '$4',
    dec: 'Sugar free caramel brulee lattes are the low carb version',
  },
];

export const ProfileScreen = ({navigation, route,initialTab}) => {
  const [Item, setItem] = useState('');
  const [visible, setVisible] = useState(false);
  const [itemList, setItemList] = useState([]);
  const [category, setCategory] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [loading, setLoading] = useState(false);
  const [masterDataSource,setMasterDataSource] = useState([])
  
  useEffect(() => { 
    const subscribe = navigation.addListener('focus', () => {
      getItemData();
      setItem('');    
    });
  }, []);

 

  const getItemData = async (item) => {
    try {
      setLoading(true);
      const id1 = await AsyncStorage.getItem('id');
      const itemList1 = await orderCategoryApi();
      const id = encodeURIComponent(id1);
      const category = encodeURIComponent(itemList1.data[0].category_name);
      const requestBody = `id=${id}&category=${category}`;
      const itemListdata = await ItemListData(requestBody);
      if (itemListdata?.sucecess) {
       
        setLoading(false);
        onCategoryManage(itemListdata?.category[0]?.category_name) 
        setItemList(itemListdata?.data);
        setCategory(itemListdata?.category);
     
        
      } else {
        setLoading(false);
        setItemList(itemList)
        alert(itemListdata?.message);
      }
    } catch (err) {
      setLoading(false);
      console.log('GEt Error::', err);
    }
  };

 

  const onCategoryManage = async (item,index) => {
    setItemList([]);
    setCategoryName(item);
     
    try {
      setLoading(true);
      const id1 = await AsyncStorage.getItem('id');
      const id = encodeURIComponent(id1);
      const category = encodeURIComponent(item);
      const requestBody = `id=${id}&category=${category}`;
      const itemList = await ItemListData(requestBody);
      if (itemList?.sucecess) {
        setLoading(false);
        setItemList(itemList.data);
        setMasterDataSource(itemList.data)
      } else {
        setLoading(false);
        alert(itemList.message);
        
      }
    } catch (err) {
      setLoading(false);
      console.log('GEt Error::', err);
    }
  };

 

  
  const onSearchFunc = async text => {
    setItem(text);
      if (text!='') {
        const newData = masterDataSource.filter(
          function (item) {
            const itemData = item.item_name
              ? item.item_name.toUpperCase()
              : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        setItemList(newData);
        setItem(text);
      } else {
        setItemList(masterDataSource);
        setItem(text);
      }}




  const renderItem1 = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.Image1}
        onPress={() => {onCategoryManage(item.category_name)}
        }
        >
        <Text
          style={{
            fontSize: PX(15),
            color: item.category_name != categoryName===index ? '#848484' : '#F55800',
            fontFamily: 'Montserrat-Regular',
          }}>
          {item.category_name}
        </Text>
        {item.category_name == categoryName && (
          <View
            style={{
              height: PX(6),
              width: PX(6),
              borderRadius: PX(6),
              backgroundColor: '#F55800',
              marginTop: PX(5),
            }}></View>
        )}
      </TouchableOpacity>
    );
  };

  const renderItem2 = ({item, index}) => {
    return (
      <View style={styles.category}>
        <View style={styles.box}>
          <View style={styles.main}>
            <Image source={{uri: item.image}} style={styles.img} />
          </View>
          <View style={styles.view}>
            <Text style={styles.name}>{item.item_name}</Text>
            <Text style={styles.dec} numberOfLines={2}>
              {item.item_desc}
            </Text>
            <View style={styles.box1}>
              <Text style={styles.textMany}>${item.price}</Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('AddItem', { from: 'edit', items: item, })
                }
                style={styles.btn}>
                <Text style={styles.btnText}>EDIT</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      );
               
    };

  const hideMenu = () => setVisible(false);

  const showMenu = () => setVisible(true);
  const EmptyListMessage = ({item}) => {
    return <Text style={styles.emptyListStyle}>No Data Found</Text>;
  };
  return (
    
    <View style={styles.container}>
      <Loader isLoding={loading} />
    
      <Header
        canGoBack={hideMenu}
        title={'Your Menu'}
        rightIconName={add}
        rightClick={() => navigation.navigate('AddItem', {from: 'add'})}
      />
      <View style={styles.search}>
        <View style={styles.img1}>
          <Image
            source={require('../../Assets/search.png')}
            style={styles.img2}
          />
        </View>
        <TextInput
          placeholder="search items"       
          value={Item}
          onChangeText={text => {
            onSearchFunc(text)
          }}
          placeholderTextColor="#C4C4C4"
          style={{
            width:'90%',
            color: '#C4C4C4',
            fontSize: PX(15),
            fontFamily: Fonts.FONTS.MontserratRegular,
          }}
        />
      </View>
      {category.length > 0 ? (
        <>
          <View style={styles.category1}>
            <FlatList
              data={category}
              renderItem={renderItem1}
              keyExtractor={(item, index) => index.toString()}
              showsHorizontalScrollIndicator={false}
              horizontal
            />
          </View>
          <View style={styles.item}>
            <FlatList
              data={itemList }
              renderItem={renderItem2}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{paddingBottom: PX(320)}}
              ListEmptyComponent={EmptyListMessage}
              
            />
          </View>
        </>
       ) : ( 
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            marginTop: PX(10),
          }}>
          <Text
            style={{
              color: '#C4C4C4',
              fontSize: PX(17),
              fontFamily: Fonts.FONTS.MontserratRegular,
            }}>
            No Menu Item
          </Text>
        </View>
       )} 
    </View>
  );
};
