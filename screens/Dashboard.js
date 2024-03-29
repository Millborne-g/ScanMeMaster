import React, { useState, useEffect, useRef } from 'react';
import { Button, StyleSheet, Text, View, Image, Touchable, TouchableOpacity } from 'react-native';
import Display_detected_PN_dashboard from '../components/Display_detected_PN_dashboard';
import Display_archive_table_PN_dashboard from '../components/Display_archive_table_PN_dashboard';
import Recently_scanned_vehicle_location from '../components/Recently_scanned_vehicle_location_popup';
import NetInfo from "@react-native-community/netinfo";
import Loader from '../components/loader';
const Dashboard = ({user, click_Vehicle_List, setViewLocArchive,setScannedPlateNumberDateTimeLoc,setLoading,setPopupArchive}) => {
  const [dashboard, setDashboard] = useState(true);
  const [list, setList] = useState(false);
  const [archive, setArchive] = useState(false);
  const [apprehended, setApprehended] = useState(false);
  const [loadingDashboard, setLoadingDashboard] = useState(true);
  return (
    <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTxt}>Dashboard</Text>
          <View style={styles.userContainer}> 
            <Text style={styles.userTxt}>{user}</Text> 
          </View>
        </View>
        <View style={styles.display_PN_container}>
          <Text style={styles.label}>Recently Detected Vehicle</Text>
          <Display_detected_PN_dashboard />
        </View >

        <View style={styles.display_PN_container}>
          {/**
          <View style={styles.list_label_container}>
            <Text style={styles.label}>Vehicles with Criminal Offense</Text>
            
            <TouchableOpacity onPress={()=>{navigation.navigate("Vehicles_List")}}>
              <Text style={styles.view_all_text}>View All</Text>
            </TouchableOpacity>
             
          </View>
          */}
          <View style={styles.Display_archive_table_PN_dashboard_container}>
          
            <Display_archive_table_PN_dashboard setViewLocArchive={setViewLocArchive} setScannedPlateNumberDateTimeLoc={setScannedPlateNumberDateTimeLoc} setLoading={setLoading} setLoadingDashboard={setLoadingDashboard} setPopupArchive={setPopupArchive}/>
          </View>
          
        </View >

        {loadingDashboard && 
    
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

  navigationBar: {
    width: '100%',
    height: 85,
    backgroundColor: '#E4F1F8',
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row'
  },

  display_PN_container: {
    paddingLeft: 30,
    paddingRight: 30,
    marginTop: 15
  },

  list_label_container: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  label: {
    fontSize: 15,
    color: '#9F9F9F',
    marginBottom: 10
  },

  view_all_text: {
    fontSize: 15,
    color: '#2666FA',
  },

  Display_archive_table_PN_dashboard_container: {
    borderWidth: 0.5,
    borderRadius: 12,
    overflow: 'hidden',
    height: '67%'
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
  

})

export default Dashboard