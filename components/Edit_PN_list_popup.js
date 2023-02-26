import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput, Pressable, Animated, Touchable, TouchableOpacity, Alert} from 'react-native';
import Checkbox from 'expo-checkbox';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {db} from '../firebase';
import {uid} from 'uid'; 
import { onValue, ref, remove, set, update } from 'firebase/database';

const Edit_PN_list_popup = ({setEditList , setEditForm, user, plateNumber,criminalOffense, setPlateNumber}) => {

  const click_Delete = (text) =>{
    alert(text);
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
    
  }

  const click_Apprehend = (text) =>{
    alert(text);
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
                    appScanned.push(scanned.Date+' '+scanned.Time);
                }
            });
        }
    });

    console.log('apprehendScanned '+appScanned);

    appScanned.map((item)=>{
        update(ref(db, `/Scanned/${item}`), {
            Apprehended: 'yes',
        });
    })
    remove(ref(db, `/ScannedPlateNmber/${plateNumber}`));
    update(ref(db, `/Vehicle_with_criminal_offense/${plateNumber}`), {
        apprehended: 'yes',
    });
  }

  return (
    <View style={styles.notificationContainer}>
        <View style={styles.modal}>
            <Text style={styles.plate_Number_Label}>Plate number:</Text> 
            <Text style={styles.plate_Number}>{plateNumber}</Text>
            <Pressable style={{...styles.Btn, ...styles.apprehendedBtn}} onPress={()=>click_Apprehend('Vehicle Apprehended!')} >
                <Text style={styles.btnText}>Apprehended</Text>
            </Pressable>
            <Pressable style={{...styles.Btn, ...styles.updateBtn}} onPress={
                user==='LTO'?
                    ()=>setEditForm(true) :
                    ()=> alert('Only LTO personnel can update Vehicle with Criminal Offense.')
                }>
                <Text style={styles.btnText}>Update</Text>
            </Pressable>
            <Pressable style={{...styles.Btn, ...styles.deleteBtn}} onPress={
                user==='LTO'?
                ()=> click_Delete('Vehicle Deleted Successfully!'):
                ()=> alert('Only LTO personnel can delete Vehicle with Criminal Offense.')
                }>
                <Text style={styles.btnText}>Delete</Text>
            </Pressable>

            <Pressable style={styles.closeBtn} onPress={()=>setEditList(false)}>
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
        backgroundColor: '#00915C'
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