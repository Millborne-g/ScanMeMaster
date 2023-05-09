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

import Loader from '../components/loader';
import PopupArchive from '../components/PopupArchive'

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
  const [popupArchive, setPopupArchive] = useState(false);

  const [scannedPlateNumber, setScannedPlateNumber] = useState('');

  //Scanned Popup Notification
  const [scannedColorList, setScannedColorList] = useState([]);
  const [scannedDetectedPNList, setScannedDetectedPNList] = useState([]);
  const [scannedPlateNumberList, setScannedPlateNumberList] = useState([]);
  const [scannedCrimeList, setScannedCrimeList] = useState([]);
  const [curLocList, setCurLocList] = useState([]);
  const [scannedClosestMatchesList, setScannedClosestMatchesList] = useState([]);
  const [scannedImageLinkList, setScannedImageLinkList] = useState([]);
  

  const [curDateList, setCurDateList] = useState([]);
  const [curTimeList, setCurTimeList] = useState([]);

  const [scannedColor, setScannedColor] = useState('');
  const [scannedDetectedPN, setScannedDetectedPN] = useState('');
  const [scannedPlateNotification, setScannedPlateNotification] = useState('');
  const [scannedCrimeNotification, setScannedCrimeNotification] = useState('');
  const [scannedCurLocNotification, setScannedCurLocNotification] = useState('');
  const [scannedClosestMatches, setScannedClosestMatches] = useState('');
  const [scannedImageLink, setScannedImageLink] = useState('');

  

  const [scannedNotification, setScannedNotification] = useState(false);

  //Scanned Popup Notification
  const [scannedPlateNumberDateTimeLoc, setScannedPlateNumberDateTimeLoc] = useState('');

  //Edit plate number popup
  const [editPlateNumber, setEditPlateNumber] = useState('');

  //View Apprehend plate number popup
  const [viewPlateNumber, setViewPlateNumber] = useState('');
  const [viewPlateNumberDetails, setViewPlateNumberDetails] = useState(false);


  //Loading
  const [loading, setLoading] = useState(false);

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
    onValue(ref(db, `/ScannedNotification`), (snapshot) => {
      //onValue(ref(db, `/Scanned`), (snapshot) => {
      //setList([]);
       const data = snapshot.val();
       if (data !== null) {
        // let notif = false;
        
        // console.log('scanPlateNumber.Apprehended '+data.Apprehended)
        
        // console.log("scanned "+data.PlateNumber);

        // if(data.Apprehended === 'no' && data.Notification === 'on'){
        //     setScannedPlateNotification(data.PlateNumber);
        //     setScannedCrimeNotification(data.CriminalOffense);
        //     setScannedCurLocNotification(data.Location);
        //     playSound();
        //     setNotification(true);
        //     update(ref(db, `/ScannedNotification`), {
        //       Notification : "off"
        //     });  
        // }

        // Object.values(data).map((scanPlateNumber) => {
        //   onValue(ref(db, `/Vehicle_with_criminal_offense/${scanPlateNumber.PlateNumber}`), (snapshot) => {
        //     const dataV = snapshot.val();
        //     if (dataV !== null) {
        //       if(scanPlateNumber.Apprehended === 'no' && scanPlateNumber.Notification === 'on'){
              
        //         console.log('scanPlateNumber.Apprehended '+scanPlateNumber.Apprehended)
  
        //         console.log("scanned "+scanPlateNumber.PlateNumber);
  
        //         setNotification(true);
        //         setScannedPlateNumber(scanPlateNumber.PlateNumber);
        //         // onValue(ref(db, `/Vehicle_with_criminal_offense/${scanPlateNumber.PlateNumber}`), (snapshot) => {
        //         //   const data = snapshot.val();
        //         //   if (data !== null) {
        //         //     setScannedCrimeList((oldArray) => [...oldArray, data.criminalOffense]);
        //         // }
        //         // });
        //         update(ref(db, `/Scanned/${scanPlateNumber.Date+' '+scanPlateNumber.Time}`), {
        //           Notification : "off"
        //         });
        //         setScannedPlateNumberList((oldArray) => [...oldArray,scanPlateNumber.PlateNumber]);
        //         setScannedCrimeList((oldArray) => [...oldArray, scanPlateNumber.CriminalOffense]);
        //         setCurLocList((oldArray) => [...oldArray,scanPlateNumber.Location]);
        //         setCurDateList((oldArray) => [...oldArray,scanPlateNumber.Date]);
        //         setCurTimeList((oldArray) => [...oldArray,scanPlateNumber.Time])
        //         console.log("scanned "+scannedPlateNumber);
        //       }
        //     }
        //   })


          onValue(ref(db, `/Vehicle_with_criminal_offense/${data.PlateNumber}`), (snapshot) => {
            const dataV = snapshot.val();
            if (dataV !== null) {
              if(data.Apprehended === 'no' && data.Notification === 'on'){
                setScannedNotification(true);
                console.log('scanPlateNumber.Apprehended '+data.Apprehended)
  
                console.log("scanned "+data.PlateNumber);
  
                
                // playSound();
                setScannedPlateNumber(data.PlateNumber);
                // onValue(ref(db, `/Vehicle_with_criminal_offense/${scanPlateNumber.PlateNumber}`), (snapshot) => {
                //   const data = snapshot.val();
                //   if (data !== null) {
                //     setScannedCrimeList((oldArray) => [...oldArray, data.criminalOffense]);
                // }
                // });
                // update(ref(db, `/Scanned/${data.Date+' '+data.Time}`), {
                //   Notification : "off"
                // });
                
                setScannedColorList((oldArray) => [...oldArray,data.Color])
                setScannedDetectedPNList((oldArray) => [...oldArray,data.DetectedPN])
                setScannedPlateNumberList((oldArray) => [...oldArray,data.PlateNumber]);
                setScannedCrimeList((oldArray) => [...oldArray, data.CriminalOffense]);
                setCurLocList((oldArray) => [...oldArray,data.Location]);
                setCurDateList((oldArray) => [...oldArray,data.Date]);
                setCurTimeList((oldArray) => [...oldArray,data.Time])
                setScannedClosestMatchesList((oldArray) => [...oldArray,data.ClosestMatches])
                setScannedImageLinkList((oldArray) => [...oldArray,data.ImageLink])
                // const [scannedClosestMatchesList, setScannedClosestMatchesList] = useState([]);
  
                

                // setScannedPlateNotification(data.PlateNumber);
                // setScannedCrimeNotification(data.CriminalOffense);
                // setScannedCurLocNotification(data.Location);
                console.log("scanned "+scannedPlateNumber);
                update(ref(db, `/ScannedNotification`), {
                        Notification : "off"
                });
                // setNotification(false);
              }
            }
          })

          
          
       //});
       }
      
    });
  }, []);

  // const [scannedColor, setScannedColor] = useState('');
  // const [scannedDetectedPN, setScannedDetectedPN] = useState('');

  useEffect(() => {
    if (scannedPlateNumberList.length > 0) {
      //const latestData = scannedPlateNumberList.pop(); // remove latest data from queue
      setScannedPlateNotification(scannedPlateNumberList.pop());
      setNotification(true);
      
      playSound();
    }
  }, [scannedPlateNumberList]);

  useEffect(() => {
    if (scannedColorList.length > 0) {
      //const latestData = scannedPlateNumberList.pop(); // remove latest data from queue
      setScannedColor(scannedColorList.pop());
    }
  }, [scannedColorList]);

  useEffect(() => {
    if (scannedDetectedPNList.length > 0) {
      //const latestData = scannedPlateNumberList.pop(); // remove latest data from queue
      setScannedDetectedPN(scannedDetectedPNList.pop());
    }
  }, [scannedDetectedPNList]);

  useEffect(() => {
    if (scannedCrimeList.length > 0) {
      setScannedCrimeNotification(scannedCrimeList.pop());
    }
  }, [scannedCrimeList]);

  useEffect(() => {
    if (curLocList.length > 0) {
      setScannedCurLocNotification(curLocList.pop());
    }
  }, [curLocList]);

  useEffect(() => {
    if (scannedClosestMatchesList.length > 0) {
      setScannedClosestMatches(scannedClosestMatchesList.pop());
    }
  }, [scannedClosestMatchesList]);

  useEffect(() => {
    if (scannedImageLinkList.length > 0) {
      setScannedImageLink(scannedImageLinkList.pop());
    }
  }, [scannedImageLinkList]);


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
            <Tab.Screen name="Dashboard" children={()=><Dashboard user={user} click_Vehicle_List={click_Vehicle_List} setViewLocArchive={setViewLocArchive} setScannedPlateNumberDateTimeLoc={setScannedPlateNumberDateTimeLoc} setLoading={setLoading} setPopupArchive={setPopupArchive}/>} options={{
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
          <Add_form_PN_list setForm={setForm} setScannedPlateNumberList={setScannedPlateNumberList} setScannedCrimeList={setScannedCrimeList} setCurLocList={setCurLocList}/>
        </View>
    }

    {editList &&
      <Edit_PN_list_popup setEditList={setEditList} setEditForm={setEditForm} user={user} plateNumber={plateNumber} setPlateNumber={setPlateNumber} setEditPlateNumber={setEditPlateNumber} setScannedPlateNotification={setScannedPlateNotification} setScannedCrimeNotification={setScannedPlateNotification} setScannedCurLocNotification={setScannedCurLocNotification} setNotification={setNotification} setScannedPlateNumberList={setScannedPlateNumberList} setScannedCrimeList={setScannedCrimeList} setCurLocList={setCurLocList} setLoading={setLoading} />
    }

    {editForm &&
      <View style={styles.addForm_popup}>
        <Edit_form_PN_list setForm={setForm} setEditForm={setEditForm} editPlateNumber={editPlateNumber} setEditList={setEditList} setScannedPlateNumberList={setScannedPlateNumberList} setScannedCrimeList={setScannedCrimeList} setCurLocList={setCurLocList}/>
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

    {popupArchive &&
      <PopupArchive scannedPlateNumberDateTimeLoc={scannedPlateNumberDateTimeLoc} setPopupArchive={setPopupArchive}/>
    }

    {notification &&

      // useEffect(() => {
      //   if (scannedColorList.length > 0) {
      //     //const latestData = scannedPlateNumberList.pop(); // remove latest data from queue
      //     setScannedColor(scannedColorList.pop());
      //   }
      // }, [scannedColorList]);

      // useEffect(() => {
      //   if (scannedDetectedPNList.length > 0) {
      //     //const latestData = scannedPlateNumberList.pop(); // remove latest data from queue
      //     setScannedDetectedPN(scannedDetectedPNList.pop());
      //   }
      // }, [scannedDetectedPNList]);

      <Notification scannedPlateNotification={scannedPlateNotification} scannedCrimeNotification={scannedCrimeNotification} scannedCurLocNotification={scannedCurLocNotification} setNotification={setNotification} scannedDetectedPN={scannedDetectedPN} scannedColor={scannedColor} scannedClosestMatches={scannedClosestMatches} scannedImageLink={scannedImageLink} setScannedPlateNotification={setScannedPlateNotification} setScannedCrimeNotification={setScannedPlateNotification} setScannedCurLocNotification={setScannedCurLocNotification} setScannedDetectedPN={setScannedDetectedPN} setScannedColor={setScannedColor} setScannedClosestMatches={setScannedClosestMatches} setScannedImageLink={setScannedImageLink} setScannedPlateNumberList={setScannedPlateNumberList} setScannedCrimeList={setScannedCrimeList} setCurLocList={setCurLocList} setScannedDetectedPNList={setScannedDetectedPNList} setScannedColorList={setScannedColorList}setScannedClosestMatchesList={setScannedClosestMatchesList} setScannedImageLinkList={setScannedImageLinkList} setPopupArchive={setPopupArchive}/>
      // const [scannedClosestMatchesList, setScannedClosestMatchesList] = useState([]);
      // const [scannedClosestMatches, setScannedClosestMatches] = useState('');

//       const [scannedImageLinkList, setScannedImageLinkList] = useState([]);  

// const [scannedImageLink, setScannedImageLink] = useState('');
      
      //<Notification setNotification={setNotification} />
      //alert('test '+scannedPlateNotification)

      // Alert.alert('Alert', 'test '+scannedPlateNotification, [
      //   {text: 'OK', onPress: () => {setNotification(false)}},
      // ])
    }

    

    {loading && 
    
    <View style={styles.loaderContainer}>
      <View style={styles.loaderContainerBG}>
      </View>
      <Loader/>
    </View>
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
  },

  loaderContainer:{
    height: '100%',
    width: '100%',
    position: 'absolute',
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
  },

  loaderContainerBG:{
    height: '100%',
    width: '100%',
    position: 'absolute',
    top:0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)'
  }
})

export default TabNavigator