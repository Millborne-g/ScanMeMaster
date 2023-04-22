import React, { useState, useEffect, useRef } from 'react';
import { Button, StyleSheet, Text, View, Image, Touchable, TouchableOpacity, ScrollView } from 'react-native';
import {Row, Rows, Table, TableWrapper} from 'react-native-table-component';

import {db} from '../firebase';
import {uid} from 'uid'; 
import { onValue, ref, remove, set, update } from 'firebase/database';

const Display_archive_table_PN_dashboard = ({setViewLocArchive,setScannedPlateNumberDateTimeLoc,setLoading}) => {

    const headers = ["Date/Time", "Plate No.", 'Crime', 'Location'];
    const [archiveRow, setArchiveRow] = useState([]);
    const [listEmpty, setListEmpty] = useState(true);

    const prevDataRef = useRef(null); // store previous data
    useEffect(() => {
        let exist = '';
        let count = 0;
        onValue(ref(db, `/Scanned`), (snapshot) => {
            count = 0;
            const data = snapshot.val();
            setArchiveRow([]);
            if (data !== null) {
                setLoading(false)
                setListEmpty(false)
                const reversedData = Object.values(data).reverse();
                reversedData.map((scanned) => {
                    // let crime = '';
                    // onValue(ref(db, `/Vehicle_with_criminal_offense/${scanned.PlateNumber}`), (snapshot) => {
                    //     const data = snapshot.val();
                    //     if (data !== null) {
                    //         crime = data.criminalOffense;
                    //   }
                    //   });
                      if(scanned.Apprehended === "no"){
                      setArchiveRow((oldArray) => [...oldArray, [scanned.Date+'/ \n'+scanned.Time,scanned.DetectedPN+'\n'+'('+scanned.PlateNumber+')', scanned.CriminalOffense, scanned.Location]]);
                        // <TouchableOpacity onPress={()=>{
                        //     setViewLocArchive(true);
                        //     setScannedPlateNumberDateTimeLoc(scanned.PlateNumber);
                        //     }
                        //     }> 
                        //     <Text style={styles.viewText}>View</Text>
                        // </TouchableOpacity>
                    //         ]
                    //    ]]);
                    }
        // onValue(ref(db, `/ScannedPlateNumber`), (snapshot) => {
        // count = 0;
        // const data = snapshot.val();
        // setArchiveRow([]);
        // if (data !== null) {
        //     Object.values(data).map((scanned) => {
        //         // let crime = '';
        //         // onValue(ref(db, `/Vehicle_with_criminal_offense/${scanned.PlateNumber}`), (snapshot) => {
        //         //     const data = snapshot.val();
        //         //     if (data !== null) {
        //         //         crime = data.criminalOffense;
        //         //   }
        //         //   });
        //           if(scanned.Apprehended === "no"){
        //           setArchiveRow((oldArray) => [...oldArray, [scanned.PlateNumber, scanned.CriminalOffense, [
        //             <TouchableOpacity onPress={()=>{
        //                 setViewLocArchive(true);
        //                 setScannedPlateNumberDateTimeLoc(scanned.PlateNumber);
        //                 }
        //                 }> 
        //                 <Text style={styles.viewText}>View</Text>
        //             </TouchableOpacity>
        //                 ]
        //            ]]);
        //         }

                  //Naay ga doble if e display
                //   if(scanned.Apprehended === "no"){
                //     console.log(archiveRow.length)
                //     if(archiveRow.length === 0){
                //         setArchiveRow((oldArray) => [...oldArray, [scanned.PlateNumber, crime, [
                //             <TouchableOpacity onPress={()=>{
                //                 setViewLocArchive(true);
                //                 setScannedPlateNumberDateTimeLoc(scanned.PlateNumber);
                //                 }
                //                 }> 
                //                 <Text style={styles.viewText}>View</Text>
                //             </TouchableOpacity>
                //                 ]
                //            ]]);
                //     }
                //     else{
                //         archiveRow.map((item)=>{
                //             if(item[0]!==scanned.PlateNumber){
                //                 console.log('item ds'+ item[0]);
                //                 setArchiveRow((oldArray) => [...oldArray, [scanned.PlateNumber, crime, [
                //                     <TouchableOpacity onPress={()=>{
                //                         setViewLocArchive(true);
                //                         setScannedPlateNumberDateTimeLoc(scanned.PlateNumber);
                //                         }
                //                         }> 
                //                         <Text style={styles.viewText}>View</Text>
                //                     </TouchableOpacity>
                //                         ]
                //                    ]]);
                //             }
                //         })
                        
                //     }
                    
                //         //const isValueExists = archiveRow.find((row) => row.includes(scanned.PlateNumber)) !== undefined;
                //         //const isValueExists = archiveRow.find((row) => JSON.stringify(row) === JSON.stringify(scanned.PlateNumber)) !== undefined;
                // //         let isValueExists = false;
                // //             archiveRow.map((item) =>{
                // //                 console.log('item '+item[0])
                // //                 if(item[0] === scanned.PlateNumber){
                // //                     isValueExists = true;
                // //                 }
                // //             });
                // //         console.log('scanned.PlateNumber '+isValueExists);
                // //         if (isValueExists === true) {
                // //             setArchiveRow((oldArray) => [...oldArray, [scanned.PlateNumber, crime, [
                // //                 <TouchableOpacity onPress={()=>{
                // //                     setViewLocArchive(true);
                // //                     setScannedPlateNumberDateTimeLoc(scanned.PlateNumber);
                // //                     }
                // //                     }> 
                // //                     <Text style={styles.viewText}>View</Text>
                // //                 </TouchableOpacity>
                // //                     ]
                // //                ]]);
                // //           }
                    
                // //   prevDataRef.current = scanned.PlateNumber;
                //   }
                   

            })
            
        } 
        else{
            setLoading(false)
        }
        });
        
    }, []);
  return (
    <View style={styles.box_container}>
        
        <Table >
                <Row
                    data={headers}
                    height={40}
                    flexArr={[1.3,1.2,1,1]}
                    
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
            { listEmpty? 
            <View style={styles.noDataAvailable}>
                <Text>
                    No Data Available
                </Text>
            </View> :
            <Table >
                <TableWrapper style={{
                    flexDirection: 'row',
                    }}>
                    <Rows 
                        data={archiveRow} 
                        height={60} 
                        flexArr={[1.3,1.2,1,1]}
                        textStyle={{
                            paddingLeft: 10,
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
        }
            
        </ScrollView>
    </View>
    
  )
}


const styles = StyleSheet.create({
    box_container: {
        height: '100%',
    },

    noDataAvailable :{
        height: 320,
        width: '100%',
        // backgroundColor: 'red',
        textAlign: 'center',
        display: 'flex',
        alignItems:'center',
        justifyContent:'center',
    },

    viewText: {
        color: '#2666FA',
    }
})

export default Display_archive_table_PN_dashboard