import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput, Pressable, Animated, Touchable, TouchableOpacity, ScrollView} from 'react-native';
import {Row, Rows, Table, TableWrapper} from 'react-native-table-component';
import {db} from '../firebase';
import {uid} from 'uid'; 
import { onValue, ref, remove, set, update } from 'firebase/database';

const Display_table_PN_list = ({setEditList,setPlateNumber}) => {
    const headers = ["Plate No.", 'Crime', ''];
    const [list, setList] = useState([]);

    const rowsDB = []

    //read
    useEffect(() => {
        console.log('')
        onValue(ref(db, `/Vehicle_with_criminal_offense`), (snapshot) => {
          setList([]);
          const data = snapshot.val();
          if (data !== null) {
            Object.values(data).map((list) => {
                if(list.apprehended === "no"){
                    setList((oldArray) => [...oldArray, [list.plateNumber, list.criminalOffense, [
                        <TouchableOpacity onPress={()=>{
                            setEditList(true);
                            setPlateNumber(list.plateNumber)
                            }}>
                            <Text style={styles.editText}>Edit</Text>
                        </TouchableOpacity>
                    ]
                    ]]);
                }
              
              //console.log('test list '+list.plateNumber)
            });
          }
        });
      }, []);

      //console.log(list)
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

    editText: {
        color: '#2666FA',
    }
})

export default Display_table_PN_list