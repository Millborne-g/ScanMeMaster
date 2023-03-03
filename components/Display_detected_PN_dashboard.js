import React, { useState, useEffect, useRef } from 'react';
import { Button, StyleSheet, Text, View, Image, Touchable, TouchableOpacity } from 'react-native';
import {db} from '../firebase';
import {uid} from 'uid'; 
import { onValue, ref, remove, set, update } from 'firebase/database';

const Display_detected_PN = () => {
    const [scannedPlateNumberList, setScannedPlateNumberList] = useState('');
    const [scannedCrimeList, setScannedCrimeList] = useState('');
    const [curLocList, setCurLocList] = useState('');
    const [curDateList, setCurDateList] = useState('');
    const [curTimeList, setCurTimeList] = useState('');
//read
    useEffect(() => {
        onValue(ref(db, `/Scanned`), (snapshot) => {
        const data = snapshot.val();
        if (data !== null) {
            Object.values(data).map((scanned) => {
                if(scanned.Apprehended === 'no'){
                    setScannedPlateNumberList(scanned.PlateNumber);
                    onValue(ref(db, `/Vehicle_with_criminal_offense/${scanned.PlateNumber}`), (snapshot) => {
                        const data = snapshot.val();
                        if (data !== null) {
                            setScannedCrimeList(data.criminalOffense);
                      }
                      });
                      setCurLocList(scanned.Location);
                      setCurDateList(scanned.Date);
                      setCurTimeList(scanned.Time);
                }
                
            });
        }
        });
        console.log("it worked");
    }, []);
  return (
    <View style={styles.box_container}>
        {scannedPlateNumberList === '' ?
            <Text style={styles.detected_PN}>none</Text>:
            <>
                <Text style={styles.detected_PN}>{scannedPlateNumberList}</Text>
                <Text style={styles.detected_PN_crime}>{scannedCrimeList}</Text>
                <Text style={styles.detected_PN_location}>{curLocList}</Text>
                <Text style={styles.detected_PN_date_time}>{curDateList} {curTimeList}</Text>
            </>
        }
        
    </View>
  )
}

const styles = StyleSheet.create({
    box_container: {
        height: 190,
        width: '100%',
        backgroundColor: '#2666FA',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },

    detected_PN: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },

    detected_PN_crime: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#BED1FE',
    },

    detected_PN_location: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 10
    },

    detected_PN_date_time: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#BED1FE',
    }
})

export default Display_detected_PN