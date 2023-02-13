import React from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput, Pressable, Animated, Touchable, TouchableOpacity} from 'react-native';

const Vehicles_list = () => {
  return (
    <>
        <View style={styles.container}>
            <View style={styles.header}>
            <Text style={styles.headerTxt}>Vehicles with Crimin...</Text>
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
});  

export default Vehicles_list