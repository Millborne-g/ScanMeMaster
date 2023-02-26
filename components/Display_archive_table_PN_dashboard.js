import React, { useState, useEffect, useRef } from 'react';
import { Button, StyleSheet, Text, View, Image, Touchable, TouchableOpacity, ScrollView } from 'react-native';
import {Row, Rows, Table, TableWrapper} from 'react-native-table-component';

import {db} from '../firebase';
import {uid} from 'uid'; 
import { onValue, ref, remove, set, update } from 'firebase/database';

const Display_archive_table_PN_dashboard = ({setViewLocArchive,setScannedPlateNumberDateTimeLoc}) => {

    const headers = ["Plate No.", 'Crime', 'Location'];
    const [archiveRow, setArchiveRow] = useState([]);
    const prevDataRef = useRef(null); // store previous data
    useEffect(() => {
        let exist = '';
        let count = 0;
        onValue(ref(db, `/Scanned`), (snapshot) => {
        count = 0;
        const data = snapshot.val();
        setArchiveRow([]);
        if (data !== null) {
            Object.values(data).map((scanned) => {
                let crime = '';
                onValue(ref(db, `/Vehicle_with_criminal_offense/${scanned.PlateNumber}`), (snapshot) => {
                    const data = snapshot.val();
                    if (data !== null) {
                        crime = data.criminalOffense;
                  }
                  });
                  if(scanned.Apprehended === "no"){
                    if(count === 0){
                        setArchiveRow((oldArray) => [...oldArray, [scanned.PlateNumber, crime, [
                            <TouchableOpacity onPress={()=>{
                                setViewLocArchive(true);
                                setScannedPlateNumberDateTimeLoc(scanned.PlateNumber);
                                }
                                }> 
                                <Text style={styles.viewText}>View</Text>
                            </TouchableOpacity>
                                ]
                        ]]);
                        count++
                   }
                  else if(prevDataRef.current === null || prevDataRef.current !== scanned.PlateNumber){
                    setArchiveRow((oldArray) => [...oldArray, [scanned.PlateNumber, crime, [
                        <TouchableOpacity onPress={()=>{
                            setViewLocArchive(true);
                            setScannedPlateNumberDateTimeLoc(scanned.PlateNumber);
                            }
                            }> 
                            <Text style={styles.viewText}>View</Text>
                        </TouchableOpacity>
                            ]
                       ]]);
                  }
                  prevDataRef.current = scanned.PlateNumber;
                  }
                   

            })
            
        }
        });
    }, []);
  return (
    <View style={styles.box_container}>
        <Table >
                <Row
                    data={headers}
                    height={40}
                    flexArr={[1,1,1]}
                    
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
                        data={archiveRow} 
                        height={50} 
                        flexArr={[1,1,1]}
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
    
  )
}

const styles = StyleSheet.create({
    box_container: {
        height: '100%',
    },

    viewText: {
        color: '#2666FA',
    }
})

export default Display_archive_table_PN_dashboard