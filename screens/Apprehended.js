import React, { useState, useEffect, useRef } from 'react';
import { Button, StyleSheet, Text, View, Image, Pressable, Touchable, TouchableOpacity, TextInput } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import Display_table_PN_apprehended_list from '../components/Display_table_PN_apprehended_list';
import Loader from '../components/loader';

const Archive = ({user,setShowApprehendedDetails, setViewPlateNumber}) => {
  const [isInternetConnected, setIsInternetConnected] = useState(false);
  const [loadingApprehended, setLoadingApprehended] = useState(true);
  useEffect(()=>{
    NetInfo.addEventListener(state => {
        console.log("Connection type", state.type);
        console.log("Is connected?", state.isConnected);
        setIsInternetConnected(state.isConnected);
    });
    if(isInternetConnected === false){
      console.log('isInternetConnected '+isInternetConnected);
    }
  },[])
  return (
    <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTxt}>Apprehended</Text>
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
            <Display_table_PN_apprehended_list setShowApprehendedDetails={setShowApprehendedDetails} setViewPlateNumber={setViewPlateNumber} setLoadingApprehended={setLoadingApprehended}/>
          </View>
        </View>

        {loadingApprehended && 
    
          <View style={styles.loaderContainer}>
            <View style={styles.loaderContainerBG}>
            </View>
            <Loader/>
          </View>
          }
        
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
      height: '80%'
    },

    display_table_PN_list_container: {
      borderWidth: 0.5,
      borderRadius: 12,
      overflow: 'hidden',
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
      backgroundColor: 'rgba(0, 0, 0, 0.3)'
    }
}); 

export default Archive