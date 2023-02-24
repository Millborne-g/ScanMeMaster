import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput, Pressable, Animated, Touchable, TouchableOpacity, Alert} from 'react-native';
import Checkbox from 'expo-checkbox';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Edit_PN_list_popup = ({setEditList , setEditForm, user}) => {

  const click_Apprehended_Delete = (text) =>{
    alert(text);
    setEditList(false);
  }
  return (
    <View style={styles.notificationContainer}>
        <View style={styles.modal}>
            <Text style={styles.plate_Number_Label}>Plate number:</Text> 
            <Text style={styles.plate_Number}>123-xxx</Text>

            <Pressable style={{...styles.Btn, ...styles.apprehendedBtn}} onPress={()=>click_Apprehended_Delete('Vehicle Apprehended!')}>
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
                ()=>click_Apprehended_Delete('Vehicle Deleted Successfully!'):
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