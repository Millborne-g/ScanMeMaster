import React from 'react'
import { Button, StyleSheet, Text, View, Image, Touchable, TouchableOpacity } from 'react-native';

const Display_detected_PN = () => {
  return (
    <View style={styles.box_container}>
        <Text style={styles.detected_PN}>123-xxx</Text>
        <Text style={styles.detected_PN_crime}>Carnap</Text>
        <Text style={styles.detected_PN_location}>Lapasan</Text>
        <Text style={styles.detected_PN_date_time}>13:20:50 Feb 21, 2023</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    box_container: {
        height: 190,
        width: '100%',
        backgroundColor: '#2666FA',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },

    detected_PN: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },

    detected_PN_crime: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#BED1FE',
    },

    detected_PN_location: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 10
    },

    detected_PN_date_time: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#BED1FE',
    }
})

export default Display_detected_PN