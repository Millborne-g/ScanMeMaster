import React from 'react';
import { Button, StyleSheet, Text, View, Image, Touchable, TouchableOpacity  } from 'react-native';
import { useState } from 'react';

const BottonNav = ({setActiveScreen}) => {
    const [dashboard, setDashboard] = useState(true);
    const [list, setList] = useState(false);
    const [archive, setArchive] = useState(false);
    const [apprehended, setApprehended] = useState(false);
  return (
    
    <View style={styles.navigationBar}>
        <TouchableOpacity onPress={() => {
        setDashboard(!dashboard);
        setList(false);
        setArchive(false);
        setApprehended(false);
        setActiveScreen('Dashboard');
        }}>
        <View style={styles.optionContainer}>
            {
            dashboard?
            <Image source={require('../assets/dashboard-open.png')}/> :
            <Image source={require('../assets/dashboard-close.png')}/>
            }
        </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {
        setList(!list);
        setDashboard(false);
        setArchive(false);
        setApprehended(false);
        setActiveScreen('Vehicles_list');
        }}>
        <View style={styles.optionContainer}>
            {
            list? 
            <Image source={require('../assets/vehicle_list-open.png')}/> :
            <Image source={require('../assets/vehicle_list-close.png')}/>
            }
        </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {
        setArchive(!archive);
        setList(false);
        setDashboard(false);
        setApprehended(false);
        }}>
        <View style={styles.optionContainer}>
            {
            archive? 
            <Image source={require('../assets/archive-open.png')}/> :
            <Image source={require('../assets/archive-close.png')}/> 
            }
        </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {
        setApprehended(!apprehended);
        setArchive(false);
        setList(false);
        setDashboard(false);
        }}>
        <View style={styles.optionContainer}>
            {
            apprehended? 
            <Image source={require('../assets/apprehended-open.png')}/> :
            <Image source={require('../assets/apprehended-close.png')}/>
            }
        </View>
        </TouchableOpacity>

        <TouchableOpacity>
        <View style={styles.optionContainer}>
            <Image source={require('../assets/logout.png')}/>
        </View>
        </TouchableOpacity>
        
    </View>
  )
}

const styles = StyleSheet.create({
    navigationBar: {
      width: '100%',
      height: 85,
      backgroundColor: '#E4F1F8',
      position: 'absolute',
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'space-around',
      flexDirection: 'row',
    }
  
  })

export default BottonNav