import React,{useEffect,useState} from 'react';
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
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';


const TimePopup = ({modalVisible, onRequestClose,mode,start,end}) => {

const [hoursVisible, setHoursVisible] = useState(true)
const [closeVisible, setCloseVisible] = useState(false)
const [customVisible, setCustomVisible] = useState(false)
const [openTime,setOpenTime] = useState()
const [closeTime,setCloseTime] = useState('')
const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
const [modeSelect,setModeSelect] = useState('hours')

const onSubmit=()=>{
    onRequestClose
    if(modeSelect=='hours'){
    mode('Open 24 hours')
    }
    else if(modeSelect=='close'){
        mode('Closed')
    }
    else if(modeSelect=='custom'){
        let data={
            time:'custom',
            start:openTime,
            end:closeTime
        }
        mode(data)
        // start(openTime)
        // end(closeTime)
    }
    
}

const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setOpenTime(moment(date).format('hh:mm a'))
    hideDatePicker();
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleTimeConfirm = (date) => {
    setCloseTime(moment(date).format('hh:mm a'))
    hideTimePicker();
  };

const selectItems=(from)=>{
    if(from=='hours'){
        setHoursVisible(true)
        setCloseVisible(false)
        setCustomVisible(false)
        setModeSelect('hours')
    }
    else if(from=='close'){
        setHoursVisible(false)
        setCloseVisible(true)
        setCustomVisible(false)
        setModeSelect('close')
    }
    else{
        setHoursVisible(false)
        setCloseVisible(false)
        setCustomVisible(true)
        setModeSelect('custom')
    }
}

  return (
      <>
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
            height: '20%',
            width: '100%',
            backgroundColor: 'rgba(0,0,0,0.4)',
          }}
          onPress={onRequestClose}></TouchableOpacity>
        <View
          style={{
            height: '80%',
            width: '100%',
            backgroundColor: '#fff',
            borderRadius: PX(20),
            alignItems:"center",
            justifyContent:'center'
          }}>
          <View style={{height:'88%',width:'90%',justifyContent:'space-between',paddingVertical:PX(20)}}>
           <View style={{width:'100%',height:'90%'}}>
            <Text style={{fontSize:PX(24),fontFamily:Fonts.FONTS.MontserratBold,color:'#000'}}>Operational Hours</Text>
            <View style={{width:'100%',paddingTop:PX(70),alignItems:'center'}}>
                <View style={{flexDirection:'row',width:'90%',justifyContent:'space-between'}}>
                    <Text style={{fontSize:PX(17),color:hoursVisible?'#F55800':'#000'}}>Open 24 hours</Text>
                    <TouchableOpacity onPress={()=>selectItems('hours')}>
                        <Image 
                        style={{width:PX(30),height:PX(30),resizeMode:'contain'}} 
                        source={hoursVisible?select:radio} 
                        />
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row',width:'90%',justifyContent:'space-between',marginTop:PX(20)}}>
                    <Text style={{fontSize:PX(17),color:closeVisible?'#F55800':'#000'}}>Closed</Text>
                    <TouchableOpacity onPress={()=>selectItems('close')}>
                        <Image 
                        style={{width:PX(30),height:PX(30),resizeMode:'contain'}} 
                        source={closeVisible?select:radio} 
                        />
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row',width:'90%',justifyContent:'space-between',marginTop:PX(20)}}>
                    <Text style={{fontSize:PX(17),color:customVisible?'#F55800':'#000'}}>Select CustomTime</Text>
                    <TouchableOpacity onPress={()=>selectItems('custom')}>
                        <Image 
                        style={{width:PX(30),height:PX(30),resizeMode:'contain'}} 
                        source={customVisible?select:radio} 
                        />
                    </TouchableOpacity>
                </View>

                {customVisible&&
                <View style={{width:'100%',flexDirection:"row",justifyContent:"space-between",paddingTop:PX(50)}}>
                    <View >
                        <View 
                           
                         style={{paddingHorizontal:PX(10),paddingVertical:PX(7),borderRadius:PX(50)}}>
                            <Text style={{fontSize:PX(15),color:'#000',fontFamily:Fonts.FONTS.MontserratMedium}}>Pick Opening Time</Text>
                        </View>
                        <TouchableOpacity onPress={()=>showDatePicker()} style={{width:'100%',borderBottomColor:'#828282',borderBottomWidth:1,height:PX(50),alignItems:"center",justifyContent:"center",marginTop:PX(20)}}>
                        <Text style={{fontSize:PX(16),color:"#000",fontFamily:Fonts.FONTS.MontserratSemiBold}}>{openTime}</Text>
                        <DateTimePickerModal
           isVisible={isDatePickerVisible}
        mode="time"
        onConfirm={(date)=>handleConfirm(date)}
        onCancel={()=>hideDatePicker()}
        is24Hour={false}
        
        />
                        </TouchableOpacity>
                    </View>

                    <View >
                        <View 
                        style={{paddingHorizontal:PX(10),paddingVertical:PX(7),borderRadius:PX(50)}}>
                            <Text style={{fontSize:PX(15),color:'#000',fontFamily:Fonts.FONTS.MontserratMedium}}>Pick Closing Time</Text>
                        </View>

                        <TouchableOpacity onPress={()=>showTimePicker()} style={{width:'100%',borderBottomColor:'#828282',borderBottomWidth:1,height:PX(50),alignItems:"center",justifyContent:"center",marginTop:PX(20)}}>
                        <Text style={{fontSize:PX(16),color:"#000",fontFamily:Fonts.FONTS.MontserratSemiBold}}>{closeTime}</Text>
                        <DateTimePickerModal
           isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={(date)=>handleTimeConfirm(date)}
        onCancel={()=>hideTimePicker()}
        is24Hour={false}
        />
                        </TouchableOpacity>
                    </View>
                   
                </View>

                }
              
            </View>
            </View>
            <View style={{width:'100%',height:'10%'}}>
            <TouchableOpacity style={styles.submitButton} onPress={()=>onSubmit()}>
                <Text style={{fontSize:PX(16),color:'#fff',fontFamily:Fonts.FONTS.MontserratBold}}>SUBMIT</Text>
            </TouchableOpacity>
            </View>
          </View>
        </View>
        
      </View>
    </Modal>  
       
    
      </>
  );
};

export default TimePopup;

const styles = StyleSheet.create({
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  submitButton:{
      width:'100%',
      height:PX(45),
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:'#F55800',
      borderRadius:PX(30)
  }
});
