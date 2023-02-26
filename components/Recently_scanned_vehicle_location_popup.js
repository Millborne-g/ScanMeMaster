import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput, Pressable, Animated, Touchable, TouchableOpacity, ScrollView} from 'react-native';
import {Row, Rows, Table, TableWrapper} from 'react-native-table-component';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {db} from '../firebase';
import {uid} from 'uid'; 
import { onValue, ref, remove, set, update } from 'firebase/database';

const Recently_scanned_vehicle_location_popup = ({setViewLocArchive, scannedPlateNumberDateTimeLoc}) => {
    const headers = ["Date/Time", 'Location'];
    const rows = [
        ['02-05-23\n8:15:30 am', 'Lapasan Zone 2'],
        ['02-05-23\n8:15:30 am', 'Lapasan Zone 2'],
        ['02-05-23\n8:15:30 am', 'Lapasan Zone 2'],
        ['02-05-23\n8:15:30 am', 'Lapasan Zone 2'],
        ['02-05-23\n8:15:30 am', 'Lapasan Zone 2'],
        ['02-05-23\n8:15:30 am', 'Lapasan Zone 2'],
        ['02-05-23\n8:15:30 am', 'Lapasan Zone 2'],
        ['02-05-23\n8:15:30 am', 'Lapasan Zone 2'],
        ['02-05-23\n8:15:30 am', 'Lapasan Zone 2'],
        ['02-05-23\n8:15:30 am', 'Lapasan Zone 2'],
        ['02-05-23\n8:15:30 am', 'Lapasan Zone 2'],
        ['02-05-23\n8:15:30 am', 'Lapasan Zone 2'],
        ['02-05-23\n8:15:30 am', 'Lapasan Zone 2'],
    ]

    const [dateTimeLocRow, setDateTimeLocRow] = useState();
    useEffect(() => {
        onValue(ref(db, `/Scanned`), (snapshot) => {
        setDateTimeLocRow([]);
        const data = snapshot.val();
        if (data !== null) {
            Object.values(data).map((scanned) => {
                console.log(scanned.PlateNumber)

                if(scanned.PlateNumber === scannedPlateNumberDateTimeLoc){
                    setDateTimeLocRow((oldArray) => [...oldArray, [scanned.Date+'\n'+scanned.Time, scanned.Location]]);
                }
            })
            
        }
        });
    }, []);
  return (
    <View style={styles.notificationContainer}>
        <View style={styles.modal}>
            <Text style={styles.plate_Number_Label}>Plate number:</Text> 
            <Text style={styles.plate_Number}>{scannedPlateNumberDateTimeLoc}</Text>  

            <View style={styles.location_table_container}>
                <Table>
                    <Row
                        data={headers}
                        height={40}
                        flexArr={[1,1]}
                        
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
                        }}
                    />
                </Table>
                <ScrollView style={{marginTop: -1}}>
                    <Table >
                        <TableWrapper style={{
                            flexDirection: 'row',
                            }}>
                            <Rows 
                                data={dateTimeLocRow} 
                                height={50} 
                                flexArr={[1,1]}
                                textStyle={{
                                    paddingLeft: 10,
                                    fontSize: 15
                                }}

                                style={{
                                    borderBottomWidth: 0.5,
                                    borderColor: '#9F9F9F',
                                }}
                                /> 
                        </TableWrapper>
                    </Table>
                </ScrollView>
            </View>

            <Pressable style={styles.okBtn} onPress={()=>setViewLocArchive(false)}>
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
        height: '60%',
        width: 332,
        borderRadius: 10,
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
        
    },

    location_Label:{
        fontSize: 16,
        color: '#9F9F9F'
    },

    location:{
        fontSize: 32,
        fontWeight: 'bold',
        color: '#252727',
       
        
    },

    okBtn:{
        position: 'absolute',
        top: '2%',
        right: '2%'
    },

    btnText: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },

    location_table_container: {
        height: '65%',
        width: '80%',
        borderWidth: 0.5,
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: '5%'
    }

})
export default Recently_scanned_vehicle_location_popup