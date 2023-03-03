import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput, Pressable, Animated, Touchable, TouchableOpacity, Alert} from 'react-native';
import Checkbox from 'expo-checkbox';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {db} from '../firebase';
import {uid} from 'uid'; 
import { onValue, ref, remove, set, update } from 'firebase/database';

const Notification = ({scannedPlateNumberList, curLocList, curDateList, curTimeList, scannedCrimeList, setNotification, setScannedPlateNumberList, setCurLocList, setCurDateList, setCurTimeList, setScannedCrimeList}) => {

    let curDateTime = curDateList[curDateList.length -1]+" "+curTimeList[curTimeList.length -1];

    const handleSubmitChange = () => {
        update(ref(db, `/Scanned/${curDateTime}`), {
            Notification : "off"
        });
        setScannedPlateNumberList([]);
        setScannedCrimeList([]);
        setCurLocList([]);
        setNotification(false);
      };
  return (
    <View style={styles.notificationContainer}>
        {scannedPlateNumberList.map((item)=>{
            //setCurPlateNumber(item);
            return(
                <View style={styles.modal}>
                    <Image source={require('../assets/notifications.png')}/>
                    <Text style={styles.plate_Number_Label}>Plate number:</Text> 
                    <Text style={styles.plate_Number}>{item}</Text> 
                    <Text style={styles.crime_Label}>Criminal Offense:</Text> 
                    <Text style={styles.crime}>{scannedCrimeList[scannedCrimeList.length -1]}</Text> 
                    <Text style={styles.location_Label}>Location:</Text> 
                    <Text style={styles.location}>{curLocList[curLocList.length - 1]}</Text> 

                    <Pressable style={styles.okBtn} onPress={()=>handleSubmitChange()}>
                        <MaterialCommunityIcons name="close" size={45} />
                    </Pressable>
                </View>
            )
        })}
        
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
        paddingTop: 20,
        position: 'absolute',
        margin: 'auto',
    },

    plate_Number_Label:{
        fontSize: 16,
        color: '#9F9F9F'
    },

    plate_Number:{
        fontSize: 48,
        fontWeight: 'bold',
        color: '#252727',
        
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

    btnText: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },

    okBtn:{
        position: 'absolute',
        top: '2%',
        right: '2%'
    },

})

export default Notification