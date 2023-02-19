import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput, Pressable, Animated, Touchable, TouchableOpacity, Alert} from 'react-native';
import Checkbox from 'expo-checkbox';

const Apprehended_notification = () => {
  return (
    <View style={styles.notificationContainer}>
        {/**
         * Edit the style names!!!!!
         * 
         */}
        <View style={styles.modal}>
            <Text style={styles.plate_Number_Label}>Plate number:</Text> 
            <Text style={styles.plate_Number}>123-xxx</Text>  
            <Text style={styles.location}>Does this vehicle Apprehended?</Text> 

            <View style={styles.btns_Container}>
            <Pressable style={styles.saveBtn} onPress={() => alert("Vehicle saved!") }>
              <Text style={styles.btnText}>Yes</Text>
            </Pressable>
            <Pressable style={styles.cancelBtn} onPress={() => setForm(false) }>
              <Text style={styles.btnText}>No</Text>
            </Pressable>
          </View>
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
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
        
    },

    okBtn:{
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#2666FA',
    },

    btns_Container:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
      },
    
      saveBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#2666FA',
        width: 125
      },
    
      cancelBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#FC3E3E',
        width: 125
      },
    
      btnText:{
        fontSize: 16,
          lineHeight: 21,
          fontWeight: 'bold',
          letterSpacing: 0.25,
          color: 'white',
      },
})

export default Apprehended_notification