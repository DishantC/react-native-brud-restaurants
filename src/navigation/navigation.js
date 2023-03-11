import React from 'react';
import {Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  HomeScreen,
  SettingScreen,
  SplashScreen,
  AddCustomer,
  NotificationScreen,
  ProfileScreen,
  LoginScreen,
  RegisterScreen,
  ResetPassword,
  OTPScreen,
  ResetMessage,
  EmailLoginScreen,
  UpdateSuccess,
  CreatePassword,
  RegisterMessage,
  AddItem,
  ItemSuccess,
  ModifierList,
  AddModifier,
  ModifierSuccess,
  ForgotPassword,
  EditProfileModal,
} from '../Screens';
import card from '../Assets/card.png';
import foodMenu from '../Assets/food-menu.png';
import home from '../Assets/home.png';
import cafe from '../Assets/cafe.png';
import main from '../Assets/main.png';
import settings from '../Assets/settings.png';
import {PX} from '../Components/Pixel/index';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerStyle: {backgroundColor: '#42f44b'},
        headerTintColor: '#fff',
        headerTitleStyle: {fontWeight: 'bold'},
      }}>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const CustomerStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="EditProfileModal"
      screenOptions={{
        headerStyle: {backgroundColor: '#42f44b'},
        headerTintColor: '#fff',
        headerTitleStyle: {fontWeight: 'bold'},
      }}>
      <Stack.Screen
        name="EditProfileModal"
        component={EditProfileModal}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const NotificationStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="NotificationScreen"
      screenOptions={{
        headerStyle: {backgroundColor: '#42f44b'},
        headerTintColor: '#fff',
        headerTitleStyle: {fontWeight: 'bold'},
      }}>
      <Stack.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const ProfileStack = () => {
  return (
    <Stack.Navigator initialRouteName="ProfileScreen"
    screenOptions={{
      headerStyle: {backgroundColor: '#42f44b'},
      headerTintColor: '#fff',
      headerTitleStyle: {fontWeight: 'bold'},
    }}
    >
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddItem"
        component={AddItem}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ItemSuccess"
        component={ItemSuccess}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ModifierList"
        component={ModifierList}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddModifier"
        component={AddModifier}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ModifierSuccess"
        component={ModifierSuccess}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const SettingsStack = () => {
  return (
    <Stack.Navigator initialRouteName="SettingScreen">
      <Stack.Screen
        name="SettingScreen"
        component={SettingScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const TabStack = () => {
  return (
    <Tab.Navigator
      initialRouteName={'Home'}
      tabBarOptions={{
        keyboardHidesTabBar: false,
        style: {
          position: 'absolute',
        },
      }}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          height: 90,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          shadowColor: '#000',
          alignItems:'center',
          justifyContent:"center",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          tabBarLabelStyle: {
              bottom:20
            },
          elevation: 5,
          paddingBottom:PX(20)
        },
      }}>
      <Tab.Screen
        name="Setting"
        component={CustomerStack}
        screenOptions={{headerShown: false}}
        options={{
          tabBarIcon: ({color, size, focused}) => (
            <Image
              style={{
                width: PX(25),
                height: PX(25),
                resizeMode: 'contain',
                marginTop:PX(10),
                tintColor: focused ? '#F55800' : '#2D2D2D',
              }}
              source={settings}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Earnings"
        component={NotificationStack}
        screenOptions={{headerShown: false}}
        options={{
          tabBarIcon: ({color, size, focused}) => (
            <Image
              style={{
                width: PX(25),
                height: PX(25),
                resizeMode: 'contain',
                tintColor: focused ? '#F55800' : '#2D2D2D',
                marginTop:PX(10)
              }}
              source={card}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeStack}
        screenOptions={{headerShown: false}}
        options={{
          tabBarIcon: ({color, size, focused}) => (
            <Image
              style={{
                width: PX(25),
                height: PX(25),
                resizeMode: 'contain',
                tintColor: focused ? '#F55800' : '#2D2D2D',
                marginTop:PX(10)
              }}
              source={home}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Orders"
        component={SettingsStack}
        screenOptions={{headerShown: false}}
        options={{
          tabBarIcon: ({color, size, focused}) => (
            <Image
              style={{
                width: PX(25),
                height: PX(25),
                resizeMode: 'contain',
                tintColor: focused ? '#F55800' : '#2D2D2D',
                marginTop:PX(10)
              }}
              source={cafe}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Menu"
        component={ProfileStack}
        screenOptions={{headerShown: false}}
        options={{
          tabBarIcon: ({color, size, focused}) => (
            <Image
              style={{
                width: PX(25),
                height: PX(25),
                resizeMode: 'contain',
                tintColor: focused ? '#F55800' : '#2D2D2D',
                marginTop:PX(10)
              }}
              source={foodMenu}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const MainStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="TabStack"
      screenOptions={{
        headerTintColor: '#fff',
        headerTitleStyle: {fontWeight: 'bold'},
        headerShown: false,
      }}>
      <Stack.Screen
        name="TabStack"
        component={TabStack}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen
          name="BarcodeScanner"
          component={BarcodeScanner}
          options={{headerShown: false}}
        /> */}
    </Stack.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{
        headerTintColor: '#fff',
        headerTitleStyle: {fontWeight: 'bold'},
        headerShown: false,
      }}>
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ResetMessage"
        component={ResetMessage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OTPScreen"
        component={OTPScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EmailLoginScreen"
        component={EmailLoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UpdateSuccess"
        component={UpdateSuccess}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CreatePassword"
        component={CreatePassword}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RegisterMessage"
        component={RegisterMessage}
        options={{headerShown: false}}
      />
       <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={'AuthStack'}
        screenOptions={{
          headerStyle: {backgroundColor: '#42f44b'},
          headerTintColor: '#fff',
          headerTitleStyle: {fontWeight: 'bold'},
        }}>
        <Stack.Screen
          name="AuthStack"
          component={AuthStack}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MainStack"
          component={MainStack}
          options={{headerShown: false}}
        />
         {/* <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{headerShown: false}}
      /> */}
         <Stack.Screen
        name="AddCustomer"
        component={AddCustomer}
        options={{headerShown: false}}
      />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default navigation;
