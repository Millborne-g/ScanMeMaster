import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput, Pressable, Animated, Touchable, TouchableOpacity} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Dashboard from './Dashboard';
import Vehicles_list from './Vehicles_list';
import Apprehended from './Apprehended';
import App from '../App';
import Notification from '../components/Notification';
import Apprehended_notification from '../components/Apprehended_notification';
import Recently_scanned_vehicle_location_popup from '../components/Recently_scanned_vehicle_location_popup';
import Add_form_PN_list from '../components/Add_form_PN_list';
import Edit_PN_list_popup from '../components/Edit_PN_list_popup';
import Edit_form_PN_list from '../components/Edit_form_PN_list';
import Apprehended_view_popup from '../components/Apprehended_view_popup';
import View_apprehended_details_PN_apprehended from '../components/View_apprehended_details_PN_apprehended';

import {db} from '../firebase';
import {uid} from 'uid'; 
import { onValue, ref, remove, set, update } from 'firebase/database';
import { Audio } from 'expo-av';

const Tab = createBottomTabNavigator();

const TabNavigator = ({user,setNav}) => {
  const routeScreen = false;
  const tabRef = useRef(null);
  const [plateNumber, setPlateNumber] = useState('')
  const [criminalOffense, setCriminalOffense] = useState('')

  const [viewLocArchive, setViewLocArchive] = useState(false);
  const [form, setForm] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [editList, setEditList] = useState(false);
  const [showApprehendedDetails, setShowApprehendedDetails] = useState(false);
  const [notification, setNotification] = useState(false);

  const [scannedPlateNumber, setScannedPlateNumber] = useState('');

  //Scanned Popup Notification
  const [scannedPlateNumberList, setScannedPlateNumberList] = useState([]);
  const [scannedCrimeList, setScannedCrimeList] = useState([]);
  const [curLocList, setCurLocList] = useState([]);
  const [curDateList, setCurDateList] = useState([]);
  const [curTimeList, setCurTimeList] = useState([]);

  //Scanned Popup Notification
  const [scannedPlateNumberDateTimeLoc, setScannedPlateNumberDateTimeLoc] = useState('');

  //Edit plate number popup
  const [editPlateNumber, setEditPlateNumber] = useState('');

  //View Apprehend plate number popup
  const [viewPlateNumber, setViewPlateNumber] = useState('');
  const [viewPlateNumberDetails, setViewPlateNumberDetails] = useState(false);

  const [sound, setSound] = useState();
  const [soundCount, setSoundCount] = useState(0)

  async function playSound() {
      console.log('Loading Sound');
      const { sound } = await Audio.Sound.createAsync( require('../assets/notification.mp3')
      );
      setSound(sound);

      console.log('Playing Sound');
      await sound.playAsync();

  }

  const click_Vehicle_List = (routeScreen) => {
    // Programmatically click the second tab
    
    if(routeScreen===true){
      console.log("click vehicle list");
      tabRef.current?.navigate("Vehicles_List");
    }
    
  };

  //read
  useEffect(() => {
    console.log('');
    let PN = '';
    //Scanned
    onValue(ref(db, `/Scanned`), (snapshot) => {
      //setList([]);
      const data = snapshot.val();
      if (data !== null) {
        Object.values(data).map((scanPlateNumber) => {
          console.log('scanPlateNumber.Apprehended '+scanPlateNumber.Apprehended)
          if(scanPlateNumber.Notification === 'on' && scanPlateNumber.Apprehended === "no"){
            console.log("scanned "+scannedPlateNumber);
            if(scanPlateNumber.Notification === 'on'){
              setTimeout(function() {
                playSound();
              }, 1000);
            }
            setNotification(true);
            setScannedPlateNumber(scanPlateNumber.PlateNumber);
            onValue(ref(db, `/Vehicle_with_criminal_offense/${scanPlateNumber.PlateNumber}`), (snapshot) => {
              const data = snapshot.val();
              if (data !== null) {
                setScannedCrimeList((oldArray) => [...oldArray, data.criminalOffense]);
            }
            });
            setScannedPlateNumberList((oldArray) => [...oldArray,scanPlateNumber.PlateNumber]);
            setCurLocList((oldArray) => [...oldArray,scanPlateNumber.Location]);
            setCurDateList((oldArray) => [...oldArray,scanPlateNumber.Date]);
            setCurTimeList((oldArray) => [...oldArray,scanPlateNumber.Time])
            console.log("scanned "+scannedPlateNumber);
          }
        });
      }
    });
  }, []);

  console.log("crime "+scannedCrimeList[scannedCrimeList.length -1]+ " PN "+scannedPlateNumberList[scannedPlateNumberList-1])

  return (
    <>
    <NavigationContainer>
        <Tab.Navigator
        //initialRouteName={routeScreen}
        screenOptions={{
          tabBarShowLabel: false,
            tabBarStyle: { 
                paddingTop: 10,
                paddingBottom: 10, 
                height: 70,
                backgroundColor: '#E4F1F8',
            },
            tabBarLabelStyle:{
                fontSize: 10,
            }
        }}
        
        >
            <Tab.Screen name="Dashboard" children={()=><Dashboard user={user} click_Vehicle_List={click_Vehicle_List} setViewLocArchive={setViewLocArchive} setScannedPlateNumberDateTimeLoc={setScannedPlateNumberDateTimeLoc}/>} options={{
            headerShown: false,
            tabBarIcon: ({color}) => (  
                <MaterialCommunityIcons name="view-dashboard-outline" size={30} color={color} />
              ),
          }}/>
            <Tab.Screen name="Vehicles_List" children={()=><Vehicles_list user={user} setForm={setForm} setEditList={setEditList} setPlateNumber={setPlateNumber} />}options={{
            headerShown: false,
            tabBarIcon: ({color}) => (
                <MaterialCommunityIcons name="playlist-edit" size={30} color={color} />
              ),
          }}/>
            <Tab.Screen name="Apprehended" children={()=><Apprehended user={user} setShowApprehendedDetails={setShowApprehendedDetails} setViewPlateNumber={setViewPlateNumber}/>} options={{
            headerShown: false,
            tabBarIcon: ({color}) => (
                <MaterialCommunityIcons name="car-back" size={30} color={color} />
              ),
          }}/>
          <Tab.Screen name="Logout" children={()=><App setNav={setNav(false)}/>} options={{
            headerShown: false,
            tabBarIcon: ({color}) => (
                <MaterialCommunityIcons name="logout" size={30} color={color} />
              ),
          }}/>
        </Tab.Navigator>
    </NavigationContainer>
    
    {viewLocArchive &&
        <Recently_scanned_vehicle_location_popup setViewLocArchive={setViewLocArchive} scannedPlateNumberDateTimeLoc={scannedPlateNumberDateTimeLoc}/>
    }

    {form &&
        <View style={styles.addForm_popup}>
          <Add_form_PN_list setForm={setForm}/>
        </View>
    }

    {editList &&
      <Edit_PN_list_popup setEditList={setEditList} setEditForm={setEditForm} user={user} plateNumber={plateNumber} setPlateNumber={setPlateNumber} setEditPlateNumber={setEditPlateNumber}/>
    }

    {editForm &&
      <View style={styles.addForm_popup}>
        <Edit_form_PN_list setForm={setForm} setEditForm={setEditForm} editPlateNumber={editPlateNumber} setEditList={setEditList}/>
      </View>
    }

    {showApprehendedDetails &&
      <Apprehended_view_popup setShowApprehendedDetails={setShowApprehendedDetails} viewPlateNumber={viewPlateNumber} setViewPlateNumberDetails={setViewPlateNumberDetails}/>
    }

    {viewPlateNumberDetails &&
      <View style={styles.addForm_popup}>
        <View_apprehended_details_PN_apprehended viewPlateNumber={viewPlateNumber} setViewPlateNumberDetails={setViewPlateNumberDetails}/>
      </View>
    }

    {/* {
    scannedPlateNumberList.map((item, index) =>{
        console.log("display "+scannedPlateNumberList[0]);
        <Notification key={index} scannedPlateNumberList={item} setNotification={setNotification} />
    })
    } */}

    {notification &&
      <Notification scannedPlateNumberList={scannedPlateNumberList} curLocList={curLocList} curDateList={curDateList} curTimeList={curTimeList} scannedCrimeList={scannedCrimeList} setNotification={setNotification} setScannedPlateNumberList={setScannedPlateNumberList} setCurLocList={setCurLocList} setCurDateList={setCurDateList} setCurTimeList={setCurTimeList} setScannedCrimeList={setScannedCrimeList}/>
      // <Notification scannedPlateNumber={scannedPlateNumber} setNotification={setNotification} />
    }
    
    

    

    {console.log("Scanned List "+scannedPlateNumberList[scannedPlateNumberList.length -1])}
    
    

    
    
    {/**<Notification />
     * <Apprehended_notification />
     * 
    */}
    </>
  )
}

const styles = StyleSheet.create({
  addForm_popup:{
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 90,
    backgroundColor: '#FFFFFF'
  }
})

export default TabNavigator