import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput, Pressable, Animated, Touchable, TouchableOpacity, ScrollView} from 'react-native';
import {Row, Rows, Table, TableWrapper} from 'react-native-table-component';
import {db} from '../firebase';
import {uid} from 'uid'; 
import { onValue, ref, remove, set, update } from 'firebase/database';

const Display_table_PN_apprehended_list = ({setShowApprehendedDetails, setViewPlateNumber}) => {
const headers = ["Plate No.", 'Crime', ''];
const [list, setList] = useState([]);
const [listEmpty, setListEmpty] = useState(true);

const [plateNumber, setPlateNumber] = useState('')

const rowsDB = [];

//read
useEffect(() => {
    console.log('')
    onValue(ref(db, `/Vehicle_with_criminal_offense`), (snapshot) => {
      setList([]);
      const data = snapshot.val();
      if (data !== null) {
        const reversedData = Object.values(data).reverse();
        reversedData.map((list) => {
            if(list.apprehended === "yes"){
                setListEmpty(false);
                setPlateNumber(list.plateNumber);
                setList((oldArray) => [...oldArray, [list.plateNumber.split("_")[1], list.criminalOffense, [
                    <TouchableOpacity onPress={()=>{
                        setViewPlateNumber(list.plateNumber);
                        setShowApprehendedDetails(true);
                    }}>
                        <Text style={styles.viewText}>View</Text>
                    </TouchableOpacity>
                ]
                ]]);
            }
          
          //console.log('test list '+list.plateNumber)
        });
      }
    });
  }, []);

  return (
    <View style={styles.box_container}>
        <Table>
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
                        data={list} 
                        height={50} 
                        flexArr={[1,1,1]}
                        textStyle={{
                            paddingLeft: 10,
                            fontSize: 13
                        }}

                        style={{
                            borderBottomWidth: 0.5,
                            borderColor: '#9F9F9F',
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
        height: 500,
        width: '100%',
        // backgroundColor: 'red',
        textAlign: 'center',
        display: 'flex',
        alignItems:'center',
        justifyContent:'center',
    },

    viewText: {
        color: '#2666FA',
        fontSize: 13
    }
})

export default Display_table_PN_apprehended_list