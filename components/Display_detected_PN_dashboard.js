import React, { useState, useEffect, useRef } from 'react';
import { Button, StyleSheet, Text, View, Image, Touchable, TouchableOpacity } from 'react-native';
import {db} from '../firebase';
import {uid} from 'uid'; 
import { onValue, ref, remove, set, update } from 'firebase/database';

const Display_detected_PN = () => {
    const [scannedPlateNumberList, setScannedPlateNumberList] = useState('');
    const [scannedDetectedPNList, setScannedDetectedPNList] = useState('');
    const [scannedCrimeList, setScannedCrimeList] = useState('');
    const [curLocList, setCurLocList] = useState('');
    const [curDateList, setCurDateList] = useState('');
    const [curTimeList, setCurTimeList] = useState('');
    const [scannedPNImage, setScannedPNImage] = useState('');
    const [scannedMatchPN, setScannedMatchPN] = useState('');
    const [scannedMatchPNCL, setScannedMatchPNCL] = useState('');
//read
    useEffect(() => {
        onValue(ref(db, `/Scanned`), (snapshot) => {
        const data = snapshot.val();
        if (data !== null) {
            Object.values(data).map((scanned) => {
                if(scanned.Apprehended === 'no'){
                    setScannedPlateNumberList(scanned.PlateNumber);
                    setScannedDetectedPNList(scanned.DetectedPN)
                    let crime = '';
                    onValue(ref(db, `/Vehicle_with_criminal_offense/${scanned.PlateNumber}`), (snapshot) => {
                        const data = snapshot.val();
                        if (data !== null) {
                            setScannedCrimeList(data.criminalOffense);
                            // console.log('hereeeeeeeeeeeeeee '+data.criminalOffense+' '+data.plateNumber+' '+scanned.PlateNumber)
                        }
                      });

                      try{
                        const string = scanned.ClosestMatches
                        const str = string.replace(/'/g, '"');
                        const arr = JSON.parse(str.replace(/\(/g, "[").replace(/\)/g, "]"))
                        // console.log(arr);
                        setScannedMatchPN(arr[0][0])
                        setScannedMatchPNCL(arr[0][2])

                      }catch(e){

                      }
                      
                      
                      

                      setCurLocList(scanned.Location);
                      setCurDateList(scanned.Date);
                      setCurTimeList(scanned.Time);
                      setScannedPNImage(scanned.ImageLink)
                      

                }
            });
        }
        });
        // console.log("it worked");
    }, [scannedCrimeList]);
  return (
    <View style={styles.box_container}>
        {scannedPlateNumberList === '' ?
            <Text style={styles.none}>none</Text>:
            <>
                <View style={styles.detected_PN_upper}>
                    <Text style={styles.detected_PN_location}>{curLocList}</Text>
                    <Text style={styles.detected_PN_date_time}>{curDateList} {curTimeList}</Text>
                </View>

                <View style={styles.detected_PN_image_results}>
                    <View style={styles.image_results}>
                    {/* <Text style={styles.detected_PN_match_label}>Conversion:</Text> */}
                    <Image style={styles.pnImg} source={{uri: scannedPNImage}}/>

                    </View>
                    <View style={styles.results}>
                        <Text style={styles.detected_PN_match_label}>Converted:</Text>
                        <Text style={styles.detected_PN_match}>{scannedDetectedPNList}</Text>
                        <Text style={styles.detected_PN_match_label}>Match:</Text>
                        <Text style={styles.detected_PN_match}>{scannedMatchPN}</Text>
                        <Text style={styles.detected_PN_match_label}>Crime:</Text>
                        <Text style={styles.detected_PN_match}>{scannedCrimeList}</Text>
                        

                    </View>
                    {[
                        parseInt(scannedMatchPNCL) >= 60 && parseInt(scannedMatchPNCL) < 75  ?
                            <View style={styles.confidence_level_container_yellow}>
                                <Text style={styles.confidence_level_label}>Confidence:</Text>
                                <Text style={styles.confidence_level}>{scannedMatchPNCL}%</Text>
                            </View> 
                            : parseInt(scannedMatchPNCL) >= 75 ?
                            <View style={styles.confidence_level_container_green}>
                                <Text style={styles.confidence_level_label}>Confidence:</Text>
                                <Text style={styles.confidence_level}>{scannedMatchPNCL}%</Text>
                            </View> : ''
                    ]}
                    
                </View>
                {/* <Text style={styles.detected_PN}>{scannedDetectedPNList}</Text>
                <Text style={styles.detected_PN_match}>({scannedPlateNumberList})</Text>
                <Text style={styles.detected_PN_crime}>{scannedCrimeList}</Text>
                <Text style={styles.detected_PN_location}>{curLocList}</Text>
                <Text style={styles.detected_PN_date_time}>{curDateList} {curTimeList}</Text> */}
            </>
        }
        
    </View>
  )
}

const styles = StyleSheet.create({
    box_container: {
        height: 225,
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        alignItems: 'center',
        paddingBottom: 17,
        elevation: 6,
    },

    detected_PN_upper:{
        backgroundColor: '#003AC1',
        width: '100%',
        marginTop: -6,
        marginBottom: 12,
        borderTopEndRadius: 15,
        borderTopLeftRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 5,
        paddingBottom: 5
    },

    // <View style={styles.detected_PN_image_results}>
    //                 <View style={styles.image_results}></View>
    //                 <View style={styles.results}></View>
    //             </View>

    detected_PN_image_results:{
        width: '95%',
        // height: 130,
        // backgroundColor: 'red',
        flexDirection: 'row'
    },

    image_results:{
        flex: 1.2,
        // height: '100%',
        width: '100%',
        // backgroundColor: 'red',
        justifyContent: 'center',
        alignItems:'center',
        borderWidth: 0.5,
        borderRadius: 12,
        backgroundColor: '#222222'
    },

    pnImg:{
        height: 50,
        width: 140,
        marginRight: '-2%'
    },

    results:{
        flex: 1,
        height: '100%',
        width: '100%',
        // backgroundColor: '#FFC048',
        alignItems:'center',
        // borderWidth: 0.5
    },

    confidence_level_container_green:{
        position: 'absolute',
        right: '-11%',
        top: '-18%',
        height: 60,
        width: 60,
        borderRadius: 100,
        backgroundColor: '#3B9A45',
        justifyContent: 'center',
        alignItems:'center',
        elevation: 6
    },

    confidence_level_container_yellow:{
        position: 'absolute',
        right: '-11%',
        top: '-18%',
        height: 60,
        width: 60,
        borderRadius: 100,
        backgroundColor: '#FFC048',
        justifyContent: 'center',
        alignItems:'center',
        elevation: 6
    },

    confidence_level_label:{
        color: '#FFFFFF',
        fontSize: 7
    },

    confidence_level:{
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '800'
    },

    none:{
        fontSize: 48,
        fontWeight: 'bold',
        color: '#000000',
        marginTop: '25%'
    },


    detected_PN: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#000000',
        marginTop: '-3%'
    },

    detected_PN_match_label:{
        color: '#777777',
        fontSize: 12
    },

    detected_PN_match: {
        fontSize: 20,
        fontWeight: '800',
        color: '#000000',
        marginBottom: 5
    },

    detected_PN_crime: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#BED1FE',
    },

    detected_PN_location: {
        fontSize: 15,
        fontWeight: '800',
        color: '#FFFFFF',
        marginBottom: 2
    },

    detected_PN_date_time: {
        fontSize: 15,
        fontWeight: '800',
        color: '#FFFFFF',
    }
})

export default Display_detected_PN