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

import {db} from '../firebase';
import {uid} from 'uid'; 
import { onValue, ref, remove, set, update } from 'firebase/database';

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
          if(scanPlateNumber.Notification === 'on'){
            console.log("scanned "+scannedPlateNumber);
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
            <Tab.Screen name="Apprehended" children={()=><Apprehended user={user} setShowApprehendedDetails={setShowApprehendedDetails}/>} options={{
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
      <Edit_PN_list_popup setEditList={setEditList} setEditForm={setEditForm} user={user} plateNumber={plateNumber}/>
    }

    {editForm &&
      <View style={styles.addForm_popup}>
        <Edit_form_PN_list setForm={setForm} setEditForm={setEditForm} />
      </View>
    }

    {showApprehendedDetails &&
      <Apprehended_view_popup setShowApprehendedDetails={setShowApprehendedDetails}/>
    }

    {/* {
    scannedPlateNumberList.map((item, index) =>{
        console.log("display "+scannedPlateNumberList[0]);
        <Notification key={index} scannedPlateNumberList={item} setNotification={setNotification} />
    })
    } */}

    {console.log(notification)}
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