import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput, Pressable, Animated, Touchable, TouchableOpacity, Alert} from 'react-native';
import Checkbox from 'expo-checkbox';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {db} from '../firebase';
import {uid} from 'uid'; 
import { onValue, ref, remove, set, update } from 'firebase/database';
import NetInfo from "@react-native-community/netinfo";

import Loader from '../components/loader';

const Edit_PN_list_popup = ({setEditList , setEditForm, user, plateNumber,criminalOffense, setPlateNumber, setEditPlateNumber, setScannedPlateNotification, setScannedCrimeNotification, setScannedCurLocNotification, setNotification, setScannedPlateNumberList, setScannedCrimeList, setCurLocList}) => {
    const [isInternetConnected, setIsInternetConnected] = useState(false);
    const [clickButton, setClickButton] = useState(false);

    let currentDate = new Date();

    let year = currentDate.getFullYear();
    let month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    let date = currentDate.getDate().toString().padStart(2, '0');
    let hours = currentDate.getHours().toString().padStart(2, '0');
    let minutes = currentDate.getMinutes().toString().padStart(2, '0');
    let seconds = currentDate.getSeconds().toString().padStart(2, '0');
    
    const dateTime = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;

    //loading
    const [loading, setLoading] = useState(false);
  
    useEffect(()=>{
      NetInfo.addEventListener(state => {
          console.log("Connection type", state.type);
          console.log("Is connected?", state.isConnected);
          setIsInternetConnected(state.isConnected);
      });
    },[])
  const click_Delete = (text) =>{
    
    if(isInternetConnected === true){
        setLoading(true);
        setEditList(false);
        let deleteScanned = [];
        onValue(ref(db, `/Scanned`), (snapshot) => {
            const data = snapshot.val();
            if (data !== null) {
                Object.values(data).map((scanned) => {
                    let crime = '';
                    console.log('scanned.PlateNumber '+scanned.PlateNumber);
                    if(scanned.PlateNumber === plateNumber){
                        deleteScanned.push(scanned.Date+' '+scanned.Time);
                    }
                });
            }
        });
        deleteScanned.map((item)=>{
            remove(ref(db, `/Scanned/${item}`));
        })
        
        remove(ref(db, `/Vehicle_with_criminal_offense/${plateNumber}`));
        setPlateNumber('');
        Alert.alert('Message', text)
        setLoading(false);
    }
    else{
        Alert.alert('Message', 'Please connect to the internet.')
    }
  }

  const click_Edit = () =>{
    if(isInternetConnected === true){
        setEditForm(true);
        setEditPlateNumber(plateNumber);
    }
    else{
        Alert.alert('Message', 'Please connect to the internet.')
    }
  }

  const click_Apprehend = (text) =>{
    var Apprehend_ScannedPlateNumber = '';
    var Apprehend_ScannedCriminalOffense = '';
    var Apprehend_ScannedLocation= '';
    var Apprehend_ScannedApprehended= '';
    var Apprehend_ScannedDate = '';
    var Apprehend_ScannedTime = '';
    var Apprehend_ScannedImageLink = '';
    if(isInternetConnected === true){
        setLoading(true);
        setEditList(false);
        let appScanned = [];
        onValue(ref(db, `/Scanned`), (snapshot) => {
            const data = snapshot.val();
            if (data !== null) {
                Object.values(data).map((scanned) => {
                    let crime = '';
                    console.log('scanned.PlateNumber '+scanned.PlateNumber);
                    if(scanned.PlateNumber === plateNumber){
                        console.log('scanned.Date scanned.Time '+ scanned.Date+' '+scanned.Time)
                        Apprehend_ScannedPlateNumber = scanned.PlateNumber;
                        Apprehend_ScannedCriminalOffense = scanned.CriminalOffense ;
                        Apprehend_ScannedLocation= scanned.Location;
                        Apprehend_ScannedApprehended= scanned.Apprehended;
                        Apprehend_ScannedDate = scanned.Date;
                        Apprehend_ScannedTime = scanned.Time;
                        Apprehend_ScannedImageLink = scanned.ImageLink
                        appScanned.push(scanned.Date+' '+scanned.Time);
                        // update(ref(db, `/Scanned/${scanned.Date+' '+scanned.Time}`), {
                        //     Apprehended: 'yes',
                        //     Notification : "off"
                        // });
                    }
                });
            }
        });

        console.log('apprehendScanned '+appScanned);

        
        remove(ref(db, `/ScannedPlateNumber/${plateNumber}`));
        update(ref(db, `/Vehicle_with_criminal_offense/${plateNumber}`), {
            apprehended: 'yes',
        });

        let Apprehend_plateNumber  = '';
        let Apprehend_criminalOffense  = '';
        let Apprehend_apprehended = '';
        let Apprehend_mvFileNumber = '';
        let Apprehend_make = '';
        let Apprehend_series = '';
        let Apprehend_bodyType = '';
        let Apprehend_bodyNumber = '';
        let Apprehend_yearModel = '';
        let Apprehend_fuel = '';
        let Apprehend_engineNumber = '';
        let Apprehend_chassisNumber = '';
        let Apprehend_denomination = '';
        let Apprehend_pistonDisplacement = '';
        let Apprehend_numberOfCylinders = '';
        let Apprehend_grossWT = '';
        let Apprehend_netWT = '';
        let Apprehend_shippingWT = '';
        let Apprehend_netCapacity = '';
        let Apprehend_completeOwnerName = '';
        let Apprehend_completeAddress = '';
        let Apprehend_ORNumber = '';
        let Apprehend_ORDate = '';
        let Apprehend_currentDateTime = ''

        onValue(ref(db, `/Vehicle_with_criminal_offense/${plateNumber}`), (snapshot) => {
            const data = snapshot.val();
            if (data !== null) {
                Apprehend_plateNumber = data.plateNumber;
                Apprehend_criminalOffense  = data.criminalOffense;
                Apprehend_apprehended  = data.apprehended;
                Apprehend_mvFileNumber = data.mvFileNumber;
                Apprehend_make = data.make;
                Apprehend_series = data.series;
                Apprehend_bodyType = data.bodyType;
                Apprehend_bodyNumber = data.bodyNumber;
                Apprehend_yearModel = data.yearModel;
                Apprehend_fuel = data.fuel;
                Apprehend_engineNumber = data.engineNumber;
                Apprehend_chassisNumber = data.chassisNumber;
                Apprehend_denomination = data.denomination;
                Apprehend_pistonDisplacement = data.pistonDisplacement;
                Apprehend_numberOfCylinders = data.numberOfCylinders;
                Apprehend_grossWT = data.grossWT;
                Apprehend_netWT = data.netWT;
                Apprehend_shippingWT = data.shippingWT;
                Apprehend_netCapacity = data.netCapacity;
                Apprehend_completeOwnerName = data.completeOwnerName;
                Apprehend_completeAddress = data.completeAddress;
                Apprehend_ORNumber = data.ORNumber;
                Apprehend_ORDate = data.ORDate;
                Apprehend_currentDateTime = data.currentDateTime
            }
        });


        let dateTime = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;

        set(ref(db, `/Apprehended_Vehicle_with_criminal_offense/${dateTime+'_'+plateNumber}`), {
            plateNumber: dateTime+'_'+Apprehend_plateNumber,
            criminalOffense: Apprehend_criminalOffense,
            apprehended: 'yes',
            mvFileNumber: Apprehend_mvFileNumber,
            make: Apprehend_make,
            series: Apprehend_series,
            bodyType: Apprehend_bodyType,
            bodyNumber: Apprehend_bodyNumber,
            yearModel: Apprehend_yearModel,
            fuel: Apprehend_fuel,
            engineNumber: Apprehend_engineNumber,
            chassisNumber: Apprehend_chassisNumber,
            denomination: Apprehend_denomination,
            pistonDisplacement: Apprehend_pistonDisplacement,
            numberOfCylinders: Apprehend_numberOfCylinders,
            grossWT: Apprehend_grossWT,
            netWT: Apprehend_netWT,
            shippingWT: Apprehend_shippingWT,
            netCapacity: Apprehend_netCapacity,
            completeOwnerName: Apprehend_completeOwnerName,
            completeAddress: Apprehend_completeAddress,
            ORNumber: Apprehend_ORNumber,
            ORDate: Apprehend_ORDate,
          });
          remove(ref(db, `/Vehicle_with_criminal_offense/${plateNumber}`));
          set(ref(db, `/ScannedNotification`), {})    
          set(ref(db, `/ScannedPlateNumberNotification`), {})   
          appScanned.map((item)=>{
            set(ref(db, `/ScannedApprehended/${item}`), {
                PlateNumber: dateTime+'_'+Apprehend_plateNumber,
                CriminalOffense: Apprehend_ScannedCriminalOffense,
                Location: Apprehend_ScannedLocation,
                Apprehended: Apprehend_ScannedApprehended,
                Date: Apprehend_ScannedDate,
                Time: Apprehend_ScannedTime,
                ImageLink: Apprehend_ScannedImageLink
            });
            remove(ref(db, `/Scanned/${item}`));
            });

            // appScanned.map((item)=>{
            //     remove(ref(db, `/Scanned/${item}`));
            // })

            
            setPlateNumber('');
          Alert.alert('Message', text)
          setScannedPlateNotification(''); 
          setScannedCrimeNotification('');
          setScannedCurLocNotification('');
          setScannedPlateNumberList([]); 
          setScannedCrimeList([]); 
          setCurLocList([]);
          setNotification(false)
          setLoading(false);
    }
    else{
        Alert.alert('Message', 'Please connect to the internet.')
        
    }
  }

  return (
    <View style={styles.notificationContainer}>
        
        <View style={styles.modal}>
            <Text style={styles.plate_Number_Label}>Plate number:</Text> 
            <Text style={styles.plate_Number}>{plateNumber}</Text>
            <TouchableOpacity style={{...styles.Btn, ...styles.apprehendedBtn}} onPress={()=>{
                setLoading(true);
                click_Apprehend('Vehicle Apprehended!')
                }} >
                <Text style={styles.btnText}>Apprehended</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{...styles.Btn, ...styles.updateBtn}} onPress={
                user==='LTO'?
                    ()=>{
                        //setLoading(true);
                        click_Edit()
                    } :
                    ()=>Alert.alert('Message', 'Only LTO personnel can edit Vehicle with Criminal Offense.')
                }>
                <Text style={styles.btnText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{...styles.Btn, ...styles.deleteBtn}} onPress={
                user==='LTO'?
                ()=> {
                    setLoading(true);
                    click_Delete('Vehicle Deleted Successfully!');
                }:
                ()=> Alert.alert('Message', 'Only LTO personnel can delete Vehicle with Criminal Offense.')
                }>
                <Text style={styles.btnText}>Delete</Text>
            </TouchableOpacity>

            <Pressable style={styles.closeBtn} onPress={()=>setEditList(false)}>
                <MaterialCommunityIcons name="close" size={45} />
            </Pressable>
        </View>
        {loading && 
            <View style={styles.loaderContainer}>
                <View style={styles.loaderContainerBG}></View>
                <Loader/>
            </View>
        }
    </View>
  )
}

