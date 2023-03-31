import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput, Pressable, Animated, Touchable, TouchableOpacity, Alert} from 'react-native';
import Display_table_PN_list from '../components/Display_table_PN_list';
import Add_form_PN_list from '../components/Add_form_PN_list';
import Edit_form_PN_list from '../components/Edit_form_PN_list';
import Edit_PN_list from '../components/Edit_PN_list_popup';

import {db} from '../firebase';
import {uid} from 'uid'; 
import { onValue, ref, remove, set, update } from 'firebase/database';
import NetInfo from "@react-native-community/netinfo";

const Vehicles_list = ({user,setForm,setEditList,setPlateNumber}) => {
  return (
    <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTxt}>Vehicles with Crimin...</Text>
          <View style={styles.userContainer}> 
            <Text style={styles.userTxt}>{user}</Text> 
          </View>
        </View>
        {/**
        <View style={styles.search_bar_container}>
          <View style={styles.search_bar}>
            <View style={styles.search_bar_icon_container}>
              <Image style={styles.search_bar_icon} source={require('../assets/searchIcon.png')} />
            </View>
            <TextInput style={styles.search_bar_textfield} placeholder='Search'/>
          </View>
        </View>
         */}
        <View style={styles.display_PN_container}>
          <View style={styles.display_table_PN_list_container}>
            <Display_table_PN_list setEditList={setEditList} setPlateNumber={setPlateNumber}/>
          </View>
        </View>

        <View style={styles.btn_container}>
          <TouchableOpacity style={styles.addBtn} onPress=
            {user === 'LTO'?
            () => setForm(true):
            () => Alert.alert('Message', 'Only LTO personnel can add Vehicle with Criminal Offense.')
            }>
            <Text style={styles.btnText}>Add</Text>
          </TouchableOpacity>
        </View>
        
    </View>
    
   
  )
}

const styles = StyleSheet.create({

    container: {
      flex: 1,
    },
  
    header: {
      height: 90,
      backgroundColor: '#E4F1F8',
      paddingLeft: 30,
      paddingRight: 30,
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
    },
  
    headerTxt: {
      marginTop: '10%',
      fontSize: 20,
      fontWeight: 'bold'
    },
  
    userContainer :{
      backgroundColor: '#FFFFFF',
      width: 42,
      height: 34,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 8,
      elevation: 5,
      marginTop: '10%',
    },
  
    userTxt: {
      fontSize: 13,
      fontWeight: '800'
    },

    search_bar_container: {
      paddingLeft: 30,
      paddingRight: 30,
      marginTop: 25,
    },

    search_bar: {
      borderWidth: 1,
      borderColor: 'rgba(0, 0, 0, 0.4)',
      borderRadius: 10,
      paddingLeft: 40,
      paddingRight: 10,
      height: 45,
    },

    search_bar_icon_container: {
      position: 'absolute',
      left: 0,
      height: '100%',
      justifyContent: 'center',
    },

    search_bar_icon: {
      height: '60%',
      marginLeft: 8
    },

    search_bar_textfield: {
      fontSize: 16,
      height: '100%',
    },

    display_PN_container: {
      paddingLeft: 30,
      paddingRight: 30,
      marginTop: 20,
      height: '73%'
    },

    display_table_PN_list_container: {
      borderWidth: 0.5,
      borderRadius: 12,
      overflow: 'hidden',
    },

    btn_container: {
      paddingLeft: 30,
      paddingRight: 30,
      marginTop: 15
    },

  addBtn: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: '#2666FA',
  },

  btnText: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
    },

  addForm_popup:{
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 90,
    backgroundColor: '#FFFFFF'
  }
});  

export default Vehicles_list