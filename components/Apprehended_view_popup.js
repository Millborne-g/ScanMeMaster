import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput, Pressable, Animated, Touchable, TouchableOpacity, Alert} from 'react-native';
import Checkbox from 'expo-checkbox';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const Apprehended_view_popup = ({setShowApprehendedDetails}) => {
  return (
    <View style={styles.notificationContainer}>
        <View style={styles.modal}>
            <Text style={styles.plate_Number_Label}>Plate number:</Text> 
            <Text style={styles.plate_Number}>123-xxx</Text> 
            <Text style={styles.crime_Label}>Criminal Offense:</Text> 
            <Text style={styles.crime}>Carnap</Text> 
            <Text style={styles.date_time_Label}>Date/Time:</Text> 
            <Text style={styles.date_time}>02-05-23</Text> 
            <Text style={styles.date_time}>8:15:30 am</Text> 
            <Text style={styles.location_Label}>Location:</Text> 
            <Text style={styles.location}>Lapasan zone 2</Text> 

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

    okBtn:{
        position: 'absolute',
        top: '2%',
        right: '2%'
    },

})

export default Apprehended_view_popup