const styles = StyleSheet.create({
    notificationContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        position: 'absolute',
        top: 0,
        zIndex: 1
    },

    modal:{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        width: 332,
        borderRadius: 10,
        paddingBottom: 20,
        paddingTop: 20
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
      },

    plate_Number_Label:{
        fontSize: 16,
        color: '#9F9F9F'
    },

    plate_Number:{
        fontSize: 48,
        fontWeight: 'bold',
        color: '#252727',
        marginBottom: '2%'
    },

    crime_Label:{
        fontSize: 16,
        color: '#9F9F9F'
    },

    crime:{
        fontSize: 32,
        fontWeight: 'bold',
        color: '#252727',
        
    },

    location_Label:{
        fontSize: 16,
        color: '#9F9F9F'
    },

    location:{
        fontSize: 32,
        fontWeight: 'bold',
        color: '#252727',
        marginBottom: 20
        
    },

    Btn:{
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#2666FA',

        marginTop: '2%',
        marginBottom: '2%',
    },

    btnText: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },

    apprehendedBtn:{
        backgroundColor: '#2666FA'
    },

    updateBtn: {
        backgroundColor: '#46C263'
    },

    deleteBtn:{
        backgroundColor: '#FF546C'
    },

    closeBtn:{
        position: 'absolute',
        top: '2%',
        right: '2%'
    },
})

export default Edit_PN_list_popup