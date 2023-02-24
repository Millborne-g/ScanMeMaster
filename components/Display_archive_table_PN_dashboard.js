import React from 'react'
import { Button, StyleSheet, Text, View, Image, Touchable, TouchableOpacity, ScrollView } from 'react-native';
import {Row, Rows, Table, TableWrapper} from 'react-native-table-component';

const Display_archive_table_PN_dashboard = ({setviewApprehended}) => {

  const headers = ["Plate No.", 'Crime', 'Location'];
  const rows = [
    ["000-xxx", 'Crime',[
        <TouchableOpacity onPress={()=>setviewApprehended(true)}>
            <Text style={styles.viewText}>View</Text>
        </TouchableOpacity>
    ]],
    ["000-xxx", 'Crime',[
        <TouchableOpacity onPress={()=>setviewApprehended(true)}>
            <Text style={styles.viewText}>View</Text>
        </TouchableOpacity>
    ]],
    ["000-xxx", 'Crime',[
        <TouchableOpacity onPress={()=>setviewApprehended(true)}>
            <Text style={styles.viewText}>View</Text>
        </TouchableOpacity>
    ]],
    ["000-xxx", 'Crime',[
        <TouchableOpacity onPress={()=>setviewApprehended(true)}>
            <Text style={styles.viewText}>View</Text>
        </TouchableOpacity>
    ]],
    ["000-xxx", 'Crime',[
        <TouchableOpacity onPress={()=>setviewApprehended(true)}>
            <Text style={styles.viewText}>View</Text>
        </TouchableOpacity>
    ]],
    ["000-xxx", 'Crime',[
        <TouchableOpacity onPress={()=>setviewApprehended(true)}>
            <Text style={styles.viewText}>View</Text>
        </TouchableOpacity>
    ]],
    ["000-xxx", 'Crime',[
        <TouchableOpacity onPress={()=>setviewApprehended(true)}>
            <Text style={styles.viewText}>View</Text>
        </TouchableOpacity>
    ]],
    ["000-xxx", 'Crime',[
        <TouchableOpacity onPress={()=>setviewApprehended(true)}>
            <Text style={styles.viewText}>View</Text>
        </TouchableOpacity>
    ]],
    ["000-xxx", 'Crime',[
        <TouchableOpacity onPress={()=>setviewApprehended(true)}>
            <Text style={styles.viewText}>View</Text>
        </TouchableOpacity>
    ]],
    ["000-xxx", 'Crime',[
        <TouchableOpacity onPress={()=>setviewApprehended(true)}>
            <Text style={styles.viewText}>View</Text>
        </TouchableOpacity>
    ]],
    ["000-xxx", 'Crime',[
        <TouchableOpacity onPress={()=>setviewApprehended(true)}>
            <Text style={styles.viewText}>View</Text>
        </TouchableOpacity>
    ]],
    ["000-xxx", 'Crime',[
        <TouchableOpacity onPress={()=>setviewApprehended(true)}>
            <Text style={styles.viewText}>View</Text>
        </TouchableOpacity>
    ]],
    ]
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
                        data={rows} 
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