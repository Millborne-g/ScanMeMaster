import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput, Pressable, Animated, Touchable, TouchableOpacity, Alert} from 'react-native';
import Checkbox from 'expo-checkbox';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {db} from '../firebase';
import {uid} from 'uid'; 
import { onValue, ref, remove, set, update } from 'firebase/database';


const Apprehended_view_popup = ({setShowApprehendedDetails, viewPlateNumber, setViewPlateNumberDetails}) => {
    const [plateNumber ,setPlateNumber] = useState('')
    const [crime ,setCrime] = useState('')
    const [date ,setDate] = useState('')
    const [time ,setTime] = useState('')
    const [locaton ,setLocaton] = useState('')

    //read
    useEffect(() => {
        onValue(ref(db, `/Apprehended_Vehicle_with_criminal_offense/${viewPlateNumber}`), (snapshot) => {
          const data = snapshot.val();
          setCrime(data.criminalOffense)
          console.log("viewPlateNumber "+data.criminalOffense);
          onValue(ref(db, `/ScannedApprehended`), (snapshot) => {
            const data = snapshot.val();
            if (data !== null) {
              Object.values(data).map((viewed) => {
                if(viewed.PlateNumber === viewPlateNumber){
                    setDate(viewed.Date);
                    setTime(viewed.Time)
                    setLocaton(viewed.Location);
                }
              });
            }
          });
        });
      }, []);
  return (
    <View style={styles.notificationContainer}>
        <View style={styles.modal}>
            <Text style={styles.plate_Number_Label}>Plate number:</Text> 
            <Text style={styles.plate_Number}>{viewPlateNumber.split("_")[1]}</Text> 
            <Text style={styles.crime_Label}>Criminal Offense:</Text> 
            <Text style={styles.crime}>{crime}</Text> 
            <Text style={styles.date_time_Label}>Date/Time:</Text> 
            <Text style={styles.date_time}>{date}</Text> 
            <Text style={styles.date_time}>{time}</Text> 
            <Text style={styles.location_Label}>Location:</Text> 
            <Text style={styles.location}>{locaton}</Text> 

            <TouchableOpacity style={styles.Btn} onPress={()=>setViewPlateNumberDetails(true)}>
                <Text style={styles.btnText}>View More</Text>
            </TouchableOpacity>

            <Pressable style={styles.okBtn} onPress={()=>setShowApprehendedDetails(false)}>
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
        marginBottom: '5%'
    },

    crime_Label:{
        fontSize: 16,
        color: '#9F9F9F'
    },

    crime:{
        fontSize: 32,
        fontWeight: 'bold',
        color: '#252727',
        marginBottom: '5%'
    },

    date_time_Label:{
        fontSize: 16,
        color: '#9F9F9F'
    },

    date_time: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#252727',
    },

    location_Label:{
        fontSize: 16,
        color: '#9F9F9F',
        marginTop: '5%'
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

    okBtn:{
        position: 'absolute',
        top: '2%',
        right: '2%'
    },

})

export default Apprehended_view_popup