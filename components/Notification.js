import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput, Pressable, Animated, Touchable, TouchableOpacity, Alert} from 'react-native';
import Checkbox from 'expo-checkbox';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {db} from '../firebase';
import {uid} from 'uid'; 
import { onValue, ref, remove, set, update } from 'firebase/database';

const Notification = ({scannedPlateNumber,setNotification}) => {

    const handleSubmitChange = () => {
        // onValue(ref(db, `/Scanned`), (snapshot) => {
        //     const data = snapshot.val();
        //     Object.values(data).map((scanPlateNumber) => {
        //         if(scanPlateNumber.PlateNumber === scannedPlateNumber){
        //             console.log("found yah")
        //             update(ref(db, `/Scanned/${scanPlateNumber.Date} `+ `${scanPlateNumber.Time}`), {
        //                 Notification : "off"
        //             });
        //         }
        //     });
        // })

       setNotification(false);
      };
  return (
    <View style={styles.notificationContainer}>
        <View style={styles.modal}>
            <Image source={require('../assets/notifications.png')}/>
            <Text style={styles.plate_Number_Label}>Plate number:</Text> 
            <Text style={styles.plate_Number}>{scannedPlateNumber}</Text> 
            <Text style={styles.crime_Label}>Criminal Offense:</Text> 
            <Text style={styles.crime}>Carnap</Text> 
            <Text style={styles.location_Label}>Location:</Text> 
            <Text style={styles.location}>Lapasan zone 2</Text> 

            <Pressable style={styles.okBtn} onPress={()=>handleSubmitChange()}>
                <MaterialCommunityIcons name="close" size={45} />
            </Pressable>
        </View>
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