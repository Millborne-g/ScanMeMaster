import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput, Pressable, Animated, Touchable, TouchableOpacity, Alert, ScrollView} from 'react-native';
import {Row, Rows, Table, TableWrapper} from 'react-native-table-component';
import Checkbox from 'expo-checkbox';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';

import {db} from '../firebase';
import {uid} from 'uid'; 
import { onValue, ref, remove, set, update } from 'firebase/database';


const PopupArchive = ({scannedPlateNumberDateTimeLoc,setPopupArchive}) => {
    const headers = ["Plate no.", "Crime", 'Confidence'];
    
    const [archiveRow, setArchiveRow] = useState([]);
    const [scannedImageLink, setScannedImageLink] =  useState('');
    const [scannedDetectedPN, setScannedDetectedPN] =  useState('');
    const [scannedCurLocNotification, setScannedCurLocNotification] =  useState('');
    const [scannedClosestMatches, setScannedClosestMatches] =  useState('');

    useEffect(() => {
        onValue(ref(db, `/Scanned`), (snapshot) => {
        setArchiveRow([]);
          const data = snapshot.val();
          if (data !== null) {
            Object.values(data).map((scanned) => {
                
                if(scanned.PlateNumber === scannedPlateNumberDateTimeLoc){
                   
                    setScannedImageLink(scanned.ImageLink);
                    setScannedDetectedPN(scanned.DetectedPN)
                    setScannedCurLocNotification(scanned.Location)
                    setScannedClosestMatches(scanned.ClosestMatches)
                }
              
            });
          }
        });

        

      }, [scannedPlateNumberDateTimeLoc]);

      useEffect(() => {
        try{
            setArchiveRow([])

            try{
                const string = scannedClosestMatches;
                const str = string.replace(/'/g, '"');
                const arr = JSON.parse(str.replace(/\(/g, "[").replace(/\)/g, "]"));
                // console.log(arr);
                const filteredData = arr.filter(item => parseInt(item[2]) >= 60);
                if (filteredData.length > 0) {
                    const modifiedData = filteredData.map(item => {
                    var confidenceLevel = <View></View>;
                    if (parseInt(item[2]) >= 60 && parseInt(item[2]) <= 75) {
                        confidenceLevel = <View style={styles.confidenceLevel_yellow}><Text style={styles.confidenceLevelText}>{item[2]}%</Text></View>;
                    } else if (parseInt(item[2]) > 75) {
                        confidenceLevel = <View style={styles.confidenceLevel_green}><Text style={styles.confidenceLevelText}>{item[2]}%</Text></View>;
                    }
                    return [item[0], item[1], confidenceLevel];
                    });
                    setArchiveRow(modifiedData);
                } 
                // console.log('modified ', modifiedData);
                
                //   setArchiveRow(modifiedData)

              }catch(e){
                console.log('error inside '+e)

              }
            // setArchiveRow(arr)
            // console.log('ssssssssssssssssssssssss '+archiveRow)
            

        }catch(e){
            console.log('error '+e)

          }

      },[scannedClosestMatches])


    const handleSubmitChange = () => {
        setPopupArchive(false);
      };
  return (
    <View style={styles.notificationContainer}>
        <View style={styles.modal}>
            <View style={styles.top_indcator}>
                <Text style={styles.top_indcator_text}>Archive</Text>
            </View>
            <View style={styles.img_bg}>
                {/* <Image style={styles.warning_img} source={{uri: 'https://firebasestorage.googleapis.com/v0/b/scanmemaster-9da58.appspot.com/o/2023-04-29%2017%3A50%3A22%20NBC1234.jpg?alt=media'}}/> */}
                <Image style={styles.warning_img} source={{uri: scannedImageLink}}/>

            </View>
            <View style={styles.img_bg_cover}>
                    <LinearGradient
                        colors={['rgba(255, 255, 255, 0.03)', '#FFFFFF']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        style={{ height: '40%', width: '100%', position: 'absolute', bottom:0 }}
                    />
                </View>
            {/* <View style={styles.warning_img_bg}>
            {
                scannedColor === 'yellow' ? 
                <Image style={styles.warning_img} source={require('../assets/yellow.png')}/>:
                <Image style={styles.warning_img} source={require('../assets/red.png')}/>
                }
            </View> */}
            <Text style={styles.plate_Number_Label}>Converted:</Text> 
            {/* <Text style={styles.plate_Number}>NBC-XXX</Text>  */}
            <Text style={styles.plate_Number}>{scannedDetectedPN}</Text> 
            <Text style={styles.location_Label}>Location:</Text> 
            {/* <Text style={styles.location}>Lapasan Zone 4</Text> */}
            <Text style={styles.location}>{scannedCurLocNotification}</Text>
            <Text style={styles.crime_Label}>Closest Match:</Text>
            <View style={styles.Display_archive_table_matches_dashboard_container}>
            <View style={styles.box_container}>
        
            <Table >
                    <Row
                        data={headers}
                        height={40}
                        flexArr={[1.3,1.2,1.2]}
                        
                        textStyle={{
                            paddingLeft: 10,
                            color: '#9F9F9F',
                            fontSize: 13,
                            
                        }}
                        style={{
                            backgroundColor: '#F0F0F0',
                            top: 0,
                            width: '100%',
                            borderBottomWidth: 0.5,
                            borderColor: '#9F9F9F',
                            paddingLeft: -3,
                            paddingRight: 3
                        }}
                    />
                </Table>
            <ScrollView style={{marginTop: -1}}>
                {/* { listEmpty? 
                <View style={styles.noDataAvailable}>
                    <Text>
                        No Data Available
                    </Text>
                </View> : */}
                <Table >
                    <TableWrapper style={{
                        flexDirection: 'row',
                        }}>
                        <Rows 
                            data={archiveRow} 
                            height={60} 
                            flexArr={[1.3,1.2,1.2]}
                            textStyle={{
                                paddingLeft: 10,
                                paddingRight: 10,
                                fontSize: 13
                            }}

                            style={{
                                borderBottomWidth: 0.5,
                                borderColor: '#9F9F9F',
                                paddingLeft: -3,
                                paddingRight: 3
                            }}
                            /> 
                    </TableWrapper>
                </Table>
            {/* } */}
                
            </ScrollView>
        </View> 
        </View>
            <Pressable style={styles.okBtn} onPress={()=>handleSubmitChange()}>
                <View style={styles.okBtnBg}></View>
                <MaterialCommunityIcons name="close" size={45} color={"white"} />
                
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

    top_indcator:{
        height: 80,
        width: 130,
        position:'absolute',
        marginTop: '-12%',
        top: 1,
        left: 0,
        // zIndex: 1,
        backgroundColor: '#2666FA',
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent:'center',
        textAlign:'center'
    },

    top_indcator_text:{
        color: 'white',
        fontSize: 20,
        fontWeight: '600',
        marginTop: '-10%'
    },

    modal:{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        width: 332,
        borderRadius: 10,
        paddingBottom: 20,
        paddingTop: 20,
        position: 'absolute',
        margin: 'auto',
        // overflow: 'hidden',
        // marginTop: 1000,
    },

    plate_Number_Label:{
        fontSize: 16,
        color: '#9F9F9F',
        marginTop: -24
    },

    plate_Number:{
        fontSize: 28,
        fontWeight: '900',
        color: '#252727',
        marginBottom: 10,
        
    },

    crime_Label:{
        fontSize: 16,
        color: '#9F9F9F',
        marginBottom: 10,
    },

    crime:{
        fontSize: 32,
        fontWeight: 'bold',
        color: '#252727',
        marginBottom: 10,
    },

    location_Label:{
        fontSize: 16,
        color: '#9F9F9F'
    },

    location:{
        fontSize: 28,
        fontWeight: '900',
        color: '#252727',
        marginBottom: 20,
        marginBottom: 10,
    },

    btnText: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },

    okBtnBg:{
        height: 45,
        width: 45,
        borderRadius: 100,
        opacity: 0.4,
        position: 'absolute',
        backgroundColor: '#000000',
    },

    okBtn:{
        position: 'absolute',
        top: '2%',
        right: '2%'
    },

    

    warning_img_bg:{
        marginTop: "-20%" ,
        marginBottom: 10,
        backgroundColor: 'white',
        height: 130,
        width: 130,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,

    },

    img_bg:{
        width: '100%',
        height: 140,
        position: 'absolute',
        top: 0,
        // backgroundColor: 'red'
    },

    warning_img:{
        height: '100%',
        width: '100%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        // height: 170,
        // width: 332,
        
    },

    img_bg_cover:{
        width: '100%',
        position: 'relative',
        height: 140,
        marginTop: -20
    },



    Display_archive_table_matches_dashboard_container: {
        borderWidth: 0.5,
        borderRadius: 12,
        overflow: 'hidden',
        height: 290,
        
        width: '80%'
      },
    
    box_container: {
        height: '100%',
    },
    
    confidenceLevel_yellow:{
        backgroundColor: '#FFC048',
        padding: 10,
        justifyContent: 'center',
        alignItems:'center',
        borderRadius: 50,
        width: '90%'
    },

    confidenceLevel_green:{
        backgroundColor: '#3B9A45',
        padding: 10,
        justifyContent: 'center',
        alignItems:'center',
        borderRadius: 50,
        width: '90%'
    },

    confidenceLevelText:{
        color:'white',
        
    }

})

export default PopupArchive