import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, Image, Touchable, TouchableOpacity } from 'react-native';

const Dashboard = ({navigation}) => {
  const [dashboard, setDashboard] = useState(true);
  const [list, setList] = useState(false);
  const [archive, setArchive] = useState(false);
  const [apprehended, setApprehended] = useState(false);
  return (
    <>
    
    <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTxt}>Dashboard</Text>
          <View style={styles.userContainer}> 
            <Text style={styles.userTxt}>LTO</Text> 
          </View>
        </View>
        
    </View>
    
    </>
  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
  },

  header: {
    height: 115,
    backgroundColor: '#E4F1F8',
    paddingLeft: 30,
    paddingRight: 30,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },

  headerTxt: {
    marginTop: '5%',
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
    marginTop: '5%',
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
  }

})

export default Dashboard