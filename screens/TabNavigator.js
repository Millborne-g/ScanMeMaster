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

  const [viewApprehended, setviewApprehended] = useState(false);
  const [form, setForm] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [editList, setEditList] = useState(false);
  const [showApprehendedDetails, setShowApprehendedDetails] = useState(false);
  const [notification, setNotification] = useState(false);

  const [scannedPlateNumber, setScannedPlateNumber] = useState([]);
  
  const click_Vehicle_List = (routeScreen) => {
    // Programmatically click the second tab
    
    if(routeScreen===true){
      console.log("click vehicle list");
      tabRef.current?.navigate("Vehicles_List");
    }
    
  };

  //read
  useEffect(() => {
    console.log('')
    onValue(ref(db, `/Scanned`), (snapshot) => {
      //setList([]);
      const data = snapshot.val();
      if (data !== null) {
        Object.values(data).map((scanPlateNumber) => {
          if(scanPlateNumber.Notification === 'on'){
            console.log("scanned "+scannedPlateNumber);
            setNotification(true);
            setScannedPlateNumber([...scannedPlateNumber, scanPlateNumber.PlateNumber]);
          }
          
        //   setList((oldArray) => [...oldArray, [list.plateNumber, list.criminalOffense, [
        //     <TouchableOpacity onPress={()=>{
        //         setEditList(true);
        //         setPlateNumber(list.plateNumber)
        //         }}>
        //         <Text style={styles.editText}>Edit</Text>
        //     </TouchableOpacity>
        // ]
        // ]]);
          //console.log('test list '+list.plateNumber)
        });
      }
    });
  }, []);

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
            <Tab.Screen name="Dashboard" children={()=><Dashboard user={user} click_Vehicle_List={click_Vehicle_List} setviewApprehended={setviewApprehended}/>} options={{
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
    
    {viewApprehended &&
        <Recently_scanned_vehicle_location_popup setviewApprehended={setviewApprehended}/>
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

    {notification &&
      <Notification scannedPlateNumber={scannedPlateNumber[0]} setNotification={setNotification} />
      // scannedPlateNumber.map((item, index) =>{
      //   console.log("display");
      //   <Notification scannedPlateNumber={scannedPlateNumber[0]} />
      // })
    }
    
    

    
    
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